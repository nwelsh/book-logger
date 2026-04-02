import React, { useState } from "react";
import BookCard from "../../src/components/BookCard";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
            onPress={() => {
              console.log("PRESSED");
              setSelectedBook(item);
            }}
          />
        )}
      />
      <Modal visible={!!selectedBook} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 16, color: "#fff" }}>
            {"nicole"}
          </Text>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              maxHeight: "80%",
            }}
          >
            <ScrollView>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}
              >
                {selectedBook?.title}
              </Text>

              <Text style={{ color: "#666", marginBottom: 12 }}>
                {selectedBook?.authors?.join(", ") || "Unknown author"}
              </Text>

              <Text>
                {selectedBook?.description?.replace(/<[^>]+>/g, "") ||
                  "No description available"}
              </Text>
            </ScrollView>

            <TouchableOpacity
              onPress={() => setSelectedBook(null)}
              style={{ marginTop: 16 }}
            >
              <Text style={{ textAlign: "center", color: "blue" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
