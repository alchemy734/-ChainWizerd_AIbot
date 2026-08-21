const PREFIX = 'blackjack-fitness:';

export function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveState<T>(key: string, value: T): void {
  try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

export function removeState(key: string): void {
  try { window.localStorage.removeItem(PREFIX + key); } catch { /* storage unavailable */ }
}
