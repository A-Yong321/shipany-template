import { saveFiles } from './index';
import {
  AIConfigs,
  AIFile,
  AIGenerateParams,
  AIMediaType,
  AIProvider,
  AITaskResult,
  AITaskStatus,
} from './types';

export class AIStudioProvider implements AIProvider {
  readonly name = 'aistudio';
  configs: AIConfigs;

  private baseUrl = 'https://openapi.ai-studio.me';

  constructor(configs: AIConfigs) {
    this.configs = configs;
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.configs.aistudio_api_key}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * 生成内容入口
   */
  async generate({ params }: { params: AIGenerateParams }): Promise<AITaskResult> {
    const { mediaType } = params;

    switch (mediaType) {
      case AIMediaType.IMAGE:
        return this.generateImage(params);
      case AIMediaType.VIDEO:
        return this.generateVideo(params);
      case AIMediaType.MUSIC:
        return this.generateMusic(params);
      default:
        throw new Error(`Unsupported media type: ${mediaType}`);
    }
  }

  /**
   * 图片生成适配
   */
  private async generateImage(params: AIGenerateParams): Promise<AITaskResult> {
    const platform = this.getPlatformByModel(params.model, 'grok');
    const url = `${this.baseUrl}/api/${platform}/images`;

    const body = {
      action: 'generate', // Updated based on error "无效的action值: text2image, 支持: generate, edit"
      prompt: params.prompt,
      model: params.model,
      size: params.options?.size || '1024x1024',
      count: params.options?.count || 1,
    };

    console.log('[AIStudio] Generating Image:', { url, body });

    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.task_id) {
      console.error('AI Studio Image Generate Failed:', data);
      throw new Error(data.error?.message || 'AI Studio Image Generate Failed');
    }

