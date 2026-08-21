import { loadState, saveState } from './storage';
import type { UserProfile } from '../types';

const PROFILE_KEY = 'profile';
const ONBOARDED_KEY = 'onboarded';

export function getProfile(fallback: UserProfile): UserProfile { return loadState(PROFILE_KEY, fallback); }
export function saveProfile(profile: UserProfile): void { saveState(PROFILE_KEY, profile); }
export function hasCompletedOnboarding(): boolean { return loadState(ONBOARDED_KEY, false); }
export function setCompletedOnboarding(value = true): void { saveState(ONBOARDED_KEY, value); }
