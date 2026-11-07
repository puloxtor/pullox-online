// Fill the GitHub cache right after each successful deploy, so the tile has data without waiting for the daily run.
import { syncGitHub } from '../lib/github.mts';

export default {
  async deploySucceeded() {
    const r = await syncGitHub();
    console.log('github-on-deploy', r);
  },
};
