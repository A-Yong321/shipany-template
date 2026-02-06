/**
 * Backup utilities for creating timestamped backups
 */

import * as fs from 'fs';
import * as path from 'path';
import { ensureDir } from './file-utils';

/**
 * Create a timestamped backup of a file
 */
export function createBackup(filePath: string, backupDir: string): string {
  const absolutePath = path.resolve(filePath);
  const fileName = path.basename(filePath);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `${fileName}.${timestamp}.backup`;
  const backupPath = path.join(backupDir, backupFileName);
  
  // Ensure backup directory exists
  ensureDir(backupDir);
  
  // Copy file to backup location
  fs.copyFileSync(absolutePath, backupPath);
  
  return backupPath;
}

/**
 * Create backups for multiple files
 */
export function createBackups(filePaths: string[], backupDir: string): Map<string, string> {
  const backupMap = new Map<string, string>();
  
  for (const filePath of filePaths) {
    if (fs.existsSync(path.resolve(filePath))) {
      const backupPath = createBackup(filePath, backupDir);
      backupMap.set(filePath, backupPath);
    }
  }
  
  return backupMap;
}

/**
 * Restore a file from backup
 */
export function restoreFromBackup(backupPath: string, originalPath: string): void {
  const absoluteBackupPath = path.resolve(backupPath);
  const absoluteOriginalPath = path.resolve(originalPath);
  
  if (!fs.existsSync(absoluteBackupPath)) {
    throw new Error(`Backup file not found: ${backupPath}`);
  }
  
  fs.copyFileSync(absoluteBackupPath, absoluteOriginalPath);
}

/**
 * List all backups in a directory
 */
export function listBackups(backupDir: string): string[] {
  const absolutePath = path.resolve(backupDir);
  
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  
  return fs.readdirSync(absolutePath)
    .filter(file => file.endsWith('.backup'))
    .map(file => path.join(backupDir, file));
}
