export interface HealthSnapshot {
  steps: number;
  heartRate: number;
  calories: number;
  recordedAt: string;
}

export interface HealthProvider {
  isAvailable(): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  getToday(): Promise<HealthSnapshot | null>;
}

/** Adapter boundary for future Android Health Connect, Apple HealthKit, or wearable providers. */
export const unavailableHealthProvider: HealthProvider = {
  async isAvailable() { return false; },
  async requestPermissions() { return false; },
  async getToday() { return null; },
};
