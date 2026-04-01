import { View, Text, FlatList } from "react-native";
import { useFavorites } from "../../src/context/FavoritesContext";
import BookCard from "../../src/components/BookCard";
import { StyleSheet } from "react-native";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No favorites yet 💔</Text>
      </View>
    );
  }

  return (
    // <View style={styles.main}>
    //   <FlatList
    //     contentContainerStyle={{ padding: 16 }}
    //     data={favorites}
    //     keyExtractor={(item) => item.id}
    //     style={styles.booksContainer}
    //     renderItem={({ item }) => (
    //       <BookCard
    //         book={item}
    //         isFavorite={isFavorite(item.id)}
    //         onToggleFavorite={() => toggleFavorite(item)}
    //       />
    //     )}
    //   />
    // </View>

    <View style={styles.main}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>FAVS!</Text>
      <View style={styles.favsContainer}>
        {favorites.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={isFavorite(book.id)}
            onToggleFavorite={() => toggleFavorite(book)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    padding: 16,
    flexDirection: "column",
    gap: 16,
  },
  favsContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
