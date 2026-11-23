import { FormEvent, useState } from 'react';
import {
  AlertTriangle,
  Bot,
  Send,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { QAResponse, SimulationMode } from '../types/biography';
import { askAboutBekzat } from '../utils/bioAssistant';
import { MAX_QUESTION_LENGTH } from '../utils/inputGuard';

const STARTER_QUESTIONS: readonly string[] = [
  'Where did Bekzat grow up and start with computers?',
  'What does Bekzat remember most about NIS Kyzylorda?',
  'What is he studying at KBTU and aiming for next?',
  'What are Bekzat’s hobbies and personal motto?',
];

export function AskBekzatWidget() {
  const [question, setQuestion] = useState('');
  const [mode, setMode] = useState<SimulationMode>('normal');
  const [response, setResponse] = useState<QAResponse | null>(null);

  const runQuery = (text: string, activeMode: SimulationMode) => {
    const result = askAboutBekzat(text, activeMode);
    setResponse(result);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runQuery(question, mode);
  };

  return (
    <section
      id="ask-bekzat"
      aria-labelledby="qa-heading"
      className="py-12"
    >
      <div className="rounded-2xl border-2 border-dashed border-amber-400/80 dark:border-amber-700/70 bg-amber-50/50 dark:bg-stone-900/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Bot className="h-4 w-4" aria-hidden="true" />
              <span>Bounded Advisory Q&amp;A · Trust Boundary Demo (W11–W12)</span>
            </div>
            <h2
              id="qa-heading"
              className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-50"
            >
              Ask About Bekzat
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Strictly grounded in the frozen biography dataset above. Input is
              capped at {MAX_QUESTION_LENGTH} characters and guarded against
              prompt injection.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="simulation-mode"
              className="font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400"
            >
              Defense Simulation Mode
            </label>
            <select
              id="simulation-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as SimulationMode)}
              className="rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <option value="normal">Normal (Mock Grounded)</option>
              <option value="timeout">Simulate Timeout</option>
              <option value="error">Simulate Adapter Error</option>
              <option value="hallucinate">Simulate Hallucination / XSS</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {STARTER_QUESTIONS.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => {
                setQuestion(starter);
                runQuery(starter, mode);
              }}
              className="rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-3 py-1 text-xs text-stone-700 dark:text-stone-300 hover:border-amber-600 dark:hover:border-amber-500 transition-colors"
            >
              {starter}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="qa-question-input" className="sr-only">
              Ask a question about Bekzat
            </label>
            <input
              id="qa-question-input"
              type="text"
              value={question}
              maxLength={MAX_QUESTION_LENGTH + 25}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about NIS Kyzylorda, KBTU, openEuler, anime, or test prompt injection..."
              className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <div className="mt-1 flex justify-end font-mono text-[11px] text-stone-500 dark:text-stone-400">
              {question.length}/{MAX_QUESTION_LENGTH} chars
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400 transition-colors"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Ask</span>
          </button>
        </form>

        <div aria-live="polite" className="mt-5">
          {response && (
            <div
              data-testid="qa-response-card"
              className={`rounded-xl border p-4 ${
                response.source === 'INPUT_REJECTED'
                  ? 'border-red-300 dark:border-red-800 bg-red-50/90 dark:bg-red-950/40'
                  : response.isFallback
                    ? 'border-amber-400 dark:border-amber-700 bg-white dark:bg-stone-950'
                    : 'border-emerald-300 dark:border-emerald-800 bg-white dark:bg-stone-950'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  data-testid="qa-provenance-badge"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold"
                >
                  {response.source === 'INPUT_REJECTED' ? (
                    <>
                      <ShieldAlert className="h-4 w-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                      <span className="text-red-700 dark:text-red-300">
                        Input Guard Rejected ({response.rejectionCode})
                      </span>
                    </>
                  ) : response.isFallback ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      <span className="text-amber-800 dark:text-amber-300">
                        Safe Deterministic Fallback
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-700 dark:text-emerald-300">
                        Advisory — Mock Grounded
                      </span>
                    </>
                  )}
                </span>

                {response.citedFactIds.length > 0 && (
                  <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                    Cited: {response.citedFactIds.join(', ')}
                  </span>
                )}
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                {response.answer}
              </p>

              {response.validationNotes.length > 0 && (
                <p className="mt-2 font-mono text-[11px] text-stone-500 dark:text-stone-400">
                  Boundary log: {response.validationNotes.join(' ')}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
