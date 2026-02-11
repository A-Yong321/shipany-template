import { md5 } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import { getStorageService } from '@/shared/services/storage';

const extFromMime = (mimeType: string) => {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/avif': 'avif',
    'image/heic': 'heic',
    'image/heif': 'heif',
  };
  return map[mimeType] || '';
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Support both 'file' (doc standard) and 'files' (legacy)
    const files = (formData.getAll('file').length > 0 
      ? formData.getAll('file') 
      : formData.getAll('files')) as File[];

    console.log('[API] Received files:', files.length);
    files.forEach((file, i) => {
      console.log(`[API] File ${i}:`, {
        name: file.name,
        type: file.type,
        size: file.size,
      });
    });

    if (!files || files.length === 0) {
      return respErr('No files provided');
    }

    const storageService = await getStorageService();
    const uploadResults = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        // Warning: Doc mentions file upload endpoint supports video too
        // But this is upload-image route. Keeping strict check for now but allow if needed?
        // Let's stick to image for this specific route or allow both if it's generic storage?
        // Logic below uses extFromMime which supports images.
        return respErr(`File ${file.name} is not a supported image`);
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);

      const digest = md5(body);
      const ext = extFromMime(file.type) || file.name.split('.').pop() || 'bin';
      const key = `${digest}.${ext}`;

      // If the same image already exists, reuse its URL
      const exists = await storageService.exists({ key });
      if (exists) {
        const publicUrl = storageService.getPublicUrl({ key });
        if (publicUrl) {
          uploadResults.push({
            url: publicUrl,
            key,
            filename: file.name,
            deduped: true,
          });
          continue;
        }
      }

      // Upload to storage
      const result = await storageService.uploadFile({
        body,
        key: key,
        contentType: file.type,
        disposition: 'inline',
      });

      if (!result.success) {
        console.error('[API] Upload failed:', result.error);
        return respErr(result.error || 'Upload failed');
      }

      console.log('[API] Upload success:', result.url);

      uploadResults.push({
        url: result.url,
        key: result.key,
        filename: file.name,
        deduped: false,
      });
    }

    console.log(
      '[API] All uploads complete. Returning URLs:',
      uploadResults.map((r) => r.url)
    );

    // Matches Doc structure: data is array of {url, key}
    return respData(uploadResults.map(r => ({
      url: r.url,
      key: r.key
    })));
  } catch (e) {
    console.error('upload image failed:', e);
    return respErr('upload image failed');
  }
}
