export type Workout = { title: string; meta: string; icon: string };

export const workouts: Workout[] = [
  { title: 'Full Body Power', meta: '28 min · Intermediate', icon: '⚡' },
  { title: 'Core & Stability', meta: '18 min · Beginner', icon: '◎' },
  { title: 'Mobility Reset', meta: '12 min · Recovery', icon: '◌' },
];

export const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const weekValues = [42, 70, 55, 86, 64, 95, 38];
