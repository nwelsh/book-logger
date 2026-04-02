import { View, Text, FlatList } from "react-native";
import { useLibrary } from "../../src/context/LibraryContext";
import BookCard from "../../src/components/BookCard";
import { useState } from "react";
import { Book } from "../../src/types/books";

export default function HomeScreen() {
  const { rateBook } = useLibrary();
  const { books } = useLibrary();

  if (books.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No books yet 📚</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BookCard book={item.book} />}
    />
  );
}
