import { create } from 'zustand';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BeansData from '../data/BeansData';
import CoffeeData from '../data/CoffeeData';
import {StoreState} from '../types';

export const useStore = create<StoreState>()(
  persist(
    (_set, _get) => ({
      coffeeList: CoffeeData,
      beanList: BeansData,
      favouriteList: [],
      cartList: [],
      orderHistoryList: [],
      cartPrice: 0,
    }),
    {name: 'coffee-app', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
