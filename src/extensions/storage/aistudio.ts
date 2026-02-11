import type {
  StorageConfigs,
  StorageDownloadUploadOptions,
  StorageProvider,
  StorageUploadOptions,
  StorageUploadResult,
} from '.';

/**
 * AI Studio 存储提供商配置
 * @docs https://openapi.ai-studio.me/api/upload/file
 */
export interface AIStudioConfigs extends StorageConfigs {
  apiKey: string;
  baseUrl?: string;
}

/**
 * AI Studio 存储提供商实现
 * 使用 AI Studio 文件上传 API
 * @website https://openapi.ai-studio.me
 */
export class AIStudioProvider implements StorageProvider {
  readonly name = 'aistudio';
  configs: AIStudioConfigs;

  constructor(configs: AIStudioConfigs) {
    this.configs = configs;
  }

  private getBaseUrl() {
    return this.configs.baseUrl || 'https://openapi.ai-studio.me';
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.configs.apiKey}`,
    };
  }

  /**
   * AI Studio 不支持检查文件是否存在
   * 总是返回 false
   */
  exists = async (options: { key: string; bucket?: string }) => {
    return false;
  };

  /**
   * AI Studio 返回完整 URL,直接返回即可
   */
  getPublicUrl = (options: { key: string; bucket?: string }) => {
    // AI Studio 返回的是完整 URL,这里返回空字符串
    // 实际 URL 在上传时返回
    return '';
  };

  /**
   * 上传文件到 AI Studio
   */
  async uploadFile(
    options: StorageUploadOptions
  ): Promise<StorageUploadResult> {
    try {
      const url = `${this.getBaseUrl()}/api/upload/file`;

      // 将 body 转换为 Buffer
      const bodyBuffer =
        options.body instanceof Buffer
          ? options.body
          : Buffer.from(options.body);

      // 创建 FormData
      const formData = new FormData();
      const blob = new Blob([bodyBuffer], {
        type: options.contentType || 'application/octet-stream',
      });
      formData.append('file', blob, options.key.split('/').pop() || 'file');

      console.log('[AIStudioProvider] Uploading file:', {
        url,
        key: options.key,
        size: bodyBuffer.length,
        contentType: options.contentType,
      });

      // 发送请求
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: formData,
      });

      const data = await response.json();

      console.log('[AIStudioProvider] Upload response:', data);

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error?.message || `Upload failed: ${response.statusText}`,
          provider: this.name,
        };
      }

      // 提取返回的 URL
      const uploadedUrl = data.data?.[0]?.url;
      const uploadedKey = data.data?.[0]?.key;

      if (!uploadedUrl) {
        return {
          success: false,
          error: 'No URL returned from AI Studio',
          provider: this.name,
        };
      }

      return {
        success: true,
        url: uploadedUrl,
        key: uploadedKey || options.key,
        filename: options.key.split('/').pop(),
        provider: this.name,
      };
    } catch (error) {
      console.error('[AIStudioProvider] Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: this.name,
      };
    }
  }

  /**
   * 下载并上传文件
   */
  async downloadAndUpload(
    options: StorageDownloadUploadOptions
  ): Promise<StorageUploadResult> {
    try {
      console.log('[AIStudioProvider] Downloading file from:', options.url);

      const response = await fetch(options.url);
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
          provider: this.name,
        };
      }

      if (!response.body) {
        return {
          success: false,
          error: 'No body in response',
          provider: this.name,
        };
      }

      const arrayBuffer = await response.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);

      return this.uploadFile({
        body,
        key: options.key,
        contentType: options.contentType,
        disposition: options.disposition,
      });
    } catch (error) {
      console.error('[AIStudioProvider] Download and upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: this.name,
      };
    }
  }
}

/**
 * 创建 AI Studio 提供商
 */
export function createAIStudioProvider(
  configs: AIStudioConfigs
): AIStudioProvider {
  return new AIStudioProvider(configs);
}
