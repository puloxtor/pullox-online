import type { Config } from '@netlify/functions';
import { syncGitHub } from '../lib/github.mts';

// Daily at 04:00 UTC = 06:00 Plovdiv in winter (EET), 07:00 in summer (EEST).
export default async () => {
  const r = await syncGitHub();
  console.log('github-sync', r);
};

export const config: Config = { schedule: '0 4 * * *' };
