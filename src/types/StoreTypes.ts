// types/StoreTypes.ts

import { Coffee, Bean } from './index';

export interface StoreState {
  coffeeList: Coffee[];
  beanList: Bean[];
  favouriteList: Coffee[];
  cartList: Coffee[];
  orderHistoryList: any[];
  cartPrice: number;
}
