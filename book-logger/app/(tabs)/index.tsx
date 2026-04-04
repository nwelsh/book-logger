import { View, Text, FlatList } from "react-native";
import { useLibrary } from "../../src/context/LibraryContext";
import BookCard from "../../src/components/BookCard";
import { useState } from "react";
import { Book } from "../../src/types/books";
import BookModal from "../BookModal";

export default function HomeScreen() {
  const { rateBook } = useLibrary();
  const { books } = useLibrary();

  const currentlyReading = books.filter((b) => b.status === "reading");
  const others = books.filter((b) => b.status !== "reading");
  const completed = books.filter((b) => b.status === "completed");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* 📖 Currently Reading */}
      {currentlyReading.length > 0 && (
        <>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            Currently Reading
          </Text>

          <FlatList
            horizontal
            data={currentlyReading}
            keyExtractor={(item) => item.book.id}
            renderItem={({ item }) => <BookCard book={item.book} />}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 24 }}
            contentContainerStyle={{ gap: 16 }}
          />
          <BookModal
            selectedBook={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        </>
      )}

      {/* 📚 All Books */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
        Your Library
      </Text>

      <FlatList
        data={others}
        horizontal
        keyExtractor={(item) => item.book.id}
        renderItem={({ item }) => <BookCard book={item.book} />}
      />
      <BookModal
        selectedBook={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </View>
  );
}
