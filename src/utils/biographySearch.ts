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
  'get',
  'go',
  'have',
  'he',
  'his',
  'how',
  'in',
  'is',
  'it',
  'kalenuly',
  'me',
  'of',
  'on',
  'or',
  'tell',
  'the',
  'to',
  'up',
  'what',
  'when',
  'where',
  'which',
  'who',
  'why',
  'with',
]);

function normalizeStem(word: string): string {
  if (word.length > 5 && word.endsWith('ing')) {
    return word.slice(0, -3);
  }
  if (word.length > 4 && word.endsWith('ies')) {
    return `${word.slice(0, -3)}y`;
  }
  if (word.length > 4 && word.endsWith('es')) {
    return word.slice(0, -2);
  }
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss') && word !== 'nis') {
    return word.slice(0, -1);
  }
  return word;
}

export function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token))
    .map(normalizeStem);
}

function buildWordSet(text: string): Set<string> {
  return new Set(tokenizeText(text));
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
      searchable: `${profile.languages.join(' ')} ${profile.careerFocus} language speak career job backend goal aim next`,
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
  const tokens = Array.from(new Set(tokenizeText(question)));
  if (tokens.length === 0) {
    return [];
  }

  const candidates: FactMatch[] = [];

  for (const milestone of dataset.milestones) {
    const haystackWords = buildWordSet(
      [
        milestone.title,
        milestone.institutionOrPlace,
        milestone.period,
        milestone.category,
        milestone.summary,
        milestone.details.join(' '),
        milestone.tags.join(' '),
      ].join(' '),
    );
    const titleWords = buildWordSet(milestone.title);
    const tagWords = buildWordSet(milestone.tags.join(' '));

    let score = 0;
    for (const token of tokens) {
      if (haystackWords.has(token)) {
        score += 1;
        if (titleWords.has(token)) score += 1;
        if (tagWords.has(token)) score += 1;
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
    const entryWords = buildWordSet(entry.searchable);
    let score = 0;
    for (const token of tokens) {
      if (entryWords.has(token)) {
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
