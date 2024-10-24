import {FlatList} from 'react-native';
import {Coffee} from '../types';

export const scrollToTop = (flatListRef: React.RefObject<FlatList<Coffee>>) => {
  if (flatListRef.current) {
    flatListRef.current.scrollToOffset({offset: 0, animated: true});
  }
};
