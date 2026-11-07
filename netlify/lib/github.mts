// Shared GitHub sync: pulls the contribution calendar (private work counted, never named)
// and the PUBLIC repos of the user, and stores a small JSON in Netlify Blobs.
// The token stays server-side; the browser only ever sees the stored JSON.
import { getStore } from '@netlify/blobs';

const QUERY = `query($login:String!){
  user(login:$login){
    contributionsCollection{ contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount contributionLevel } } } }
    repositories(first:12, privacy:PUBLIC, ownerAffiliations:OWNER, isFork:false, orderBy:{field:PUSHED_AT, direction:DESC}){
      nodes{ name url pushedAt isPrivate }
    }
  }
}`;

const LEVEL: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

export const store = () => getStore('github');

export async function syncGitHub(): Promise<{ ok: boolean; reason?: string }> {
  const token = Netlify.env.get('GITHUB_TOKEN');
  const login = Netlify.env.get('GITHUB_LOGIN') || 'puloxtor';
  if (!token) return { ok: false, reason: 'GITHUB_TOKEN not set' };

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'pullox-online-sync' },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });
  if (!res.ok) return { ok: false, reason: `GitHub HTTP ${res.status}` };
  const json: any = await res.json();
  const user = json?.data?.user;
  if (!user) return { ok: false, reason: 'GitHub returned no user' };

  const cal = user.contributionsCollection.contributionCalendar;
  const data = {
    updatedAt: new Date().toISOString(),
    total: cal.totalContributions,
    // compact: date, count, level — nothing else leaves GitHub
    weeks: cal.weeks.map((w: any) =>
      w.contributionDays.map((d: any) => ({ date: d.date, c: d.contributionCount, l: LEVEL[d.contributionLevel] ?? 0 }))
    ),
    repos: user.repositories.nodes
      .filter((r: any) => !r.isPrivate)
      .map((r: any) => ({ name: r.name, url: r.url, pushedAt: r.pushedAt })),
  };
  // Only overwrite the cache after a fully successful call — a failure keeps the last good copy.
  await store().setJSON('latest', data);
  return { ok: true };
}
