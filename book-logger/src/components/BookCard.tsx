import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book } from "../types/books";
import { TouchableOpacity } from "react-native";
import { useFavorites } from "../hooks/useFavorites";
import { useLibrary } from "../context/LibraryContext";

type Props = {
  book: Book;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};
// TODO click to open up the book as a modal 

export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const { addOrUpdateBook } = useLibrary();
  return (
    <View style={styles.card}>
      {book.thumbnail ? (
        <Image source={{ uri: book.thumbnail }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>

          <TouchableOpacity onPress={onToggleFavorite}>
            <Text style={{ fontSize: 20 }}>{isFavorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.author} numberOfLines={1}>
          {book.authors?.join(", ") || "Unknown author"}
        </Text>

        {book.description && (
          <Text style={styles.description}>
            {book.description}
          </Text>
        )}
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    // flex: 1,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // Android shadow
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    // marginRight: 12,
  },
//   placeholder: {
//     width: 70,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 12,
//     backgroundColor: "#ccc",
//   },
//   content: {
//     flex: 1,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   author: {
//     color: "#666",
//     marginBottom: 6,
//   },
//   description: {
//     color: "#444",
//     fontSize: 13,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
});
