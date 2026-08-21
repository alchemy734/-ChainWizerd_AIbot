import { loadState, saveState } from './storage';

export interface WorkoutRecord { workoutId: string; completedAt: string; durationMinutes: number; }
const KEY = 'workout-history';

export function getWorkoutHistory(): WorkoutRecord[] { return loadState<WorkoutRecord[]>(KEY, []); }
export function recordWorkout(record: WorkoutRecord): WorkoutRecord[] {
  const next = [record, ...getWorkoutHistory()].slice(0, 100);
  saveState(KEY, next);
  return next;
}
