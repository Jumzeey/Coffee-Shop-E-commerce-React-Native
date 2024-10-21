// Utility function to filter items by category (for coffee, beans, etc.)
export const getItemsByCategory = <T>(
  itemList: T[],
  selectedCategory: string,
  key: keyof T, // Specify the property to filter by
): T[] => {
  if (selectedCategory === 'All') {
    return itemList;
  }

  // Filter the item list based on the selected category using the specified key
  return itemList.filter(item => item[key] === selectedCategory);
};
