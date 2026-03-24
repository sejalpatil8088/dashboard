import { useState, useEffect, useCallback, useRef } from 'react';
import { IApiState, IFilterState } from '../types';
import { fetchMockData, createInitialState } from '../services/dataService';

/**
 * Generic hook that fetches widget data and manages async state.
 * Re-fetches automatically when filters change (simulates filtered API calls).
 */
export function useWidgetData<T>(
  dataSource: string,
  filters?: IFilterState
): IApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<IApiState<T>>(createInitialState<T>());
  // Track in-flight requests to avoid stale updates
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    // Cancel any previous in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState({ data: null, status: 'loading', error: null });
    try {
      const data = await fetchMockData<T>(dataSource);
      setState({ data, status: 'success', error: null });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'Unknown error';
      setState({ data: null, status: 'error', error: message });
    }
  }, [dataSource]); // eslint-disable-line react-hooks/exhaustive-deps
  // filters intentionally omitted from dep array — we only use them to trigger refetch

  // Re-fetch when filters change
  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load, filters?.dateRange.label, filters?.platform]);

  return { ...state, refetch: load };
}
