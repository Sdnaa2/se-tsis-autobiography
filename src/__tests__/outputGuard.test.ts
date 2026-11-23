import { describe, expect, it } from 'vitest';
import { FactMatch } from '../types/biography';
import {
  buildDeterministicFallback,
  MAX_ANSWER_LENGTH,
  validateAssistantOutput,
} from '../utils/outputGuard';

const SAMPLE_MATCHES: FactMatch[] = [
  {
    factId: 'ms-02-nis-kyzylorda',
    title: 'NIS Kyzylorda',
    snippet: 'Bekzat attended NIS Kyzylorda.',
    score: 4,
  },
  {
    factId: 'profile-education',
    title: 'Education',
    snippet: 'Bekzat studies at KBTU.',
    score: 2,
  },
];

describe('outputGuard contract & fallback (F3, F4, AC-07)', () => {
  it('rejects empty advisory drafts', () => {
    const res = validateAssistantOutput('   ', SAMPLE_MATCHES);
    expect(res.ok).toBe(false);
  });

  it('rejects drafts exceeding MAX_ANSWER_LENGTH (320 chars)', () => {
    const longDraft = 'Bekzat studied hard. '.repeat(20);
    expect(longDraft.length).toBeGreaterThan(MAX_ANSWER_LENGTH);
    const res = validateAssistantOutput(longDraft, SAMPLE_MATCHES);
    expect(res.ok).toBe(false);
    expect(res.notes.some((n) => n.includes('320'))).toBe(true);
  });

  it('rejects drafts exceeding 3 sentences', () => {
    const fourSentences = 'One fact. Two facts. Three facts. Four facts.';
    const res = validateAssistantOutput(fourSentences, SAMPLE_MATCHES);
    expect(res.ok).toBe(false);
    expect(res.notes.some((n) => n.includes('3 sentences'))).toBe(true);
  });

  it('rejects HTML markup and ungrounded entity claims when matches are empty', () => {
    expect(validateAssistantOutput('Hello <b>world</b>.', SAMPLE_MATCHES).ok).toBe(false);
    expect(validateAssistantOutput('Bekzat studies at KBTU.', []).ok).toBe(false);
  });

  it('buildDeterministicFallback cites only top match and safely truncates long snippets', () => {
    const longMatch: FactMatch[] = [
      {
        factId: 'ms-long',
        title: 'Long',
        snippet: 'x'.repeat(400),
        score: 3,
      },
      ...SAMPLE_MATCHES,
    ];
    const fallback = buildDeterministicFallback(longMatch, 'Simulated error');
    expect(fallback.isFallback).toBe(true);
    expect(fallback.answer.length).toBeLessThanOrEqual(MAX_ANSWER_LENGTH);
    expect(fallback.citedFactIds).toEqual(['ms-long']);
  });
});
