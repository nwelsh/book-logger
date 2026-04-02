import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book } from "../types/books";

type BookStatus = "want_to_read" | "reading" | "read" | "completed";

type LibraryBook = {
  book: Book;
  status?: "reading" | "completed";
  rating?: number;
};

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
  setBookStatus: (book: Book, status: BookStatus) => void;
  markAsCompleted: (bookId: string) => void;
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

  const markAsCompleted = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.book.id === bookId ? { ...b, status: "completed" } : b,
      ),
    );
  };

  const rateBook = (bookId: string, rating: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.book.id === bookId ? { ...b, rating, status: "completed" } : b,
      ),
    );
  };

  const getBook = (id: string) => {
    return books.find((b) => b.id === id);
  };

  const setBookStatus = (
    book: Book,
    status: "reading" | "completed" | "wantToRead",
  ) => {
    setBooks((prev) => {
      const existing = prev.find((b) => b.book.id === book.id);

      if (existing) {
        return prev.map((b) => (b.book.id === book.id ? { ...b, status } : b));
      }

      return [...prev, { book, status }];
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        addOrUpdateBook,
        updateStatus,
        rateBook,
        getBook,
        setBookStatus,
        markAsCompleted,
      }}
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
