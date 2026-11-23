import { describe, expect, it } from 'vitest';
import { askAboutBekzat } from '../utils/bioAssistant';
import { countSentences, MAX_ANSWER_LENGTH } from '../utils/outputGuard';

describe('askAboutBekzat & outputGuard (TC-06, TC-07, TC-11, TC-12)', () => {
  it('returns a grounded answer with citedFactIds for NIS Kyzylorda (TC-06)', () => {
    const res = askAboutBekzat('Where did Bekzat go to high school NIS?');
    expect(res.source).toBe('MOCK_ADVISORY');
    expect(res.isFallback).toBe(false);
    expect(res.citedFactIds.length).toBeGreaterThan(0);
    expect(res.answer.length).toBeLessThanOrEqual(MAX_ANSWER_LENGTH);
    expect(countSentences(res.answer)).toBeLessThanOrEqual(3);
  });

  it('handles out-of-scope questions without fabricating facts (TC-07)', () => {
    const res = askAboutBekzat('What is Bekzat’s favorite quantum physics theorem?');
    expect(res.source).toBe('MOCK_ADVISORY');
    expect(res.citedFactIds).toEqual([]);
    expect(res.answer.toLowerCase()).toContain('not in bekzat');
  });

  it('falls back safely on simulated timeout and error (TC-11)', () => {
    const timeoutRes = askAboutBekzat('Tell me about KBTU', 'timeout');
    expect(timeoutRes.source).toBe('DETERMINISTIC_FALLBACK');
    expect(timeoutRes.isFallback).toBe(true);
    expect(timeoutRes.citedFactIds.length).toBeGreaterThan(0);

    const errorRes = askAboutBekzat('Tell me about KBTU', 'error');
    expect(errorRes.source).toBe('DETERMINISTIC_FALLBACK');
    expect(errorRes.isFallback).toBe(true);
  });

  it('catches simulated hallucination / XSS / over-length draft and replaces with fallback (TC-12)', () => {
    const res = askAboutBekzat('Tell me about KBTU', 'hallucinate');
    expect(res.source).toBe('DETERMINISTIC_FALLBACK');
    expect(res.isFallback).toBe(true);
    expect(res.answer).not.toContain('MIT');
    expect(res.answer).not.toContain('<script>');
  });
});
