import { readFileSync } from 'node:fs';

// CLI validators follow the published configuration; fixture defaults stay stable.
export function configuredBasePath() {
  const config = readFileSync(new URL('../_config.yml', import.meta.url), 'utf8');
  const raw = config.match(/^baseurl:\s*([^\r\n]*)/m)?.[1]?.trim();
  if (raw === undefined) throw new Error('Site baseurl is missing');
  const value = raw.replace(/^(['"])(.*)\1$/, '$2');
  if (value && !/^\/[A-Za-z0-9_/-]+$/.test(value)) throw new Error('Invalid site baseurl');
  return value.replace(/\/$/, '') + '/';
}
