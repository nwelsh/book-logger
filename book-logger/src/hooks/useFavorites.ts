import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../types/books';

const STORAGE_KEY = 'FAVORITE_BOOKS';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setFavorites(JSON.parse(data));
  };

  const saveFavorites = async (books: Book[]) => {
    setFavorites(books);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  };

  const toggleFavorite = async (book: Book) => {
    const exists = favorites.find((b) => b.id === book.id);
    

    if (exists) {
      const updated = favorites.filter((b) => b.id !== book.id);
      await saveFavorites(updated);
    } else {
      const updated = [...favorites, book];
      await saveFavorites(updated);
    }
  };

  const isFavorite = (bookId: string) => {
    return favorites.some((b) => b.id === bookId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}