import React, { useState } from "react";
import BookCard from "../../src/components/BookCard";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { searchBooks } from "../../src/api/googleBooks";
import { Book } from "../../src/types/books";
import { useLibrary } from "../../src/context/LibraryContext";
import { useFavorites } from "../../src/context/FavoritesContext";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const { addOrUpdateBook } = useLibrary();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchBooks(query);
    setBooks(results);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search books..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
        }}
      />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        )}
      />
    </View>
  );
}
