import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../types/books';
import { TouchableOpacity } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';

type Props = {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export default function BookCard({
  book,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      {book.thumbnail ? (
        <Image source={{ uri: book.thumbnail }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>

          <TouchableOpacity onPress={onToggleFavorite}>
            <Text style={{ fontSize: 20 }}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.author} numberOfLines={1}>
          {book.authors?.join(', ') || 'Unknown author'}
        </Text>

        {book.description && (
          <Text style={styles.description} numberOfLines={3}>
            {book.description.replace(/<[^>]+>/g, '')}
          </Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // Android shadow
    elevation: 3,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholder: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    color: '#666',
    marginBottom: 6,
  },
  description: {
    color: '#444',
    fontSize: 13,
  },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},
});