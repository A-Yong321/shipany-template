/**
 * Configuration for effects URL fixing scripts
 */

export const config = {
  // Source of truth for tool slugs
  toolsRegistryPath: 'src/data/tools.ts',
  
  // Configuration files to validate and correct
  configFiles: [
    'src/config/locale/messages/en/pages/index.json',
    'src/config/locale/messages/zh/pages/index.json',
    'src/config/locale/messages/en/pages/photo-effects.json',
    'src/config/locale/messages/en/pages/video-effects.json',
    'src/config/locale/messages/zh/pages/photo-effects.json',
    'src/config/locale/messages/zh/pages/video-effects.json',
  ],
  
  // Backup directory for original files
  backupDir: 'scripts/fix-effects-urls/backups',
  
  // Report output directory
  reportDir: 'scripts/fix-effects-urls/reports',
  
  // Logging configuration
  logLevel: 'INFO' as 'DEBUG' | 'INFO' | 'WARN' | 'ERROR',
};
