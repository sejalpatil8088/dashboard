import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { IFilterState, IDateRange } from '../types';

// ─── Constants ─────────────────────────────────────────────────────────────

export const DATE_RANGES: IDateRange[] = [
  { label: 'Last 7 days',  startDate: '1 Jun 2025',  endDate: '7 Jun 2025'  },
  { label: 'Last 30 days', startDate: '8 May 2025',  endDate: '7 Jun 2025'  },
  { label: 'Last 90 days', startDate: '9 Mar 2025',  endDate: '7 Jun 2025'  },
];

export const PLATFORMS = ['Amazon', 'Flipkart', 'Myntra'] as const;

const DEFAULT_FILTERS: IFilterState = {
  dateRange: DATE_RANGES[0],
  platform: 'Amazon',
};

// ─── Context ───────────────────────────────────────────────────────────────

interface FilterContextValue {
  filters: IFilterState;
  setDateRange: (range: IDateRange) => void;
  setPlatform: (platform: string) => void;
}

const FilterContext = createContext<FilterContextValue>({
  filters: DEFAULT_FILTERS,
  setDateRange: () => {},
  setPlatform: () => {},
});

// ─── Provider ──────────────────────────────────────────────────────────────

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<IFilterState>(DEFAULT_FILTERS);

  const setDateRange = useCallback((range: IDateRange) => {
    setFilters((prev) => ({ ...prev, dateRange: range }));
  }, []);

  const setPlatform = useCallback((platform: string) => {
    setFilters((prev) => ({ ...prev, platform }));
  }, []);

  const value = useMemo(
    () => ({ filters, setDateRange, setPlatform }),
    [filters, setDateRange, setPlatform]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useFilter(): FilterContextValue {
  return useContext(FilterContext);
}
