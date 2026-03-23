import { Property } from '@/data/properties';
import { Heart, Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  isHighlighted?: boolean;
  onSave?: (id: number) => void;
}

export function PropertyCard({ property, isHighlighted, onSave }: PropertyCardProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(property.id);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      data-testid={`property-card-${property.id}`}
      className={cn(
        'group block rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:shadow-lg',
        isHighlighted && 'property-card-highlight'
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <button
          data-testid={`save-property-${property.id}`}
          onClick={handleSave}
          className={cn(
            'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors',
            saved ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
          )}
        >
          <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
        </button>
        <div className="absolute bottom-3 left-3 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
          {property.propertyType}
        </div>
      </div>
      <div className="p-4">
        <div
          data-testid={`property-price-${property.id}`}
          className="text-lg font-bold text-primary"
        >
          ${property.price.toLocaleString()}
        </div>
        <h3
          data-testid={`property-title-${property.id}`}
          className="mt-1 font-semibold text-card-foreground line-clamp-1"
        >
          {property.title}
        </h3>
        <p
          data-testid={`property-address-${property.id}`}
          className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"
        >
          <MapPin className="h-3 w-3" />
          {property.address}, {property.city}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {property.sqft.toLocaleString()} sqft
          </span>
        </div>
        <div
          className="hidden"
          data-latitude={property.latitude}
          data-longitude={property.longitude}
        />
      </div>
    </Link>
  );
}
