import { View, Text, FlatList } from 'react-native';
import { useFavorites } from '../../src/context/FavoritesContext';
import BookCard from '../../src/components/BookCard';

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
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookCard
          book={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => toggleFavorite(item)}
        />
      )}
    />
  );
}