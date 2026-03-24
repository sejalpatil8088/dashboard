import { IApiState } from '../types';

/**
 * Fetches data from a given path/URL with a simulated network delay.
 * In a real app, replace this with an axios/fetch client that includes
 * auth headers, base URL, and filter query params.
 */
export async function fetchMockData<T>(dataSource: string): Promise<T> {
  // Simulate realistic API latency (300–700ms)
  await new Promise<void>((res) => setTimeout(res, 300 + Math.random() * 400));

  const response = await fetch(dataSource);

  if (!response.ok) {
    throw new Error(`Failed to load "${dataSource}" — ${response.status} ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
}

export function createInitialState<T>(): IApiState<T> {
  return { data: null, status: 'idle', error: null };
}
