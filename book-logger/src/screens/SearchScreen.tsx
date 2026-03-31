import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { searchBooks } from '../api/googleBooks';
import { Book } from '../types/books';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
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