export interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  yearBuilt: number;
  lotSize: number | null;
  images: string[];
  description: string;
  features: string[];
}

export const properties: Property[] = [
  // San Francisco (10)
  {
    id: 1, title: "Modern Downtown Loft", price: 450000, address: "123 Main St",
    city: "San Francisco", state: "CA", zipcode: "94102",
    latitude: 37.7749, longitude: -122.4194, bedrooms: 2, bathrooms: 2, sqft: 1200,
    propertyType: "Apartment", yearBuilt: 2015, lotSize: null,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"],
    description: "Beautiful loft with city views in the heart of downtown.",
    features: ["Hardwood Floors", "Parking", "Pet Friendly"]
  },
  {
    id: 2, title: "Pacific Heights Victorian", price: 1850000, address: "2450 Pacific Ave",
    city: "San Francisco", state: "CA", zipcode: "94115",
    latitude: 37.7925, longitude: -122.4382, bedrooms: 4, bathrooms: 3, sqft: 3200,
    propertyType: "House", yearBuilt: 1905, lotSize: 3500,
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600"],
    description: "Stunning Victorian home with panoramic bay views.",
    features: ["Garden", "Fireplace", "Original Moldings", "Garage"]
  },
  {
    id: 3, title: "SOMA Tech Studio", price: 385000, address: "888 Brannan St",
    city: "San Francisco", state: "CA", zipcode: "94103",
    latitude: 37.7719, longitude: -122.4030, bedrooms: 1, bathrooms: 1, sqft: 650,
    propertyType: "Condo", yearBuilt: 2019, lotSize: null,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"],
    description: "Sleek studio in the tech corridor with modern finishes.",
    features: ["Gym", "Rooftop Deck", "Smart Home"]
  },
  {
    id: 4, title: "Mission District Townhouse", price: 1200000, address: "3421 Mission St",
    city: "San Francisco", state: "CA", zipcode: "94110",
    latitude: 37.7420, longitude: -122.4219, bedrooms: 3, bathrooms: 2, sqft: 2100,
    propertyType: "Townhouse", yearBuilt: 1960, lotSize: 2500,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"],
    description: "Charming townhouse in vibrant Mission District.",
    features: ["Backyard", "Updated Kitchen", "Laundry"]
  },
  {
    id: 5, title: "Sunset District Family Home", price: 980000, address: "1532 Irving St",
    city: "San Francisco", state: "CA", zipcode: "94122",
    latitude: 37.7634, longitude: -122.4730, bedrooms: 3, bathrooms: 2, sqft: 1800,
    propertyType: "House", yearBuilt: 1945, lotSize: 3000,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"],
    description: "Cozy family home near Golden Gate Park.",
    features: ["Garage", "Garden", "Near Park"]
  },
  {
    id: 6, title: "Nob Hill Penthouse", price: 2500000, address: "1000 California St",
    city: "San Francisco", state: "CA", zipcode: "94108",
    latitude: 37.7917, longitude: -122.4103, bedrooms: 3, bathrooms: 3, sqft: 2800,
    propertyType: "Condo", yearBuilt: 2010, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"],
    description: "Luxurious penthouse with 360-degree city views.",
    features: ["Concierge", "Pool", "Spa", "Valet Parking"]
  },
  {
    id: 7, title: "Castro Flat", price: 520000, address: "456 Castro St",
    city: "San Francisco", state: "CA", zipcode: "94114",
    latitude: 37.7609, longitude: -122.4350, bedrooms: 1, bathrooms: 1, sqft: 800,
    propertyType: "Apartment", yearBuilt: 1985, lotSize: null,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"],
    description: "Bright and airy flat in the heart of Castro.",
    features: ["Hardwood Floors", "Bay Windows", "Pet Friendly"]
  },
  {
    id: 8, title: "Marina District Condo", price: 750000, address: "2100 Chestnut St",
    city: "San Francisco", state: "CA", zipcode: "94123",
    latitude: 37.8005, longitude: -122.4382, bedrooms: 2, bathrooms: 1, sqft: 1100,
    propertyType: "Condo", yearBuilt: 1995, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600"],
    description: "Walking distance to the Marina and Presidio.",
    features: ["Updated Kitchen", "In-unit Laundry", "Storage"]
  },
  {
    id: 9, title: "Haight-Ashbury Duplex", price: 1100000, address: "710 Haight St",
    city: "San Francisco", state: "CA", zipcode: "94117",
    latitude: 37.7718, longitude: -122.4470, bedrooms: 4, bathrooms: 2, sqft: 2400,
    propertyType: "Multi-family", yearBuilt: 1920, lotSize: 2800,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600"],
    description: "Income-generating duplex in iconic neighborhood.",
    features: ["Two Units", "Backyard", "Period Details"]
  },
  {
    id: 10, title: "Embarcadero Waterfront", price: 1650000, address: "400 Beale St",
    city: "San Francisco", state: "CA", zipcode: "94105",
    latitude: 37.7870, longitude: -122.3920, bedrooms: 2, bathrooms: 2, sqft: 1600,
    propertyType: "Condo", yearBuilt: 2018, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600"],
    description: "Waterfront luxury with bay bridge views.",
    features: ["Concierge", "Gym", "Dog Run", "EV Charging"]
  },

  // Los Angeles (10)
  {
    id: 11, title: "Hollywood Hills Retreat", price: 2200000, address: "8800 Hollywood Blvd",
    city: "Los Angeles", state: "CA", zipcode: "90028",
    latitude: 34.1015, longitude: -118.3394, bedrooms: 4, bathrooms: 3, sqft: 3500,
    propertyType: "House", yearBuilt: 2005, lotSize: 8000,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"],
    description: "Modern hillside estate with infinity pool and city views.",
    features: ["Pool", "Home Theater", "Smart Home", "Views"]
  },
  {
    id: 12, title: "Venice Beach Bungalow", price: 1350000, address: "25 Venice Way",
    city: "Los Angeles", state: "CA", zipcode: "90291",
    latitude: 33.9925, longitude: -118.4660, bedrooms: 2, bathrooms: 2, sqft: 1400,
    propertyType: "House", yearBuilt: 1960, lotSize: 4000,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"],
    description: "Steps from the beach with a bohemian vibe.",
    features: ["Near Beach", "Outdoor Shower", "Patio"]
  },
  {
    id: 13, title: "DTLA Luxury Loft", price: 680000, address: "1100 S Grand Ave",
    city: "Los Angeles", state: "CA", zipcode: "90015",
    latitude: 34.0407, longitude: -118.2626, bedrooms: 1, bathrooms: 1, sqft: 1000,
    propertyType: "Loft", yearBuilt: 2017, lotSize: null,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"],
    description: "Industrial chic loft in the arts district.",
    features: ["Exposed Brick", "High Ceilings", "Rooftop Pool"]
  },
  {
    id: 14, title: "Silver Lake Mid-Century", price: 1450000, address: "2345 Griffith Park Blvd",
    city: "Los Angeles", state: "CA", zipcode: "90039",
    latitude: 34.0884, longitude: -118.2711, bedrooms: 3, bathrooms: 2, sqft: 2200,
    propertyType: "House", yearBuilt: 1958, lotSize: 5500,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"],
    description: "Iconic mid-century modern with original details.",
    features: ["Post & Beam", "Floor-to-Ceiling Windows", "Pool"]
  },
  {
    id: 15, title: "Santa Monica Condo", price: 890000, address: "1500 Ocean Ave",
    city: "Los Angeles", state: "CA", zipcode: "90401",
    latitude: 34.0195, longitude: -118.4912, bedrooms: 2, bathrooms: 2, sqft: 1300,
    propertyType: "Condo", yearBuilt: 2012, lotSize: null,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"],
    description: "Ocean views from every room.",
    features: ["Ocean View", "Gym", "Concierge"]
  },
  {
    id: 16, title: "Echo Park Cottage", price: 720000, address: "1400 Echo Park Ave",
    city: "Los Angeles", state: "CA", zipcode: "90026",
    latitude: 34.0782, longitude: -118.2606, bedrooms: 2, bathrooms: 1, sqft: 950,
    propertyType: "House", yearBuilt: 1935, lotSize: 3200,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600"],
    description: "Charming cottage near Echo Park Lake.",
    features: ["Garden", "Near Lake", "Original Charm"]
  },
  {
    id: 17, title: "Koreatown High-Rise", price: 425000, address: "3150 Wilshire Blvd",
    city: "Los Angeles", state: "CA", zipcode: "90010",
    latitude: 34.0620, longitude: -118.2978, bedrooms: 1, bathrooms: 1, sqft: 750,
    propertyType: "Apartment", yearBuilt: 2020, lotSize: null,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"],
    description: "Modern apartment with great transit access.",
    features: ["Metro Adjacent", "Pool", "Gym"]
  },
  {
    id: 18, title: "Pasadena Craftsman", price: 1100000, address: "800 S Lake Ave",
    city: "Los Angeles", state: "CA", zipcode: "91101",
    latitude: 34.1425, longitude: -118.1343, bedrooms: 3, bathrooms: 2, sqft: 2000,
    propertyType: "House", yearBuilt: 1915, lotSize: 6000,
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600"],
    description: "Classic Craftsman with period details.",
    features: ["Built-in Cabinets", "Front Porch", "Detached Garage"]
  },
  {
    id: 19, title: "Beverly Hills Estate", price: 4500000, address: "500 N Rodeo Dr",
    city: "Los Angeles", state: "CA", zipcode: "90210",
    latitude: 34.0736, longitude: -118.4004, bedrooms: 5, bathrooms: 6, sqft: 6000,
    propertyType: "House", yearBuilt: 2000, lotSize: 12000,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"],
    description: "Mediterranean estate on Rodeo Drive.",
    features: ["Pool", "Tennis Court", "Guest House", "Wine Cellar"]
  },
  {
    id: 20, title: "Culver City Townhome", price: 795000, address: "4000 Sepulveda Blvd",
    city: "Los Angeles", state: "CA", zipcode: "90230",
    latitude: 34.0009, longitude: -118.3964, bedrooms: 3, bathrooms: 2, sqft: 1700,
    propertyType: "Townhouse", yearBuilt: 2016, lotSize: 2000,
    images: ["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600"],
    description: "Modern townhome near Sony Studios.",
    features: ["Rooftop Deck", "2-Car Garage", "Open Plan"]
  },

  // New York (12)
  {
    id: 21, title: "Manhattan Studio", price: 550000, address: "350 W 42nd St",
    city: "New York", state: "NY", zipcode: "10036",
    latitude: 40.7580, longitude: -73.9927, bedrooms: 0, bathrooms: 1, sqft: 500,
    propertyType: "Studio", yearBuilt: 2010, lotSize: null,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"],
    description: "Efficient studio in Times Square area.",
    features: ["Doorman", "Laundry", "Near Subway"]
  },
  {
    id: 22, title: "Brooklyn Heights Brownstone", price: 3200000, address: "100 Montague St",
    city: "New York", state: "NY", zipcode: "11201",
    latitude: 40.6940, longitude: -73.9951, bedrooms: 5, bathrooms: 4, sqft: 4500,
    propertyType: "Townhouse", yearBuilt: 1890, lotSize: 3000,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600"],
    description: "Historic brownstone with modern renovations.",
    features: ["Garden", "Original Fireplace", "Chef's Kitchen"]
  },
  {
    id: 23, title: "Upper East Side Classic", price: 1800000, address: "1040 Park Ave",
    city: "New York", state: "NY", zipcode: "10028",
    latitude: 40.7795, longitude: -73.9600, bedrooms: 3, bathrooms: 2, sqft: 2000,
    propertyType: "Co-op", yearBuilt: 1935, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"],
    description: "Pre-war elegance on Park Avenue.",
    features: ["Doorman", "Central Park Views", "High Ceilings"]
  },
  {
    id: 24, title: "Williamsburg Loft", price: 920000, address: "75 N 3rd St",
    city: "New York", state: "NY", zipcode: "11249",
    latitude: 40.7170, longitude: -73.9630, bedrooms: 2, bathrooms: 1, sqft: 1400,
    propertyType: "Loft", yearBuilt: 2008, lotSize: null,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"],
    description: "Converted warehouse with industrial charm.",
    features: ["Exposed Brick", "High Ceilings", "Roof Access"]
  },
  {
    id: 25, title: "Chelsea Modern", price: 1350000, address: "520 W 23rd St",
    city: "New York", state: "NY", zipcode: "10011",
    latitude: 40.7468, longitude: -74.0020, bedrooms: 2, bathrooms: 2, sqft: 1200,
    propertyType: "Condo", yearBuilt: 2015, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600"],
    description: "Sleek condo near the High Line.",
    features: ["Near High Line", "Gym", "Terrace"]
  },
  {
    id: 26, title: "Harlem Renaissance", price: 650000, address: "200 W 135th St",
    city: "New York", state: "NY", zipcode: "10030",
    latitude: 40.8185, longitude: -73.9458, bedrooms: 3, bathrooms: 1, sqft: 1500,
    propertyType: "Apartment", yearBuilt: 1925, lotSize: null,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"],
    description: "Spacious pre-war apartment in historic Harlem.",
    features: ["Hardwood Floors", "Crown Molding", "Near Park"]
  },
  {
    id: 27, title: "SoHo Designer Loft", price: 2800000, address: "80 Thompson St",
    city: "New York", state: "NY", zipcode: "10012",
    latitude: 40.7252, longitude: -74.0035, bedrooms: 2, bathrooms: 2, sqft: 2200,
    propertyType: "Loft", yearBuilt: 1880, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"],
    description: "Cast-iron building with designer finishes.",
    features: ["Cast Iron", "Skylight", "Chef's Kitchen"]
  },
  {
    id: 28, title: "LIC Waterfront", price: 780000, address: "4545 Center Blvd",
    city: "New York", state: "NY", zipcode: "11109",
    latitude: 40.7420, longitude: -73.9580, bedrooms: 1, bathrooms: 1, sqft: 850,
    propertyType: "Condo", yearBuilt: 2019, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600"],
    description: "Manhattan skyline views from Long Island City.",
    features: ["Skyline Views", "Pool", "Gym", "Doorman"]
  },
  {
    id: 29, title: "West Village Gem", price: 1950000, address: "90 Bedford St",
    city: "New York", state: "NY", zipcode: "10014",
    latitude: 40.7315, longitude: -74.0050, bedrooms: 2, bathrooms: 1, sqft: 1100,
    propertyType: "Co-op", yearBuilt: 1910, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"],
    description: "Quintessential Village charm on tree-lined street.",
    features: ["Fireplace", "Garden Access", "Pet Friendly"]
  },
  {
    id: 30, title: "Financial District Tower", price: 1100000, address: "70 Pine St",
    city: "New York", state: "NY", zipcode: "10005",
    latitude: 40.7068, longitude: -74.0073, bedrooms: 2, bathrooms: 2, sqft: 1300,
    propertyType: "Condo", yearBuilt: 2016, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"],
    description: "Art deco tower converted to luxury condos.",
    features: ["Concierge", "Pool", "Gym", "Terrace"]
  },
  {
    id: 31, title: "Astoria Family Home", price: 875000, address: "30-15 Ditmars Blvd",
    city: "New York", state: "NY", zipcode: "11105",
    latitude: 40.7754, longitude: -73.9125, bedrooms: 3, bathrooms: 2, sqft: 1800,
    propertyType: "House", yearBuilt: 1950, lotSize: 2500,
    images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600"],
    description: "Charming home in family-friendly Astoria.",
    features: ["Backyard", "Garage", "Near Subway"]
  },
  {
    id: 32, title: "Tribeca Penthouse", price: 5500000, address: "15 Hudson Yards",
    city: "New York", state: "NY", zipcode: "10013",
    latitude: 40.7195, longitude: -74.0089, bedrooms: 4, bathrooms: 4, sqft: 3800,
    propertyType: "Penthouse", yearBuilt: 2021, lotSize: null,
    images: ["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600"],
    description: "Ultra-luxury penthouse with private terrace.",
    features: ["Private Elevator", "Terrace", "Smart Home", "Wine Room"]
  },
];
