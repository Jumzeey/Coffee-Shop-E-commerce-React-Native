// types/CoffeeTypes.ts

export interface Price {
  size: string;
  price: string;
  currency: string;
}

export interface Coffee {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string; // Adjust this type if needed
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}
