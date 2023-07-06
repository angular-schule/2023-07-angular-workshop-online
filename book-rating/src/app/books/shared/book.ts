export interface Book {
  isbn: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  // authors: string[];
}

// Argumente für Rohdaten + Interface:
// - Serialisierbarkeit / JSON
// - Klonbarkeit / Immutability
