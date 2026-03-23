import { useMemo, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { MapContainer } from '@/components/MapContainer';
import { PropertyCard } from '@/components/PropertyCard';
import { FiltersPanel } from '@/components/FiltersPanel';
import { properties } from '@/data/properties';
import { useAppStore } from '@/store/useAppStore';
import { haversineDistance, pointInPolygon } from '@/utils/haversine';
import { LayoutGrid, Map, Columns } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Properties() {
  const { filters, highlightedPropertyId, setHighlightedPropertyId, viewMode, setViewMode } = useAppStore();

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Price filter
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;

      // Bedrooms filter
      if (filters.bedrooms !== 'any' && p.bedrooms < Number(filters.bedrooms)) return false;

      // Radius filter (only if location is set and map is zoomed in)
      if (filters.mapZoom >= 8) {
        const dist = haversineDistance(
          filters.mapCenter.lat, filters.mapCenter.lng,
          p.latitude, p.longitude
        );
        if (dist > filters.radius) return false;
      }

      // Boundary filter
      if (filters.boundary) {
        if (!pointInPolygon([p.longitude, p.latitude], filters.boundary)) return false;
      }

      return true;
    });
  }, [filters]);

  const handleMarkerClick = useCallback((id: number) => {
    setHighlightedPropertyId(id);
    const el = document.querySelector(`[data-testid="property-card-${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [setHighlightedPropertyId]);

  return (
    <div data-testid="properties-container" className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex items-center justify-between py-3">
        <h1 className="font-display text-2xl font-bold">Properties</h1>
        <div data-testid="view-toggle" className="flex rounded-lg border bg-muted p-1">
          {([
            ['split', Columns],
            ['list', LayoutGrid],
            ['map', Map],
          ] as const).map(([mode, Icon]) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                viewMode === mode
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="container flex-1 pb-6">
        <div className={cn(
          'grid gap-4',
          viewMode === 'split' ? 'lg:grid-cols-[280px_1fr_1fr]' :
          viewMode === 'list' ? 'lg:grid-cols-[280px_1fr]' :
          'lg:grid-cols-[280px_1fr]'
        )}>
          {/* Filters */}
          <aside className="order-2 lg:order-1">
            <FiltersPanel resultsCount={filteredProperties.length} />
          </aside>

          {/* Property List */}
          {viewMode !== 'map' && (
            <div
              data-testid="property-list"
              className={cn(
                'order-3 lg:order-2 grid gap-4 auto-rows-max',
                viewMode === 'list' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1',
                'max-h-[calc(100vh-180px)] overflow-y-auto pr-1'
              )}
            >
              {filteredProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  isHighlighted={highlightedPropertyId === p.id}
                />
              ))}
              {filteredProperties.length === 0 && (
                <p className="col-span-full py-12 text-center text-muted-foreground">
                  No properties match your filters.
                </p>
              )}
            </div>
          )}

          {/* Map */}
          {viewMode !== 'list' && (
            <div className="order-1 lg:order-3 h-[400px] lg:h-[calc(100vh-180px)] rounded-xl overflow-hidden border lg:sticky lg:top-[88px]">
              <MapContainer
                properties={filteredProperties}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
