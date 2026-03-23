export interface Amenity {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  city: string;
}

export const amenities: Amenity[] = [
  // San Francisco
  { id: 1, name: "Whole Foods Market", type: "Grocery", latitude: 37.7760, longitude: -122.4175, city: "San Francisco" },
  { id: 2, name: "UCSF Medical Center", type: "Hospital", latitude: 37.7631, longitude: -122.4576, city: "San Francisco" },
  { id: 3, name: "Golden Gate Park", type: "Park", latitude: 37.7694, longitude: -122.4862, city: "San Francisco" },
  { id: 4, name: "Moscone Elementary", type: "School", latitude: 37.7640, longitude: -122.4130, city: "San Francisco" },
  { id: 5, name: "24 Hour Fitness", type: "Gym", latitude: 37.7850, longitude: -122.4094, city: "San Francisco" },

  // Los Angeles
  { id: 6, name: "Trader Joe's", type: "Grocery", latitude: 34.0900, longitude: -118.3610, city: "Los Angeles" },
  { id: 7, name: "Cedars-Sinai", type: "Hospital", latitude: 34.0755, longitude: -118.3802, city: "Los Angeles" },
  { id: 8, name: "Griffith Park", type: "Park", latitude: 34.1341, longitude: -118.2942, city: "Los Angeles" },
  { id: 9, name: "Hollywood High", type: "School", latitude: 34.0983, longitude: -118.3389, city: "Los Angeles" },
  { id: 10, name: "Equinox", type: "Gym", latitude: 34.0540, longitude: -118.2530, city: "Los Angeles" },

  // New York
  { id: 11, name: "Fairway Market", type: "Grocery", latitude: 40.7462, longitude: -73.9955, city: "New York" },
  { id: 12, name: "NYU Langone", type: "Hospital", latitude: 40.7420, longitude: -73.9741, city: "New York" },
  { id: 13, name: "Central Park", type: "Park", latitude: 40.7829, longitude: -73.9654, city: "New York" },
  { id: 14, name: "Stuyvesant High School", type: "School", latitude: 40.7177, longitude: -74.0134, city: "New York" },
  { id: 15, name: "Equinox Hudson Yards", type: "Gym", latitude: 40.7536, longitude: -74.0003, city: "New York" },
];
