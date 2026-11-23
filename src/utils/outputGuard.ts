import { FactMatch, QAResponse } from '../types/biography';

export const MAX_ANSWER_LENGTH = 320;
export const MAX_ANSWER_SENTENCES = 3;

const UNGROUNDED_CLAIM_PATTERNS: readonly RegExp[] = [
  /\b(MIT|Stanford|Harvard|Oxford|Cambridge|PhD|Doctorate)\b/i,
  /<\s*[a-z][^>]*>/i,
  /ignore\s+previous\s+instructions/i,
];

export function countSentences(text: string): number {
  const matches = text
    .trim()
    .split(/[.!?]+(?:\s|$)/)
    .map((part) => part.trim())
    .filter(Boolean);
  return matches.length;
}

export interface OutputValidationResult {
  readonly ok: boolean;
  readonly notes: readonly string[];
}

export function validateAssistantOutput(
  draftText: string,
  matches: readonly FactMatch[],
): OutputValidationResult {
  const notes: string[] = [];
  const trimmed = draftText.trim();

  if (trimmed.length === 0) {
    notes.push('Rejected empty advisory output.');
  }

  if (trimmed.length > MAX_ANSWER_LENGTH) {
    notes.push(
      `Rejected output exceeding ${MAX_ANSWER_LENGTH} characters (${trimmed.length}).`,
    );
  }

  const sentenceCount = countSentences(trimmed);
  if (sentenceCount > MAX_ANSWER_SENTENCES) {
    notes.push(
      `Rejected output exceeding ${MAX_ANSWER_SENTENCES} sentences (${sentenceCount}).`,
    );
  }

  for (const pattern of UNGROUNDED_CLAIM_PATTERNS) {
    if (pattern.test(trimmed)) {
      notes.push('Rejected ungrounded or unsafe markup/claim in advisory draft.');
      break;
    }
  }

  if (matches.length === 0 && /KBTU|NIS|Kyzylorda/i.test(trimmed)) {
    notes.push('Rejected specific biography claim without retrieved fact match.');
  }

  return {
    ok: notes.length === 0,
    notes,
  };
}

export function buildDeterministicFallback(
  matches: readonly FactMatch[],
  reasonNote: string,
): QAResponse {
  if (matches.length === 0) {
    return {
      answer:
        'That detail is not listed in Bekzat’s verified biography. Try asking about Kyzylorda, NIS, KBTU, languages, or hobbies.',
      source: 'DETERMINISTIC_FALLBACK',
      isFallback: true,
      citedFactIds: [],
      rejectionCode: null,
      validationNotes: [reasonNote],
    };
  }

  const top = matches[0]!;
  const safeSnippet =
    top.snippet.length <= MAX_ANSWER_LENGTH
      ? top.snippet
      : `${top.snippet.slice(0, MAX_ANSWER_LENGTH - 3).trim()}...`;

  return {
    answer: safeSnippet,
    source: 'DETERMINISTIC_FALLBACK',
    isFallback: true,
    citedFactIds: matches.map((m) => m.factId),
    rejectionCode: null,
    validationNotes: [reasonNote],
  };
}
