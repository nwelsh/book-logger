import React, { useState } from 'react';
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
          <TouchableOpacity style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              {item.thumbnail && (
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 60, height: 90, marginRight: 12 }}
                />
              )}

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.authors.join(', ')}</Text>
                <Text>{item.publishedDate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}