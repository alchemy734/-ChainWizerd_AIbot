export interface ApiClient { get<T>(path: string): Promise<T>; post<T>(path: string, body: unknown): Promise<T>; }

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) } });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const apiClient: ApiClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};
