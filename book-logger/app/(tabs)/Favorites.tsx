import { View, Text, FlatList } from "react-native";
import { useFavorites } from "../../src/context/FavoritesContext";
import BookCard from "../../src/components/BookCard";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Book } from "../../src/types/books";
import { ScrollView, TouchableOpacity } from "react-native";
import BookModal from "../BookModal";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (favorites.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No favorites yet 💔</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>FAVS!</Text>
      <View style={styles.favsContainer}>
        {favorites.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={isFavorite(book.id)}
            onToggleFavorite={() => toggleFavorite(book)}
            onPress={() => setSelectedBook(book)}
          />
        ))}
      </View>
      <BookModal
        selectedBook={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    flexDirection: "column",
    gap: 16,
  },
  favsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
  },

  closeText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  author: {
    color: "#666",
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: "#333",
  },
});
