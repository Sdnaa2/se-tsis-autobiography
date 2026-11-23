import { BIOGRAPHY_DATA } from '../data/biography';
import {
  BiographyDataset,
  FactMatch,
  QAResponse,
  SimulationMode,
} from '../types/biography';
import { retrieveRelevantFacts } from './biographySearch';
import { validateQuestionInput } from './inputGuard';
import {
  buildDeterministicFallback,
  validateAssistantOutput,
} from './outputGuard';

function runMockAdvisoryAdapter(
  _sanitizedQuestion: string,
  matches: readonly FactMatch[],
  mode: SimulationMode,
): { ok: true; draft: string } | { ok: false; reason: string } {
  if (mode === 'timeout') {
    return { ok: false, reason: 'Advisory adapter timed out after 1500ms.' };
  }

  if (mode === 'error') {
    return { ok: false, reason: 'Advisory adapter returned simulated 503 error.' };
  }

  if (mode === 'hallucinate') {
    return {
      ok: true,
      draft:
        'Bekzat graduated from MIT with a PhD in Quantum Computing and <script>alert(1)</script> has worked as a principal architect for 15 years across five continents, which completely contradicts the verified record and exceeds the allowed contract length for this bounded widget.',
    };
  }

  if (matches.length === 0) {
    return {
      ok: true,
      draft:
        'That topic is not in Bekzat’s verified biography. Try asking about his hometown, education, technical coursework, or personal interests.',
    };
  }

  const primary = matches[0]!;
  return {
    ok: true,
    draft: primary.snippet,
  };
}

export function askAboutBekzat(
  rawQuestion: string,
  mode: SimulationMode = 'normal',
  dataset: BiographyDataset = BIOGRAPHY_DATA,
): QAResponse {
  const inputCheck = validateQuestionInput(rawQuestion);
  if (!inputCheck.ok) {
    return {
      answer: inputCheck.message ?? 'Invalid question input.',
      source: 'INPUT_REJECTED',
      isFallback: false,
      citedFactIds: [],
      rejectionCode: inputCheck.errorCode,
      validationNotes: [inputCheck.message ?? 'Input rejected.'],
    };
  }

  const matches = retrieveRelevantFacts(inputCheck.sanitizedQuestion, dataset, 2);
  const adapterResult = runMockAdvisoryAdapter(
    inputCheck.sanitizedQuestion,
    matches,
    mode,
  );

  if (!adapterResult.ok) {
    return buildDeterministicFallback(matches, adapterResult.reason);
  }

  const outputCheck = validateAssistantOutput(adapterResult.draft, matches);
  if (!outputCheck.ok) {
    return buildDeterministicFallback(
      matches,
      outputCheck.notes.join(' '),
    );
  }

  return {
    answer: adapterResult.draft.trim(),
    source: 'MOCK_ADVISORY',
    isFallback: false,
    citedFactIds: matches.map((m) => m.factId),
    rejectionCode: null,
    validationNotes: ['Output contract verified (<=320 chars, <=3 sentences, grounded).'],
  };
}
