export interface AuthUser { id: string; name: string; email: string; }
export interface AuthService { signIn(email: string, password: string): Promise<AuthUser>; signUp(name: string, email: string, password: string): Promise<AuthUser>; signOut(): Promise<void>; }

/** Mock implementation only. Production authentication will be supplied by the backend. */
export const mockAuthService: AuthService = {
  async signIn(email) { return { id: 'demo-user', name: email.split('@')[0] || 'Athlete', email }; },
  async signUp(name, email) { return { id: 'demo-user', name, email }; },
  async signOut() { return undefined; },
};
