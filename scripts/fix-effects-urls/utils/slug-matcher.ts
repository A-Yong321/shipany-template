/**
 * Slug matching utilities for finding correct tool slugs
 */

import { Tool, tools } from '../../../src/data/tools';

export interface SlugMatch {
  slug: string;
  confidence: number; // 0-1, where 1 is exact match
  tool: Tool;
}

/**
 * Build a slug index from tools registry
 */
export function buildSlugIndex(): Map<string, Tool> {
  const index = new Map<string, Tool>();
  
  for (const tool of tools) {
    index.set(tool.slug, tool);
    
    // Add lowercase variant
    index.set(tool.slug.toLowerCase(), tool);
  }
  
  return index;
}

/**
 * Check if a slug exists in the tools registry
 */
export function slugExists(slug: string): boolean {
  const index = buildSlugIndex();
  return index.has(slug) || index.has(slug.toLowerCase());
}

/**
 * Get tool by slug (exact match)
 */
export function getToolBySlug(slug: string): Tool | null {
  const index = buildSlugIndex();
  return index.get(slug) || index.get(slug.toLowerCase()) || null;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity score between two strings (0-1)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  return 1 - distance / maxLen;
}

/**
 * Find the best matching slug using fuzzy matching
 */
export function findBestMatch(input: string, type?: 'video' | 'photo'): SlugMatch | null {
  const matches: SlugMatch[] = [];
  
  for (const tool of tools) {
    // Filter by type if specified
    if (type && tool.type !== type) {
      continue;
    }
    
    const similarity = calculateSimilarity(input, tool.slug);
    
    if (similarity > 0.5) { // Only consider matches with >50% similarity
      matches.push({
        slug: tool.slug,
        confidence: similarity,
        tool,
      });
    }
  }
  
  // Sort by confidence (highest first)
  matches.sort((a, b) => b.confidence - a.confidence);
  
  return matches[0] || null;
}

/**
 * Find all possible matches for a slug
 */
export function findAllMatches(input: string, type?: 'video' | 'photo', minConfidence = 0.5): SlugMatch[] {
  const matches: SlugMatch[] = [];
  
  for (const tool of tools) {
    // Filter by type if specified
    if (type && tool.type !== type) {
      continue;
    }
    
    const similarity = calculateSimilarity(input, tool.slug);
    
    if (similarity >= minConfidence) {
      matches.push({
        slug: tool.slug,
        confidence: similarity,
        tool,
      });
    }
  }
  
  // Sort by confidence (highest first)
  return matches.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Map Chinese display name to English slug
 * This is a simple mapping based on tool titles
 */
export function mapChineseNameToSlug(chineseName: string): string | null {
  const normalized = chineseName.toLowerCase().trim();
  
  for (const tool of tools) {
    // Check if any item title matches
    for (const item of tool.items) {
      if (item.title.toLowerCase().includes(normalized) || 
          normalized.includes(item.title.toLowerCase())) {
        return tool.slug;
      }
    }
    
    // Check tool title
    if (tool.title.toLowerCase().includes(normalized) || 
        normalized.includes(tool.title.toLowerCase())) {
      return tool.slug;
    }
  }
  
  return null;
}

/**
 * Get all tools of a specific type
 */
export function getToolsByType(type: 'video' | 'photo'): Tool[] {
  return tools.filter(tool => tool.type === type);
}

/**
 * Get all available slugs
 */
export function getAllSlugs(): string[] {
  return tools.map(tool => tool.slug);
}
