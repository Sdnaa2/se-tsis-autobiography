import { describe, expect, it } from 'vitest';
import { BIOGRAPHY_DATA } from '../data/biography';
import { retrieveRelevantFacts } from '../utils/biographySearch';

describe('retrieveRelevantFacts word-boundary & stemming (F2)', () => {
  it('avoids false-positive substring matches like "car" -> "career"', () => {
    expect(retrieveRelevantFacts('Does Bekzat own a car?', BIOGRAPHY_DATA)).toEqual([]);
    expect(retrieveRelevantFacts('What is Bekzat’s favorite art?', BIOGRAPHY_DATA)).toEqual([]);
  });

  it('matches stemmed/inflected queries accurately', () => {
    const compMatches = retrieveRelevantFacts(
      'Where did Bekzat grow up and start with computers?',
      BIOGRAPHY_DATA,
    );
    expect(compMatches.some((m) => m.factId === 'ms-01-kyzylorda-spark')).toBe(true);

    const hobbyMatches = retrieveRelevantFacts(
      'What are his hobbies and motto?',
      BIOGRAPHY_DATA,
    );
    expect(hobbyMatches[0]?.factId).toBe('profile-interests-quote');
  });

  it('returns empty array for stop-word or punctuation-only input', () => {
    expect(retrieveRelevantFacts('what is he in the to ???', BIOGRAPHY_DATA)).toEqual([]);
  });

  it('respects result limit and descending score order', () => {
    const matches = retrieveRelevantFacts('KBTU NIS Kyzylorda anime', BIOGRAPHY_DATA, 2);
    expect(matches.length).toBeLessThanOrEqual(2);
    if (matches.length === 2) {
      expect(matches[0]!.score).toBeGreaterThanOrEqual(matches[1]!.score);
    }
  });
});
