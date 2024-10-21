// types/BeanTypes.ts

import { Price } from './CoffeeTypes';

export interface Bean {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string; // Adjust type if necessary
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
