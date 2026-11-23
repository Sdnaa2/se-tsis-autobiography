import { describe, expect, it } from 'vitest';
import { BIOGRAPHY_DATA } from '../data/biography';

describe('BIOGRAPHY_DATA immutability & schema (TC-01)', () => {
  it('deep-freezes profile, milestones, and nested arrays', () => {
    expect(Object.isFrozen(BIOGRAPHY_DATA)).toBe(true);
    expect(Object.isFrozen(BIOGRAPHY_DATA.profile)).toBe(true);
    expect(Object.isFrozen(BIOGRAPHY_DATA.milestones)).toBe(true);
    expect(Object.isFrozen(BIOGRAPHY_DATA.milestones[0])).toBe(true);
    expect(Object.isFrozen(BIOGRAPHY_DATA.milestones[0]?.details)).toBe(true);
  });

  it('throws TypeError in strict mode when attempting mutation', () => {
    expect(() => {
      (BIOGRAPHY_DATA.profile as { fullName: string }).fullName = 'Tampered';
    }).toThrow(TypeError);

    expect(() => {
      (BIOGRAPHY_DATA.milestones as unknown[]).push({ id: 'fake' });
    }).toThrow(TypeError);
  });

  it('contains Bekzat’s verified profile facts and unique milestone IDs', () => {
    expect(BIOGRAPHY_DATA.profile.fullName).toBe('Kalenuly Bekzat');
    expect(BIOGRAPHY_DATA.profile.highSchool).toContain('NIS');
    expect(BIOGRAPHY_DATA.profile.university).toContain('KBTU');

    const ids = BIOGRAPHY_DATA.milestones.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
