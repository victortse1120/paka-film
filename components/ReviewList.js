// ReviewList.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const reviews = [
  {
    id: "1",
    title: "Toy Story 3",
    content:
      "The audience off the screen grew up and had children, and the protagonist Andy and his sister Dolly on the screen also grew up. Andy was...",
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  {
    id: "2",
    title: "Toy Story 3",
    content:
      "The audience off the screen grew up and had children, and the protagonist Andy and his sister Dolly on the screen also grew up. Andy was...",
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  {
    id: "3",
    title: "Toy Story 3",
    content:
      "The audience off the screen grew up and had children, and the protagonist Andy and his sister Dolly on the screen also grew up. Andy was...",
    author: "By Peter Chan",
    date: "11-03-2024",
  },
];

const ReviewItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ReviewDetail", { review: item })}
    >
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>{item.title}</Text>
        <Text style={styles.reviewContent}>{item.content}</Text>
        <Text style={styles.reviewAuthor}>
          {item.author} {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ReviewList = () => (
  <FlatList
    data={reviews}
    renderItem={({ item }) => <ReviewItem item={item} />}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  reviewContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#333",
    borderRadius: 5,
    borderColor: "#444",
    borderWidth: 1,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  reviewContent: {
    fontSize: 14,
    color: "#ccc",
    marginVertical: 10,
  },
  reviewAuthor: {
    fontSize: 12,
    color: "#888",
  },
});

export default ReviewList;
