import { create } from 'zustand';

export interface SearchFilters {
  location: string;
  radius: number;
  priceMin: number;
  priceMax: number;
  bedrooms: string;
  boundary: [number, number][] | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  createdAt: string;
}

interface AppState {
  filters: SearchFilters;
  savedSearches: SavedSearch[];
  highlightedPropertyId: number | null;
  viewMode: 'split' | 'list' | 'map';
  boundaryActive: boolean;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  saveSearch: (name: string) => void;
  loadSearch: (id: string) => SearchFilters | null;
  deleteSearch: (id: string) => void;
  setHighlightedPropertyId: (id: number | null) => void;
  setViewMode: (mode: 'split' | 'list' | 'map') => void;
  setBoundaryActive: (active: boolean) => void;
}

const defaultFilters: SearchFilters = {
  location: '',
  radius: 50,
  priceMin: 0,
  priceMax: 10000000,
  bedrooms: 'any',
  boundary: null,
  mapCenter: { lat: 37.7749, lng: -122.4194 },
  mapZoom: 4,
};

// Load saved searches from localStorage
const loadSavedSearches = (): SavedSearch[] => {
  try {
    const data = localStorage.getItem('savedSearches');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  filters: { ...defaultFilters },
  savedSearches: loadSavedSearches(),
  highlightedPropertyId: null,
  viewMode: 'split',
  boundaryActive: false,

  setFilters: (partial) =>
    set((s) => ({ filters: { ...s.filters, ...partial } })),

  resetFilters: () => set({ filters: { ...defaultFilters }, boundaryActive: false }),

  saveSearch: (name) => {
    const { filters, savedSearches } = get();
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      filters: { ...filters },
      createdAt: new Date().toISOString(),
    };
    const updated = [...savedSearches, newSearch];
    localStorage.setItem('savedSearches', JSON.stringify(updated));
    set({ savedSearches: updated });
  },

  loadSearch: (id) => {
    const search = get().savedSearches.find((s) => s.id === id);
    if (search) {
      set({ filters: { ...search.filters }, boundaryActive: !!search.filters.boundary });
      return search.filters;
    }
    return null;
  },

  deleteSearch: (id) => {
    const updated = get().savedSearches.filter((s) => s.id !== id);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
    set({ savedSearches: updated });
  },

  setHighlightedPropertyId: (id) => set({ highlightedPropertyId: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setBoundaryActive: (active) => set({ boundaryActive: active }),
}));
