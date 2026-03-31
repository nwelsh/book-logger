import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../types/books';

type FavoritesContextType = {
  favorites: Book[];
  toggleFavorite: (book: Book) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'FAVORITE_BOOKS';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
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
      saveFavorites(updated);
    } else {
      const updated = [...favorites, book];
      saveFavorites(updated);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some((b) => b.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}