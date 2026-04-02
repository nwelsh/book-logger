import { StyleSheet } from "react-native";
import { Modal, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { Book } from "../src/types/books";

export default function BookModal({
  selectedBook,
  onClose,
}: {
  selectedBook: Book | null;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={!!selectedBook}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{selectedBook?.title}</Text>

            <Text style={styles.author}>
              {selectedBook?.authors?.join(", ") || "Unknown author"}
            </Text>

            <Text style={styles.description}>
              {selectedBook?.description?.replace(/<[^>]+>/g, "") ||
                "No description available"}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
