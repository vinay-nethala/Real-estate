import { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Property } from '@/data/properties';
import { useAppStore } from '@/store/useAppStore';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtYnh4MHBhbjBjMDMyam9oOWV0aTV0MWoifQ.demo';

interface MapContainerProps {
  properties: Property[];
  onMarkerClick?: (id: number) => void;
}

export function MapContainer({ properties, onMarkerClick }: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<number, mapboxgl.Marker>>(new Map());
  const drawRef = useRef<MapboxDraw | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { filters, setFilters, setBoundaryActive, boundaryActive, highlightedPropertyId } = useAppStore();

  const initMap = useCallback(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: import.meta.env.VITE_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11',
      center: [filters.mapCenter.lng, filters.mapCenter.lat],
      zoom: filters.mapZoom,
    });

    m.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      defaultMode: 'simple_select',
    });
    m.addControl(draw as unknown as mapboxgl.IControl);
    drawRef.current = draw;

    m.on('load', () => {
      setMapLoaded(true);
      // Expose for testing
      (window as any).mapboxMap = m;
      (window as any).mapboxMapLoaded = true;
    });

    m.on('draw.create', (e: any) => {
      const coords = e.features[0]?.geometry?.coordinates?.[0];
      if (coords) {
        setFilters({ boundary: coords as [number, number][] });
        setBoundaryActive(true);
      }
    });

    m.on('draw.delete', () => {
      setFilters({ boundary: null });
      setBoundaryActive(false);
    });

    m.on('moveend', () => {
      const center = m.getCenter();
      const zoom = m.getZoom();
      setFilters({ mapCenter: { lat: center.lat, lng: center.lng }, mapZoom: zoom });
    });

    map.current = m;
  }, []);

  useEffect(() => {
    initMap();
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [initMap]);

  // Update markers when properties change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    properties.forEach((property) => {
      const el = document.createElement('div');
      el.className = 'map-marker';
      el.dataset.testid = `map-marker-${property.id}`;
      if (highlightedPropertyId === property.id) {
        el.classList.add('active');
      }

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onMarkerClick?.(property.id);
      });

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
        `<div style="padding: 8px 12px;">
          <strong style="font-size: 14px;">${property.title}</strong>
          <p style="margin: 4px 0 0; color: #666; font-size: 12px;">$${property.price.toLocaleString()}</p>
        </div>`
      );

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.longitude, property.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.set(property.id, marker);
    });
  }, [properties, mapLoaded, highlightedPropertyId, onMarkerClick]);

  // Fly to center when filters change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    map.current.flyTo({
      center: [filters.mapCenter.lng, filters.mapCenter.lat],
      zoom: filters.mapZoom,
      duration: 1000,
    });
  }, [filters.mapCenter.lat, filters.mapCenter.lng, filters.mapZoom, mapLoaded]);

  const handleDrawBoundary = () => {
    if (drawRef.current) {
      drawRef.current.deleteAll();
      drawRef.current.changeMode('draw_polygon');
    }
  };

  const handleClearBoundary = () => {
    if (drawRef.current) {
      drawRef.current.deleteAll();
    }
    setFilters({ boundary: null });
    setBoundaryActive(false);
  };

  return (
    <div data-testid="map-container" className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
      {mapLoaded && <div data-testid="map-loaded" className="hidden" />}
      {boundaryActive && <div data-testid="boundary-active" className="hidden" />}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          data-testid="draw-boundary-button"
          onClick={handleDrawBoundary}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
        >
          Draw Boundary
        </button>
        {boundaryActive && (
          <button
            data-testid="clear-boundary-button"
            onClick={handleClearBoundary}
            className="rounded-lg bg-destructive px-3 py-2 text-xs font-medium text-destructive-foreground shadow-md transition-colors hover:bg-destructive/90"
          >
            Clear Boundary
          </button>
        )}
      </div>
    </div>
  );
}
