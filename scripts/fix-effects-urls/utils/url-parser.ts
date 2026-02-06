/**
 * URL parsing utilities for effect URLs
 */

export interface ParsedUrl {
  original: string;
  pathPrefix: '/video-effects' | '/photo-effects' | null;
  slug: string | null;
  type: string | null;
  queryParams: Record<string, string>;
  isValid: boolean;
  errors: string[];
}

/**
 * Parse an effect URL into its components
 */
export function parseEffectUrl(url: string): ParsedUrl {
  const result: ParsedUrl = {
    original: url,
    pathPrefix: null,
    slug: null,
    type: null,
    queryParams: {},
    isValid: true,
    errors: [],
  };

  try {
    // Split URL into path and query string
    const [pathPart, queryPart] = url.split('?');
    
    // Parse query parameters
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      params.forEach((value, key) => {
        result.queryParams[key] = decodeURIComponent(value);
      });
      result.type = result.queryParams.type || null;
    }

    // Parse path
    const pathSegments = pathPart.split('/').filter(Boolean);
    
    if (pathSegments.length < 2) {
      result.isValid = false;
      result.errors.push('URL must have at least 2 path segments');
      return result;
    }

    // Extract path prefix
    const prefix = `/${pathSegments[0]}`;
    if (prefix === '/video-effects' || prefix === '/photo-effects') {
      result.pathPrefix = prefix;
    } else {
      result.isValid = false;
      result.errors.push(`Invalid path prefix: ${prefix}. Must be /video-effects or /photo-effects`);
    }

    // Extract slug (second segment)
    result.slug = pathSegments[1];

    // Check for mixed language characters in slug
    if (result.slug && /[^\x00-\x7F]/.test(result.slug)) {
      result.isValid = false;
      result.errors.push('Slug contains non-ASCII characters');
    }

    // Check for extra path segments
    if (pathSegments.length > 2) {
      result.isValid = false;
      result.errors.push(`URL has extra path segments: ${pathSegments.slice(2).join('/')}`);
    }

  } catch (error) {
    result.isValid = false;
    result.errors.push(`Failed to parse URL: ${error instanceof Error ? error.message : String(error)}`);
  }

  return result;
}

/**
 * Check if a string contains only ASCII characters
 */
export function isAsciiOnly(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}

/**
 * Extract slug from a malformed URL
 * Attempts to extract the tool identifier even from incorrectly formatted URLs
 */
export function extractSlugFromMalformedUrl(url: string): string | null {
  try {
    // Remove query parameters
    const [pathPart] = url.split('?');
    
    // Remove path prefix
    const withoutPrefix = pathPart
      .replace(/^\/video-effects\//, '')
      .replace(/^\/photo-effects\//, '');
    
    // Remove non-ASCII characters and normalize
    const cleaned = withoutPrefix
      .replace(/[^\x00-\x7F]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    
    return cleaned || null;
  } catch {
    return null;
  }
}

/**
 * Construct a valid effect URL
 */
export function constructEffectUrl(
  pathPrefix: '/video-effects' | '/photo-effects',
  slug: string,
  type?: string
): string {
  let url = `${pathPrefix}/${slug}`;
  
  if (type) {
    // URL encode the type parameter if it contains non-ASCII characters
    const encodedType = encodeURIComponent(type);
    url += `?type=${encodedType}`;
  }
  
  return url;
}

/**
 * Validate URL format
 */
export function validateUrlFormat(url: string): { isValid: boolean; errors: string[] } {
  const parsed = parseEffectUrl(url);
  return {
    isValid: parsed.isValid,
    errors: parsed.errors,
  };
}
