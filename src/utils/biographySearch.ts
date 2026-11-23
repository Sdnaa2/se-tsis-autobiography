import { BiographyDataset, FactMatch } from '../types/biography';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'about',
  'bekzat',
  'did',
  'do',
  'does',
  'for',
  'from',
  'have',
  'he',
  'his',
  'how',
  'in',
  'is',
  'it',
  'kalenuly',
  'of',
  'on',
  'or',
  'the',
  'to',
  'what',
  'when',
  'where',
  'which',
  'who',
  'why',
  'with',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

function buildProfileEntries(dataset: BiographyDataset): Array<{
  factId: string;
  title: string;
  searchable: string;
  snippet: string;
}> {
  const { profile } = dataset;
  return [
    {
      factId: 'profile-education',
      title: 'Education & University',
      searchable: `${profile.university} ${profile.program} ${profile.highSchool} ${profile.location} ${profile.hometown} study university college high school`,
      snippet: `Bekzat studies ${profile.program} at ${profile.university} in ${profile.location}, after graduating from ${profile.highSchool}.`,
    },
    {
      factId: 'profile-languages-career',
      title: 'Languages & Career Focus',
      searchable: `${profile.languages.join(' ')} ${profile.careerFocus} language speak career job backend goal`,
      snippet: `Bekzat speaks ${profile.languages.join(', ')} and is focused on ${profile.careerFocus}.`,
    },
    {
      factId: 'profile-interests-quote',
      title: 'Hobbies, Interests & Motto',
      searchable: `${profile.interests.join(' ')} ${profile.personalQuote.value} hobby hobbies interest quote motto dream`,
      snippet: `Outside coding, Bekzat enjoys ${profile.interests.slice(0, 2).join(' and ')}. His motto: "${profile.personalQuote.value}"`,
    },
    {
      factId: 'profile-contact',
      title: 'Public Contact',
      searchable: `email contact reach mail gmail ${profile.contactLinks.map((c) => c.label).join(' ')}`,
      snippet: `You can reach Bekzat via ${profile.contactLinks[0]?.label ?? 'his listed email'}.`,
    },
  ];
}

export function retrieveRelevantFacts(
  question: string,
  dataset: BiographyDataset,
  limit = 3,
): FactMatch[] {
  const tokens = tokenize(question);
  if (tokens.length === 0) {
    return [];
  }

  const candidates: FactMatch[] = [];

  for (const milestone of dataset.milestones) {
    const haystack = [
      milestone.title,
      milestone.institutionOrPlace,
      milestone.period,
      milestone.category,
      milestone.summary,
      milestone.details.join(' '),
      milestone.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) {
        score += 1;
        if (milestone.title.toLowerCase().includes(token)) score += 1;
        if (milestone.tags.some((tag) => tag.toLowerCase().includes(token))) {
          score += 1;
        }
      }
    }

    if (score > 0) {
      candidates.push({
        factId: milestone.id,
        title: milestone.title,
        snippet: milestone.summary,
        score,
      });
    }
  }

  for (const entry of buildProfileEntries(dataset)) {
    const haystack = entry.searchable.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) {
        score += 1;
      }
    }
    if (score > 0) {
      candidates.push({
        factId: entry.factId,
        title: entry.title,
        snippet: entry.snippet,
        score,
      });
    }
  }

  return candidates.sort((a, b) => b.score - a.score).slice(0, limit);
}
