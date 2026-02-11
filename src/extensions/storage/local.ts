
import fs from 'fs';
import path from 'path';
import {
  StorageConfigs,
  StorageDownloadUploadOptions,
  StorageProvider,
  StorageUploadOptions,
  StorageUploadResult,
} from './index';

export class LocalProvider implements StorageProvider {
  name = 'local';
  configs: StorageConfigs;
  uploadDir: string;
  publicPath: string;

  constructor(configs: StorageConfigs) {
    this.configs = configs;
    this.uploadDir = configs.uploadDir || path.join(process.cwd(), 'public', 'uploads');
    this.publicPath = configs.publicPath || '/uploads';

    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(options: StorageUploadOptions): Promise<StorageUploadResult> {
    const { body, key } = options;
    const filePath = path.join(this.uploadDir, key);
    const fileDir = path.dirname(filePath);

    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    fs.writeFileSync(filePath, body);

    const url = `${this.publicPath}/${key}`;

    return {
      success: true,
      url,
      key,
      provider: this.name,
      location: filePath,
    };
  }

  async exists(options: { key: string; bucket?: string }): Promise<boolean> {
    const filePath = path.join(this.uploadDir, options.key);
    return fs.existsSync(filePath);
  }

  getPublicUrl(options: { key: string; bucket?: string }): string {
    return `${this.publicPath}/${options.key}`;
  }

  async downloadAndUpload(
    options: StorageDownloadUploadOptions
  ): Promise<StorageUploadResult> {
      // For local provider, we might not need to download and upload if it is just a clear usage
      // But if this is used to fetch from a URL and save locally:
      try {
        const response = await fetch(options.url);
        if (!response.ok) throw new Error(`Failed to fetch ${options.url}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        return this.uploadFile({
            body: buffer,
            key: options.key,
            contentType: options.contentType,
            disposition: options.disposition,
        });
      } catch (error: any) {
          return {
              success: false,
              provider: this.name,
              error: error.message
          }
      }
  }
}
