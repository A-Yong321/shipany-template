import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

import {
  defaultLocale,
  localeMessagesPaths,
  localeMessagesRootPath,
} from '@/config/locale';

import { routing } from './config';

export async function loadMessages(
  path: string,
  locale: string = defaultLocale
) {
  try {
    // try to load locale messages
    const messages = await import(
      `@/config/locale/messages/${locale}/${path}.json`
    );
    return messages.default;
  } catch (e) {
    try {
      // try to load default locale messages
      const messages = await import(
        `@/config/locale/messages/${defaultLocale}/${path}.json`
      );
      return messages.default;
    } catch (err) {
      // if default locale is not found, return empty object
      return {};
    }
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as string)) {
    locale = routing.defaultLocale;
  }

  if (['zh-CN'].includes(locale)) {
    locale = 'zh';
  }

  try {
    // Determine which files to load based on the current pathname
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // Always load these core files
    const pathsToLoad = [
      'common',
      'landing', // Contains footer/nav often used globally
    ];

    // Helper to check path inclusion
    const isPath = (p: string) => pathname.includes(p);

    if (isPath('/admin')) {
      pathsToLoad.push(
        'admin/sidebar',
        'admin/users',
        'admin/roles',
        'admin/permissions',
        'admin/categories',
        'admin/posts',
        'admin/payments',
        'admin/subscriptions',
        'admin/credits',
        'admin/settings',
        'admin/apikeys',
        'admin/ai-tasks',
        'admin/chats'
      );
    } else if (isPath('/settings')) {
      pathsToLoad.push(
        'settings/sidebar',
        'settings/profile',
        'settings/security',
        'settings/billing',
        'settings/payments',
        'settings/credits',
        'settings/apikeys'
      );
    } else {
      // Functional pages & Tools
      if (isPath('/ai/')) {
         pathsToLoad.push('ai/music', 'ai/chat', 'ai/image', 'ai/video');
      }
      if (isPath('/activity')) {
         pathsToLoad.push('activity/sidebar', 'activity/ai-tasks', 'activity/chats');
      }
      
      // Page specific contents - loaded more aggressively to ensure content availability
      pathsToLoad.push(
        'pages/index',
        'pages/pricing',
        'pages/showcases',
        'pages/blog',
        'pages/updates',
        'pages/tools',
        'pages/tool-details',
        'pages/ai-style',
        'pages/video-effects',
        'pages/video-effect-details',
        'pages/photo-effects',
        'pages/photo-effect-details',
        'pages/explore',
        'pages/gallery',
        'pages/api-platform'
      );
    }

    // Filter the full list based on our selection
    // We only load paths that are in our 'pathsToLoad' list
    // OR if we are in development, we might want to be safer, but for performance we stick to this.
    // However, the original code had a fixed list 'localeMessagesPaths'. 
    // We should intersect with that to ensure valid paths.
    
    const targetPaths = localeMessagesPaths.filter(p => pathsToLoad.includes(p));

    // load all local messages
    const allMessages = await Promise.all(
      targetPaths.map((path) => loadMessages(path, locale))
    );

    // merge all local messages
    const messages: any = {};

    targetPaths.forEach((path, index) => {
      const localMessages = allMessages[index];

      const keys = path.split('/');
      let current = messages;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = localMessages;
    });

    return {
      locale,
      messages,
    };
  } catch (e) {
    return {
      locale: defaultLocale,
      messages: await loadMessages(localeMessagesRootPath, defaultLocale),
    };
  }
});
