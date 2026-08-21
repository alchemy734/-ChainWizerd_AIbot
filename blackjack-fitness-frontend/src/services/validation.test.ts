import { describe, expect, it } from 'vitest';
import { validateProfile } from './validation';
import type { UserProfile } from '../types';

const valid: UserProfile = { name: 'Athlete', age: 24, heightCm: 175, weightKg: 72, goal: 'strength', level: 'intermediate' };

describe('validateProfile', () => {
  it('accepts a valid profile', () => expect(validateProfile(valid)).toEqual({}));
  it('rejects missing name', () => expect(validateProfile({ ...valid, name: ' ' }).name).toBeTruthy());
  it('rejects an invalid age', () => expect(validateProfile({ ...valid, age: 12 }).age).toBeTruthy());
  it('rejects invalid height and weight', () => {
    const errors = validateProfile({ ...valid, heightCm: 99, weightKg: 301 });
    expect(errors.heightCm).toBeTruthy();
    expect(errors.weightKg).toBeTruthy();
  });
});
