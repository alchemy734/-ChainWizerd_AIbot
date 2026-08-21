import type { UserProfile } from '../types';

export interface ValidationErrors { name?: string; age?: string; heightCm?: string; weightKg?: string; }

export function validateProfile(profile: UserProfile): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!profile.name.trim()) errors.name = 'Name is required.';
  if (!Number.isFinite(profile.age) || profile.age < 13 || profile.age > 120) errors.age = 'Age must be between 13 and 120.';
  if (!Number.isFinite(profile.heightCm) || profile.heightCm < 100 || profile.heightCm > 250) errors.heightCm = 'Height must be between 100 and 250 cm.';
  if (!Number.isFinite(profile.weightKg) || profile.weightKg < 30 || profile.weightKg > 300) errors.weightKg = 'Weight must be between 30 and 300 kg.';
  return errors;
}
