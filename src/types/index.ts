export interface Trip {
  id: string;
  origin: string;
  destination: string;
  price: number;
  departureDate?: Date;
  returnDate?: Date;
  company: string;
  imageUrl: string;
  featured?: boolean;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate?: Date;
  returnDate?: Date;
}