import { describe, expect, it } from 'vitest';
import { BIOGRAPHY_DATA } from '../data/biography';
import { filterAndSortMilestones } from '../utils/timelineFilter';

describe('filterAndSortMilestones (TC-03, TC-04)', () => {
  it('returns all milestones in ascending chronological order for "all"', () => {
    const result = filterAndSortMilestones(BIOGRAPHY_DATA.milestones, 'all', 'asc');
    expect(result.length).toBe(BIOGRAPHY_DATA.milestones.length);
    for (let i = 1; i < result.length; i += 1) {
      expect(result[i]!.sortOrder).toBeGreaterThan(result[i - 1]!.sortOrder);
    }
  });

  it('filters strictly by education, technical, and personal categories', () => {
    const education = filterAndSortMilestones(
      BIOGRAPHY_DATA.milestones,
      'education',
      'asc',
    );
    expect(education.length).toBeGreaterThan(0);
    expect(education.every((m) => m.category === 'education')).toBe(true);

    const technical = filterAndSortMilestones(
      BIOGRAPHY_DATA.milestones,
      'technical',
      'asc',
    );
    expect(technical.length).toBeGreaterThan(0);
    expect(technical.every((m) => m.category === 'technical')).toBe(true);

    const personal = filterAndSortMilestones(
      BIOGRAPHY_DATA.milestones,
      'personal',
      'asc',
    );
    expect(personal.length).toBeGreaterThan(0);
    expect(personal.every((m) => m.category === 'personal')).toBe(true);
  });

  it('sorts descending without mutating the frozen input array', () => {
    const desc = filterAndSortMilestones(BIOGRAPHY_DATA.milestones, 'all', 'desc');
    expect(desc[0]!.sortOrder).toBeGreaterThan(desc[desc.length - 1]!.sortOrder);
    expect(BIOGRAPHY_DATA.milestones[0]!.sortOrder).toBe(1);
  });
});
