import {Coffee} from '../types';

export const getCategoriesFromData = (data: Coffee[]) => {
  // Create a Set to store unique category names (Coffee names)
  const categoriesSet = new Set<string>();

  // Loop through each coffee item in the data array
  data.forEach(coffee => {
    // Add the coffee's name to the Set (Set automatically handles duplicates)
    categoriesSet.add(coffee.name);
  });

  // Convert the Set to an array and add 'All' as the first item
  const categories = ['All', ...Array.from(categoriesSet)];

  // Return the array of categories
  return categories;
};
