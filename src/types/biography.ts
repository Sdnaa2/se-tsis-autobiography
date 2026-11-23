export type MilestoneCategory = 'education' | 'technical' | 'personal';

export type SortDirection = 'asc' | 'desc';

export type SimulationMode = 'normal' | 'timeout' | 'error' | 'hallucinate';

export type AnswerSource =
  | 'MOCK_ADVISORY'
  | 'DETERMINISTIC_FALLBACK'
  | 'INPUT_REJECTED';

export type InputErrorCode =
  | 'EMPTY_INPUT'
  | 'INPUT_TOO_LONG'
  | 'PROMPT_INJECTION_BLOCKED';

export interface EditableSlot {
  readonly value: string;
  readonly isEditablePlaceholder: boolean;
  readonly editHint: string;
}

export interface ContactLink {
  readonly label: string;
  readonly href: string;
  readonly isEditablePlaceholder: boolean;
}

export interface BiographyProfile {
  readonly fullName: string;
  readonly headline: string;
  readonly location: string;
  readonly hometown: string;
  readonly university: string;
  readonly program: string;
  readonly highSchool: string;
  readonly languages: readonly string[];
  readonly careerFocus: string;
  readonly shortSummary: string;
  readonly interests: readonly string[];
  readonly personalQuote: EditableSlot;
  readonly contactLinks: readonly ContactLink[];
}

export interface TimelineMilestone {
  readonly id: string;
  readonly period: string;
  readonly sortOrder: number;
  readonly title: string;
  readonly institutionOrPlace: string;
  readonly category: MilestoneCategory;
  readonly summary: string;
  readonly details: readonly string[];
  readonly tags: readonly string[];
  readonly isEditablePlaceholder: boolean;
}

export interface BiographyDataset {
  readonly profile: BiographyProfile;
  readonly milestones: readonly TimelineMilestone[];
  readonly coreValues: readonly string[];
}

export interface InputValidationResult {
  readonly ok: boolean;
  readonly sanitizedQuestion: string;
  readonly errorCode: InputErrorCode | null;
  readonly message: string | null;
}

export interface FactMatch {
  readonly factId: string;
  readonly title: string;
  readonly snippet: string;
  readonly score: number;
}

export interface QAResponse {
  readonly answer: string;
  readonly source: AnswerSource;
  readonly isFallback: boolean;
  readonly citedFactIds: readonly string[];
  readonly rejectionCode: InputErrorCode | null;
  readonly validationNotes: readonly string[];
}
