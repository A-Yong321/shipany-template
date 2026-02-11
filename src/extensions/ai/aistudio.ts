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
    if (configs.aistudio_api_base) {
      this.baseUrl = configs.aistudio_api_base;
    }
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

    const body: any = {
      action: 'generate',
      prompt: params.prompt,
      model: params.model,
      size: params.options?.size || '1024x1024',
      count: params.options?.count || 1,
    };

    if (params.options?.image_url) {
      body.action = 'edit';
      body.image_url = params.options.image_url;
    }

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
      taskResult: data,
    };
  }

  /**
   * 视频生成适配
   */
  private async generateVideo(params: AIGenerateParams): Promise<AITaskResult> {
    const platform = this.getPlatformByModel(params.model, 'kling');
    const url = `${this.baseUrl}/api/${platform}/videos`;

    const body: any = {
      action: params.options?.image_url ? 'image2video' : 'text2video',
      prompt: params.prompt,
      model: params.model,
      duration: Number(params.options?.duration) || 5,
      aspect_ratio: params.options?.aspect_ratio || '16:9',
    };

    if (params.options?.image_url) {
      body.image_url = params.options.image_url;
    }

    console.log('[AIStudio] Generating Video Request:', { url, body });
    try {
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
        taskResult: data,
      };
    } catch (err: any) {
      console.error('[AIStudio] Video Fetch Error Details:', {
        url,
        error: err.message,
        stack: err.stack,
      });
      throw err;
    }
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
      taskResult: data,
    };
  }

  /**
   * 任务查询
   */
  private async doQuery(url: string, taskId: string, model?: string, platform?: string): Promise<any> {
    console.log('[AIStudio] Querying Task:', { url, taskId, model, platform });

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ task_id: taskId }),
      });

      const data = await res.json();
      
      // LOG: 详细记录上游响应数据以便调试
      console.log('[AIStudio] Query Response Data:', JSON.stringify(data, null, 2));

      if (!res.ok) {
        throw new Error(data.error?.message || 'AI Studio Query Failed');
      }
      return data;
    } catch (err: any) {
      console.error('[AIStudio] Query Fetch Error Details:', {
        url,
        taskId,
        error: err.message,
        stack: err.stack,
      });
      throw err;
    }
  }

  async query(params: {
    taskId: string;
    mediaType?: string;
    model?: string;
    platform?: string;
  }): Promise<AITaskResult> {
    const { taskId, model, mediaType, platform } = params;
    const defaultPlatform = mediaType === AIMediaType.IMAGE ? 'grok' : (mediaType === AIMediaType.MUSIC ? 'suno' : 'kling');
    
    // Priority: Explicit platform param > model mapping > default
    const targetPlatform = platform || this.getPlatformByModel(model, defaultPlatform);
    const url = `${this.baseUrl}/api/${targetPlatform}/tasks`;

    const data = await this.doQuery(url, taskId, model, targetPlatform);

    // --- 严格按照文档实现状态判断逻辑 ---
    let status = AITaskStatus.PROCESSING;
    
    // 1. 检查 response.success
    if (data.response?.success === true) {
      status = AITaskStatus.SUCCESS;
    } else if (data.response?.success === false) {
      status = AITaskStatus.FAILED;
    } else if (data.finished_at && !data.response?.success) {
      // 2. 检查 finished_at (已完成但没有 success 标志通常视为失败)
      status = AITaskStatus.FAILED;
    } else if (data.status === 'succeeded' || data.status === 'success') {
      // 3. 兼容性检查 status 字段
      status = AITaskStatus.SUCCESS;
    } else if (data.status === 'failed') {
      status = AITaskStatus.FAILED;
    }

    const result: AITaskResult = {
      taskId: data.id || data.task_id,
      taskStatus: status,
      taskResult: data,
    };

    // --- 严格按照文档提取结果数据 ---
    if (status === AITaskStatus.SUCCESS) {
      const taskInfo: any = {};
      const responseData = data.response?.data;

      if (responseData) {
        // 图片提取: response.data.imageUrls (文档强调是 imageUrls)
        if (responseData.imageUrls && Array.isArray(responseData.imageUrls)) {
          taskInfo.images = responseData.imageUrls.map((url: string) => ({ url }));
        } else if (responseData.image_url) {
          taskInfo.images = [{ url: responseData.image_url }];
        } else if (responseData.url && !responseData.videoUrl && !responseData.audioUrl) {
          taskInfo.images = [{ url: responseData.url }];
        }
        
        // 视频提取: 兼容多种字段格式
        // 优先尝试 videoUrl/videoUrls，均失败则尝试通用的 url 字段
        const videoUrl = responseData.videoUrl || 
                         (responseData.videoUrls && responseData.videoUrls[0]) ||
                         responseData.url ||
                         responseData.output ||
                         responseData.result;

        if (videoUrl) {
          taskInfo.videos = [{ url: videoUrl, duration: responseData.duration }];
        } else {
             console.warn('[AIStudio] Video URL not found in response data:', responseData);
        }

        // 音乐提取: response.data.audioUrl 或 musicUrl
        const audioUrl = responseData.audioUrl || responseData.musicUrl || responseData.url;
        if (audioUrl && (platform === 'suno' || model?.includes('suno'))) {
          taskInfo.songs = [{ audioUrl, title: responseData.title || 'Untitled' }];
        }
      }

      // 如果开启了自定义存储，则执行转存逻辑
      if (taskInfo.images && this.configs.aistudio_custom_storage === 'true') {
        const files: AIFile[] = taskInfo.images.map((img: any) => ({
          url: img.url,
          key: `aistudio/images/${taskId}.png`,
          contentType: 'image/png',
        }));
        const saved = await saveFiles(files);
        if (saved) taskInfo.images = saved.map((f: AIFile) => ({ url: f.url }));
      } else if (taskInfo.videos && this.configs.aistudio_custom_storage === 'true') {
        const video = taskInfo.videos[0];
        const files: AIFile[] = [{
          url: video.url,
          key: `aistudio/videos/${taskId}.mp4`,
          contentType: 'video/mp4',
        }];
        const saved = await saveFiles(files);
        if (saved) taskInfo.videos = [{ url: saved[0].url, duration: video.duration }];
      }

      result.taskInfo = taskInfo;
    }

    return result;
  }

  private getPlatformByModel(model?: string, defaultPlatform = 'grok'): string {
    if (!model) return defaultPlatform;
    const m = model.toLowerCase();
    if (m.includes('flux')) return 'grok';
    if (m.includes('kling')) return 'kling';
    if (m.includes('dreamina')) return 'dreamina';
    if (m.includes('sora')) return 'sora';
    if (m.includes('hailuo')) return 'hailuo';
    if (m.includes('suno')) return 'suno';
    if (m.includes('lovart')) return 'lovart';
    if (m.includes('krea')) return 'krea';
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
