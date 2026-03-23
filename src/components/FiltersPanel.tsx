import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Search, SlidersHorizontal, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtYnh4MHBhbjBjMDMyam9oOWV0aTV0MWoifQ.demo';

interface Suggestion {
  place_name: string;
  center: [number, number];
}

interface FiltersPanelProps {
  resultsCount: number;
}

export function FiltersPanel({ resultsCount }: FiltersPanelProps) {
  const { filters, setFilters, saveSearch } = useAppStore();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleLocationChange = (value: string) => {
    setFilters({ location: value });

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${MAPBOX_TOKEN}&country=us&limit=5`
        );
        const data = await res.json();
        if (data.features) {
          setSuggestions(
            data.features.map((f: any) => ({
              place_name: f.place_name,
              center: f.center,
            }))
          );
          setShowSuggestions(true);
        }
      } catch {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setFilters({
      location: suggestion.place_name,
      mapCenter: { lat: suggestion.center[1], lng: suggestion.center[0] },
      mapZoom: 12,
    });
    setShowSuggestions(false);
  };

  const handleSaveSearch = () => {
    if (searchName.trim()) {
      saveSearch(searchName.trim());
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-semibold">Filters</h2>
      </div>

      {/* Location Autocomplete */}
      <div className="relative">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Location</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            data-testid="location-autocomplete"
            type="text"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search location..."
            className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border bg-popover shadow-lg">
            {suggestions.map((s, i) => (
              <button
                key={i}
                data-testid={`autocomplete-suggestion-${i}`}
                onClick={() => handleSuggestionClick(s)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {s.place_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Radius Slider */}
      <div>
        <label className="mb-1 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Search Radius</span>
          <span>{filters.radius} mi</span>
        </label>
        <input
          data-testid="search-radius-slider"
          type="range"
          min="1"
          max="100"
          value={filters.radius}
          onChange={(e) => setFilters({ radius: Number(e.target.value) })}
          className="w-full accent-primary"
        />
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Min Price</label>
          <input
            data-testid="price-min-input"
            type="number"
            value={filters.priceMin}
            onChange={(e) => setFilters({ priceMin: Number(e.target.value) })}
            placeholder="$0"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Max Price</label>
          <input
            data-testid="price-max-input"
            type="number"
            value={filters.priceMax}
            onChange={(e) => setFilters({ priceMax: Number(e.target.value) })}
            placeholder="$10,000,000"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Bedrooms</label>
        <select
          data-testid="bedrooms-select"
          value={filters.bedrooms}
          onChange={(e) => setFilters({ bedrooms: e.target.value })}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="any">Any</option>
          <option value="0">Studio</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Apply Filters */}
      <Button data-testid="apply-filters-button" className="w-full">
        Apply Filters
      </Button>

      {/* Results Count */}
      <div data-testid="results-count" className="text-center text-sm text-muted-foreground">
        {resultsCount} properties found
      </div>

      {/* Save Search */}
      <div className="border-t pt-4">
        {showSaveDialog ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search name..."
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              onKeyDown={(e) => e.key === 'Enter' && handleSaveSearch()}
            />
            <Button size="sm" onClick={handleSaveSearch}>Save</Button>
          </div>
        ) : (
          <Button
            data-testid="save-search-button"
            variant="outline"
            className="w-full"
            onClick={() => setShowSaveDialog(true)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Search
          </Button>
        )}
      </div>
    </div>
  );
}
