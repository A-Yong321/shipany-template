/**
 * File I/O utilities for reading and writing JSON files
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Read a JSON file and parse it
 */
export function readJsonFile<T = any>(filePath: string): T {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Write data to a JSON file with pretty formatting
 */
export function writeJsonFile(filePath: string, data: any): void {
  const absolutePath = path.resolve(filePath);
  const content = JSON.stringify(data, null, 2);
  
  // Ensure directory exists
  const dir = path.dirname(absolutePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(absolutePath, content, 'utf-8');
}

/**
 * Check if a file exists
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(path.resolve(filePath));
}

/**
 * Read a text file
 */
export function readTextFile(filePath: string): string {
  const absolutePath = path.resolve(filePath);
  return fs.readFileSync(absolutePath, 'utf-8');
}

/**
 * Write text to a file
 */
export function writeTextFile(filePath: string, content: string): void {
  const absolutePath = path.resolve(filePath);
  
  // Ensure directory exists
  const dir = path.dirname(absolutePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(absolutePath, content, 'utf-8');
}

/**
 * List all files in a directory
 */
export function listFiles(dirPath: string): string[] {
  const absolutePath = path.resolve(dirPath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  return fs.readdirSync(absolutePath);
}

/**
 * Ensure a directory exists
 */
export function ensureDir(dirPath: string): void {
  const absolutePath = path.resolve(dirPath);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
}
