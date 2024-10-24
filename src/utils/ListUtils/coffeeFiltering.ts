import { Coffee } from '../../types';

export const filterCoffeeList = (list: Coffee[], query: string): Coffee[] => {
  if (query.length > 0) {
    return list.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
  return list;
};
