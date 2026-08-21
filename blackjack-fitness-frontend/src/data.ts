import type { DailyMetrics, UserProfile, Workout } from './types';

export const profile: UserProfile = {
  name: 'Athlete', age: 24, heightCm: 175, weightKg: 72, goal: 'strength', level: 'intermediate'
};

export const metrics: DailyMetrics = {
  steps: 6842, stepGoal: 10000, calories: 412, heartRate: 72, workoutMinutes: 28
};

export const workouts: Workout[] = [
  { id: 'power', title: 'Full Body Power', category: 'Strength', durationMinutes: 28, level: 'intermediate', calories: 240, description: 'A balanced full-body session built around controlled strength movements.', exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank shoulder taps'] },
  { id: 'core', title: 'Core & Stability', category: 'Core', durationMinutes: 18, level: 'beginner', calories: 130, description: 'Build trunk stability and control with a focused low-impact session.', exercises: ['Dead bug', 'Bird dog', 'Glute bridge', 'Forearm plank'] },
  { id: 'mobility', title: 'Mobility Reset', category: 'Recovery', durationMinutes: 12, level: 'beginner', calories: 70, description: 'Reset after a long day with gentle mobility and recovery work.', exercises: ['Cat-cow', 'World’s greatest stretch', 'Hip opener', 'Child’s pose'] },
  { id: 'conditioning', title: 'Conditioning Circuit', category: 'Cardio', durationMinutes: 24, level: 'intermediate', calories: 220, description: 'A short conditioning circuit designed to raise your heart rate safely.', exercises: ['High knees', 'Mountain climbers', 'Bodyweight squats', 'Marching plank'] }
];

export const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const weekValues = [42, 70, 55, 86, 64, 95, 38];
