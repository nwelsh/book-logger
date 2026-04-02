import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { Book } from "../types/books";
import { TouchableOpacity } from "react-native";
import { useFavorites } from "../hooks/useFavorites";
import { useLibrary } from "../context/LibraryContext";
import { getColorFromId } from "../hooks/useColor";

type Props = {
  book: Book;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void; // ✅ add this
};

export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
  onPress,
}: Props) {
  const { addOrUpdateBook, setBookStatus, markAsCompleted, rateBook, books } =
    useLibrary();

  const libraryBook = books.find((b) => b.book.id === book.id);

  const status = libraryBook?.status;
  const rating = libraryBook?.rating;

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("pressed");
        onPress?.();
      }}
      activeOpacity={0.8}
      style={[styles.card, { backgroundColor: getColorFromId(book.id) }]}
    >
      {onToggleFavorite && (
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Text style={{ fontSize: 20 }}>{isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      )}

      {book.thumbnail ? (
        <Image source={{ uri: book.thumbnail }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <Button
        title="📖 Currently Reading"
        onPress={() => setBookStatus(book, "reading")}
      />
      {status === "reading" && (
        <TouchableOpacity onPress={() => markAsCompleted(book.id)}>
          <Text>✅ Done</Text>
        </TouchableOpacity>
      )}
      {status === "completed" && !rating && (
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => rateBook(book.id, star)}
            >
              <Text style={{ fontSize: 20 }}>⭐</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {rating && <Text>{"⭐".repeat(rating)}</Text>}
    </TouchableOpacity>
  );

  {
    /* <View style={styles.content}> */
  }
  {
    /* <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text> */
  }

  {
    /* </View> */
  }

  {
    /* <Text style={styles.author} numberOfLines={1}>
          {book.authors?.join(", ") || "Unknown author"}
        </Text>

        {book.description && (
          <Text style={styles.description}>
            {book.description}
          </Text>
        )} */
  }
  {
    /* </View> */
  }
  //   </View>
  // </TouchableOpacity>
  //   );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    // alignItems: "flex-end",
    gap: 12,
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
  placeholder: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  //   content: {
  //     flex: 1,
  //   },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    color: "#666",
    marginBottom: 6,
  },
  description: {
    color: "#444",
    fontSize: 13,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-start",
  },
});
