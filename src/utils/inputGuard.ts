import { InputValidationResult } from '../types/biography';

export const MAX_QUESTION_LENGTH = 200;

const INJECTION_PATTERNS: readonly RegExp[] = [
  /(?:ignore|disregard|forget)\s+(?:all\s+)?(?:previous|prior|above)\s+instructions?/i,
  /reveal\s+(?:the\s+)?(?:system\s+prompt|hidden\s+instructions?)/i,
  /system\s+prompt/i,
  /pretend\s+you\s+are/i,
  /act\s+as\s+(?:a\s+)?(?:different|unrestricted|admin)/i,
  /override\s+(?:rules|biography|facts|safety)/i,
  /\bjailbreak\b/i,
  /<\s*(?:script|iframe|svg|object|embed)\b/i,
  /on(?:error|load|click|mouseover)\s*=/i,
  /javascript\s*:/i,
];

function stripControlChars(value: string): string {
  let out = '';
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code >= 32 && code !== 127) {
      out += value[i];
    } else if (code === 9 || code === 10 || code === 13) {
      out += ' ';
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

export function validateQuestionInput(rawQuestion: string): InputValidationResult {
  const sanitized = stripControlChars(rawQuestion);

  if (sanitized.length === 0) {
    return {
      ok: false,
      sanitizedQuestion: '',
      errorCode: 'EMPTY_INPUT',
      message: 'Please enter a short question about Bekzat (up to 200 characters).',
    };
  }

  if (sanitized.length > MAX_QUESTION_LENGTH) {
    return {
      ok: false,
      sanitizedQuestion: sanitized,
      errorCode: 'INPUT_TOO_LONG',
      message: `Question exceeds the ${MAX_QUESTION_LENGTH}-character limit (${sanitized.length}/${MAX_QUESTION_LENGTH}).`,
    };
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      return {
        ok: false,
        sanitizedQuestion: sanitized,
        errorCode: 'PROMPT_INJECTION_BLOCKED',
        message:
          'Blocked by input guard: instruction-override or script-like payload detected. Authoritative biography data remains unchanged.',
      };
    }
  }

  return {
    ok: true,
    sanitizedQuestion: sanitized,
    errorCode: null,
    message: null,
  };
}
