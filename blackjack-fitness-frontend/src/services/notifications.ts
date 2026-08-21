export interface NotificationService { requestPermission(): Promise<boolean>; scheduleWorkoutReminder(when: Date, title: string): Promise<boolean>; }

/** Browser-safe placeholder. Native Android/iOS scheduling will be implemented later. */
export const browserNotificationService: NotificationService = {
  async requestPermission() {
    if (!('Notification' in window)) return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },
  async scheduleWorkoutReminder(when, title) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return false;
    const delay = Math.max(0, when.getTime() - Date.now());
    window.setTimeout(() => new Notification(title), delay);
    return true;
  },
};
