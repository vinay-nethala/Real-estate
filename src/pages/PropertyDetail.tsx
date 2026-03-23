import { useParams, Link } from 'react-router-dom';
import { properties } from '@/data/properties';
import { amenities } from '@/data/amenities';
import { haversineDistance } from '@/utils/haversine';
import { Navbar } from '@/components/Navbar';
import { ArrowLeft, Bed, Bath, Maximize, Calendar, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtYnh4MHBhbjBjMDMyam9oOWV0aTV0MWoifQ.demo';

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const nearbyAmenities = property
    ? amenities
        .map((a) => ({
          ...a,
          distance: haversineDistance(property.latitude, property.longitude, a.latitude, a.longitude),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10)
    : [];

  useEffect(() => {
    if (!property || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: import.meta.env.VITE_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11',
      center: [property.longitude, property.latitude],
      zoom: 14,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      setMapLoaded(true);

      // Property marker
      const el = document.createElement('div');
      el.className = 'map-marker active';
      new mapboxgl.Marker(el)
        .setLngLat([property.longitude, property.latitude])
        .addTo(map);

      // Amenity markers
      nearbyAmenities.forEach((a) => {
        new mapboxgl.Marker({ color: '#666' })
          .setLngLat([a.longitude, a.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${a.name}</strong><br/>${a.type}`))
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [property]);

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Property not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="property-detail-container" className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-6">
        <Link to="/properties" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-xl">
              <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" />
            </div>

            {/* Info */}
            <div>
              <div data-testid="property-price" className="text-3xl font-bold text-primary">
                ${property.price.toLocaleString()}
              </div>
              <h1 data-testid="property-title" className="mt-1 font-display text-2xl font-bold">
                {property.title}
              </h1>
              <p data-testid="property-full-address" className="mt-1 flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.city}, {property.state} {property.zipcode}
              </p>
              <p data-testid="property-coordinates" className="mt-1 text-xs text-muted-foreground">
                {property.latitude.toFixed(4)}°N, {Math.abs(property.longitude).toFixed(4)}°W
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 rounded-xl border bg-card p-4">
              <div className="text-center">
                <Bed className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-1 font-semibold">{property.bedrooms}</div>
                <div className="text-xs text-muted-foreground">Beds</div>
              </div>
              <div className="text-center">
                <Bath className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-1 font-semibold">{property.bathrooms}</div>
                <div className="text-xs text-muted-foreground">Baths</div>
              </div>
              <div className="text-center">
                <Maximize className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-1 font-semibold">{property.sqft.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Sqft</div>
              </div>
              <div className="text-center">
                <Calendar className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-1 font-semibold">{property.yearBuilt}</div>
                <div className="text-xs text-muted-foreground">Built</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-2 font-display text-lg font-semibold">Description</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="mb-2 font-display text-lg font-semibold">Features</h2>
              <div className="flex flex-wrap gap-2">
                {property.features.map((f) => (
                  <span key={f} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Map */}
            <div data-testid="property-map" className="h-[300px] overflow-hidden rounded-xl border">
              <div ref={mapContainer} className="h-full w-full" />
            </div>

            {/* Nearby Amenities */}
            <div data-testid="nearby-amenities" className="rounded-xl border bg-card p-4">
              <h2 className="mb-3 font-display text-lg font-semibold">Nearby Amenities</h2>
              <div className="space-y-3">
                {nearbyAmenities.map((a) => (
                  <div key={a.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{a.name}</div>
                      <div className="text-xs text-muted-foreground">{a.type}</div>
                    </div>
                    <span
                      data-testid={`amenity-distance-${a.id}`}
                      className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {a.distance.toFixed(1)} mi
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