    return {
      taskId: data.task_id,
      taskStatus: AITaskStatus.PENDING,
    };
  }

  /**
   * 视频生成适配
   */
  private async generateVideo(params: AIGenerateParams): Promise<AITaskResult> {
    const platform = this.getPlatformByModel(params.model, 'kling');
    const url = `${this.baseUrl}/api/${platform}/videos`;

    const body: any = {
      action: params.options?.action || 'text2video',
      prompt: params.prompt,
      model: params.model,
      duration: params.options?.duration || 5,
      aspect_ratio: params.options?.aspect_ratio || '16:9',
    };

    if (params.options?.image_url) {
      body.action = 'image2video';
      body.image_url = params.options.image_url;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.task_id) {
      throw new Error(data.error?.message || 'AI Studio Video Generate Failed');
    }

    return {
      taskId: data.task_id,
      taskStatus: AITaskStatus.PENDING,
    };
  }

  /**
   * 音乐生成适配
   */
  private async generateMusic(params: AIGenerateParams): Promise<AITaskResult> {
    const url = `${this.baseUrl}/api/suno/music`;

    const body = {
      prompt: params.prompt,
      lyrics: params.options?.lyrics,
      style: params.options?.style,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.task_id) {
      throw new Error(data.error?.message || 'AI Studio Music Generate Failed');
    }

    return {
      taskId: data.task_id,
      taskStatus: AITaskStatus.PENDING,
    };
  }

  /**
   * 任务查询
   */
  async query({
    taskId,
    mediaType,
    model,
  }: {
    taskId: string;
    mediaType?: string;
    model?: string;
  }): Promise<AITaskResult> {
    const platform = this.getPlatformByModel(model, mediaType === AIMediaType.MUSIC ? 'suno' : 'grok');
    const url = `${this.baseUrl}/api/${platform}/tasks`;

    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ task_id: taskId }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || 'AI Studio Query Failed');
    }

    const statusMap: Record<string, AITaskStatus> = {
      pending: AITaskStatus.PENDING,
      queued: AITaskStatus.PROCESSING,
      processing: AITaskStatus.PROCESSING,
      succeeded: AITaskStatus.SUCCESS,
      failed: AITaskStatus.FAILED,
      cancelled: AITaskStatus.CANCELED,
      timeout: AITaskStatus.FAILED,
    };

    let status = AITaskStatus.PENDING;
    if (data.status && statusMap[data.status]) {
      status = statusMap[data.status];
    } else if (data.response?.success) {
      status = AITaskStatus.SUCCESS;
    } else if (data.finished_at && !data.response?.success) {
      // Finished but no success flag usually errors, but let's be careful. 
      // If response has error, it might be failed.
      status = AITaskStatus.FAILED;
    }

    const result: AITaskResult = {
      taskId: data.task_id,
      taskStatus: status,
      taskResult: data,
    };

    if (result.taskStatus === AITaskStatus.SUCCESS && this.configs.aistudio_custom_storage === 'true') {
      const taskInfo: any = {};
      
      // Handle different response structures
      const resultData = data.response?.data || data;
      const images = resultData.images || (resultData.imageUrls ? resultData.imageUrls.map((url: string) => ({ url })) : null);
      const video = resultData.video || (resultData.videoUrl ? { url: resultData.videoUrl } : null);
      const music = resultData.music || (resultData.audioUrl ? [{ url: resultData.audioUrl }] : null);

      if (images) {
        taskInfo.images = images.map((img: any) => ({ url: img.url }));
        const files: AIFile[] = images.map((img: any) => ({
          url: img.url,
          key: `aistudio/images/${taskId}.png`,
          contentType: 'image/png',
        }));
        // Only save files if specifically needed, but always populate taskInfo
        if (this.configs.aistudio_custom_storage === 'true') {
          const saved = await saveFiles(files);
          if (saved) {
            taskInfo.images = saved.map((f: AIFile) => ({ url: f.url }));
          }
        }
      } else if (video) {
        taskInfo.videos = [{ url: video.url, duration: video.duration }];
        if (this.configs.aistudio_custom_storage === 'true') {
          const files: AIFile[] = [{
            url: video.url,
            key: `aistudio/videos/${taskId}.mp4`,
            contentType: 'video/mp4',
          }];
          const saved = await saveFiles(files);
          if (saved) {
            taskInfo.videos = [{ url: saved[0].url, duration: video.duration }];
          }
        }
      } else if (music) {
        taskInfo.songs = music.map((m: any) => ({
          audioUrl: m.url || m.audioUrl,
          title: m.title,
          duration: m.duration,
        }));
      }
      result.taskInfo = taskInfo;
    } else if (result.taskStatus === AITaskStatus.SUCCESS) {
      // ✅ Even without custom storage, extract taskInfo so frontend can use it directly
      const resultData = data.response?.data || data;
      const images = resultData.images || (resultData.imageUrls ? resultData.imageUrls.map((url: string) => ({ url })) : null);
      const video = resultData.video || (resultData.videoUrl ? { url: resultData.videoUrl } : null);
      const music = resultData.music || (resultData.audioUrl ? [{ url: resultData.audioUrl }] : null);

      const taskInfo: any = {};
      if (images) taskInfo.images = images.map((img: any) => ({ url: img.url }));
      if (video) taskInfo.videos = [{ url: video.url, duration: video.duration }];
      if (music) taskInfo.songs = music.map((m: any) => ({ audioUrl: m.url || m.audioUrl, title: m.title, duration: m.duration }));
      
      result.taskInfo = taskInfo;
    }

    return result;
  }

  private getPlatformByModel(model?: string, defaultPlatform = 'grok'): string {
    if (!model) return defaultPlatform;
    const m = model.toLowerCase();
    if (m.includes('kling')) return 'kling';
    if (m.includes('dreamina')) return 'dreamina';
    if (m.includes('sora')) return 'sora';
    if (m.includes('hailuo')) return 'hailuo';
    if (m.includes('suno')) return 'suno';
    if (m.includes('lovart')) return 'lovart';
    if (m.includes('krea')) return 'krea';
    // if (m.includes('flux')) return 'luma'; // Reverted: Caused error for Flux Dev (Grok)
    // User requested "don't waste quota". Sending to wrong endpoint wastes quota (404/400).
    // Safest bet: default to 'grok' matches previous behavior.
    // I will add 'midjourney' if it appears.
    if (m.includes('midjourney') || m.includes('mj')) return 'midjourney';
    return defaultPlatform;
  }

  async getBalance() {
    const url = `${this.baseUrl}/api/account/balance`;
    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers,
    });
    return res.json();
  }
}
