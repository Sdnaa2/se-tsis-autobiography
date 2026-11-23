import { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { SortDirection, TimelineMilestone } from '../types/biography';
import {
  CategoryFilter,
  filterAndSortMilestones,
} from '../utils/timelineFilter';

interface TimelineSectionProps {
  milestones: readonly TimelineMilestone[];
}

const CATEGORY_OPTIONS: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: 'All Chapters' },
  { id: 'education', label: 'Education' },
  { id: 'technical', label: 'Technical' },
  { id: 'personal', label: 'Personal' },
];

export function TimelineSection({ milestones }: TimelineSectionProps) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'ms-01-kyzylorda-spark': true,
  });

  const visibleMilestones = filterAndSortMilestones(
    milestones,
    category,
    sortDirection,
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="scroll-mt-20 border-b border-stone-200 dark:border-stone-800 py-12"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Authoritative Life &amp; Education Record
          </p>
          <h2
            id="timeline-heading"
            className="mt-1 font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50"
          >
            Chapters &amp; Milestones
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          className="inline-flex items-center self-start gap-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 transition-colors"
        >
          <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            {sortDirection === 'asc' ? 'Oldest → Newest' : 'Newest → Oldest'}
          </span>
        </button>
      </div>

      <div
        role="group"
        aria-label="Filter timeline chapters"
        className="mt-6 flex flex-wrap gap-2"
      >
        {CATEGORY_OPTIONS.map((option) => {
          const active = category === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(option.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 transition-colors ${
                active
                  ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950'
                  : 'border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-400'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <ol className="mt-8 space-y-6 border-l-2 border-stone-200 dark:border-stone-800 pl-6">
        {visibleMilestones.map((item) => {
          const isExpanded = Boolean(expandedIds[item.id]);
          const detailsId = `milestone-details-${item.id}`;
          return (
            <li key={item.id} className="relative">
              <span
                className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-[#FAF8F5] dark:border-[#0F1115] bg-amber-600 dark:bg-amber-400"
                aria-hidden="true"
              />

              <article className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/70 p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-medium text-amber-800 dark:text-amber-400">
                    {item.period}
                  </span>
                  <span className="rounded-full bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-stone-700 dark:text-stone-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
                  {item.institutionOrPlace}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {item.summary}
                </p>

                {isExpanded && (
                  <ul
                    id={detailsId}
                    className="mt-3 space-y-1.5 border-t border-stone-100 dark:border-stone-800 pt-3 text-sm text-stone-700 dark:text-stone-300"
                  >
                    {item.details.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-stone-100 dark:bg-stone-800 px-2 py-0.5 font-mono text-[11px] text-stone-700 dark:text-stone-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={() => toggleExpand(item.id)}
                    className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                  >
                    <span>{isExpanded ? 'Hide notes' : 'Read chapter notes'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
