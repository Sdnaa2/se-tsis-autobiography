import {
  MilestoneCategory,
  SortDirection,
  TimelineMilestone,
} from '../types/biography';

export type CategoryFilter = 'all' | MilestoneCategory;

export function filterAndSortMilestones(
  milestones: readonly TimelineMilestone[],
  category: CategoryFilter,
  direction: SortDirection,
): TimelineMilestone[] {
  const filtered =
    category === 'all'
      ? [...milestones]
      : milestones.filter((item) => item.category === category);

  return filtered.sort((a, b) =>
    direction === 'asc' ? a.sortOrder - b.sortOrder : b.sortOrder - a.sortOrder,
  );
}
