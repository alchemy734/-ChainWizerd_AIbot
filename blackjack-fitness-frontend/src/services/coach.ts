export interface CoachRequest { message: string; context?: { goal?: string; level?: string; availableMinutes?: number; recentWorkout?: string; }; }
export interface CoachResponse { message: string; suggestedWorkoutId?: string; }

/** Frontend boundary for the future Spring Boot/LLM coach endpoint. */
export interface CoachService { ask(request: CoachRequest): Promise<CoachResponse>; }

export const mockCoachService: CoachService = {
  async ask({ message }) {
    const twenty = /20|twenty/.test(message.toLowerCase());
    return { message: `For today, I recommend ${twenty ? 'Core & Stability' : 'Full Body Power'}. Focus on controlled movement and adjust intensity to your energy level.`, suggestedWorkoutId: twenty ? 'core' : 'power' };
  },
};
