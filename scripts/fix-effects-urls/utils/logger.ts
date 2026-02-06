/**
 * Logging utilities with timestamp and severity levels
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const LOG_COLORS = {
  DEBUG: '\x1b[36m', // Cyan
  INFO: '\x1b[32m',  // Green
  WARN: '\x1b[33m',  // Yellow
  ERROR: '\x1b[31m', // Red
  RESET: '\x1b[0m',
};

class Logger {
  private minLevel: LogLevel;
  private logs: string[] = [];

  constructor(minLevel: LogLevel = 'INFO') {
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    return `[${timestamp}] ${level}: ${message}`;
  }

  private log(level: LogLevel, message: string): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message);
    this.logs.push(formattedMessage);

    const color = LOG_COLORS[level];
    const reset = LOG_COLORS.RESET;
    console.log(`${color}${formattedMessage}${reset}`);
  }

  debug(message: string): void {
    this.log('DEBUG', message);
  }

  info(message: string): void {
    this.log('INFO', message);
  }

  warn(message: string): void {
    this.log('WARN', message);
  }

  error(message: string): void {
    this.log('ERROR', message);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export Logger class for testing
export { Logger };
export type { LogLevel };
