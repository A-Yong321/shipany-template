/**
 * Validation script for effect URLs
 */

import { config } from './config';
import { readJsonFile, fileExists } from './utils/file-utils';
import { parseEffectUrl } from './utils/url-parser';
import { slugExists, getToolBySlug, findBestMatch } from './utils/slug-matcher';
import { logger } from './utils/logger';

export interface ValidationError {
  file: string;
  path: string;
  currentUrl: string;
  issue: string;
  suggestedFix?: string;
}

export interface ValidationWarning {
  file: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  summary: {
    totalFiles: number;
    filesWithErrors: number;
    totalErrors: number;
    totalWarnings: number;
  };
}

/**
 * Traverse JSON object to find all effect URLs
 */
function findEffectUrls(
  obj: any,
  currentPath: string = '',
  results: Array<{ path: string; url: string }> = []
): Array<{ path: string; url: string }> {
  if (typeof obj !== 'object' || obj === null) {
    return results;
  }

  // Check if this object has a 'url' property
  if (typeof obj.url === 'string' && 
      (obj.url.includes('/video-effects/') || obj.url.includes('/photo-effects/'))) {
    results.push({
      path: currentPath,
      url: obj.url,
    });
  }

  // Recursively search nested objects and arrays
  for (const [key, value] of Object.entries(obj)) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        findEffectUrls(item, `${newPath}[${index}]`, results);
      });
    } else if (typeof value === 'object' && value !== null) {
      findEffectUrls(value, newPath, results);
    }
  }

  return results;
}

/**
 * Validate a single effect URL
 */
function validateUrl(url: string, filePath: string, jsonPath: string): ValidationError | null {
  const parsed = parseEffectUrl(url);
  
  // Check for parsing errors
  if (!parsed.isValid) {
    return {
      file: filePath,
      path: jsonPath,
      currentUrl: url,
      issue: parsed.errors.join('; '),
      suggestedFix: undefined,
    };
  }

  // Check if slug exists in registry
  if (parsed.slug && !slugExists(parsed.slug)) {
    const toolType = parsed.pathPrefix === '/video-effects' ? 'video' : 'photo';
    const bestMatch = findBestMatch(parsed.slug, toolType);
    
    return {
      file: filePath,
      path: jsonPath,
      currentUrl: url,
      issue: `Slug '${parsed.slug}' not found in tools registry`,
      suggestedFix: bestMatch 
        ? `Use slug '${bestMatch.slug}' (confidence: ${(bestMatch.confidence * 100).toFixed(0)}%)`
        : 'No similar slug found',
    };
  }

  // Check if tool type matches path prefix
  if (parsed.slug && parsed.pathPrefix) {
    const tool = getToolBySlug(parsed.slug);
    if (tool) {
      const expectedPrefix = tool.type === 'video' ? '/video-effects' : '/photo-effects';
      if (parsed.pathPrefix !== expectedPrefix) {
        return {
          file: filePath,
          path: jsonPath,
          currentUrl: url,
          issue: `Tool type mismatch: '${parsed.slug}' is a ${tool.type} tool but URL uses ${parsed.pathPrefix}`,
          suggestedFix: `Change path to ${expectedPrefix}/${parsed.slug}`,
        };
      }
    }
  }

  return null;
}

/**
 * Validate a single configuration file
 */
function validateConfigFile(filePath: string): {
  errors: ValidationError[];
  warnings: ValidationWarning[];
} {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  try {
    if (!fileExists(filePath)) {
      warnings.push({
        file: filePath,
        message: 'File not found',
      });
      return { errors, warnings };
    }

    const data = readJsonFile(filePath);
    const urls = findEffectUrls(data);

    logger.debug(`Found ${urls.length} effect URLs in ${filePath}`);

    for (const { path, url } of urls) {
      const error = validateUrl(url, filePath, path);
      if (error) {
        errors.push(error);
      }
    }
  } catch (error) {
    warnings.push({
      file: filePath,
      message: `Failed to process file: ${error instanceof Error ? error.message : String(error)}`,
    });
  }

  return { errors, warnings };
}

/**
 * Validate all configuration files
 */
export function validateConfigFiles(configPaths: string[]): ValidationResult {
  logger.info('Starting validation...');
  
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationWarning[] = [];
  const filesWithErrors = new Set<string>();

  for (const filePath of configPaths) {
    logger.info(`Validating ${filePath}...`);
    const { errors, warnings } = validateConfigFile(filePath);
    
    allErrors.push(...errors);
    allWarnings.push(...warnings);
    
    if (errors.length > 0) {
      filesWithErrors.add(filePath);
    }
  }

  const result: ValidationResult = {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    summary: {
      totalFiles: configPaths.length,
      filesWithErrors: filesWithErrors.size,
      totalErrors: allErrors.length,
      totalWarnings: allWarnings.length,
    },
  };

  logger.info(`Validation complete. Found ${result.summary.totalErrors} errors in ${result.summary.filesWithErrors} files.`);
  
  return result;
}

/**
 * Main validation function
 */
export function runValidation(): ValidationResult {
  logger.setLevel(config.logLevel);
  return validateConfigFiles(config.configFiles);
}

// Run validation if executed directly
if (require.main === module) {
  const result = runValidation();
  
  if (!result.isValid) {
    console.log('\n❌ Validation failed!\n');
    process.exit(1);
  } else {
    console.log('\n✅ All URLs are valid!\n');
    process.exit(0);
  }
}
