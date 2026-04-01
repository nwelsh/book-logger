import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../types/books";

type BookStatus = "want_to_read" | "reading" | "read";

type UserBook = {
  id: string;
  book: Book;
  status: BookStatus;
  rating?: number;
  review?: string;
};

type LibraryContextType = {
  books: UserBook[];
  addOrUpdateBook: (book: Book, status: BookStatus) => void;
  updateStatus: (id: string, status: BookStatus) => void;
  rateBook: (id: string, rating: number) => void;
  getBook: (id: string) => UserBook | undefined;
};

const LibraryContext = createContext<LibraryContextType | null>(null);

const STORAGE_KEY = "USER_LIBRARY";

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<UserBook[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setBooks(JSON.parse(data));
  };

  const save = async (updated: UserBook[]) => {
    setBooks(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addOrUpdateBook = (book: Book, status: BookStatus) => {
    const existing = books.find((b) => b.id === book.id);

    if (existing) {
      const updated = books.map((b) =>
        b.id === book.id ? { ...b, status } : b,
      );
      save(updated);
    } else {
      const newBook: UserBook = {
        id: book.id,
        book,
        status,
      };
      save([...books, newBook]);
    }
  };

  const updateStatus = (id: string, status: BookStatus) => {
    const updated = books.map((b) => (b.id === id ? { ...b, status } : b));
    save(updated);
  };

  const rateBook = (id: string, rating: number) => {
    const updated = books.map((b) => (b.id === id ? { ...b, rating } : b));
    save(updated);
  };

  const getBook = (id: string) => {
    return books.find((b) => b.id === id);
  };

  return (
    <LibraryContext.Provider
      value={{ books, addOrUpdateBook, updateStatus, rateBook, getBook }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within provider");
  return ctx;
}
