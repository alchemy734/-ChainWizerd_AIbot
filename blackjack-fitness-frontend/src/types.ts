export type Goal = 'strength' | 'weight-loss' | 'mobility' | 'endurance';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  age: number;
  heightCm: number;
  weightKg: number;
  goal: Goal;
  level: FitnessLevel;
}

export interface Workout {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  level: FitnessLevel;
  calories: number;
  description: string;
  exercises: string[];
}

export interface DailyMetrics {
  steps: number;
  stepGoal: number;
  calories: number;
  heartRate: number;
  workoutMinutes: number;
}
