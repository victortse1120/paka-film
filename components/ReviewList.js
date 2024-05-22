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
import { FontAwesome } from "@expo/vector-icons";

const reviews = [
  {
    id: "1",
    title: "Toy Story 3",
    subTitle: `It's not just a toy - the inspiration given to us by "Toy Story 3"`,
    content:
      "The audience off the screen grew up and had children, and the protagonist Andy and his sister Dolly on the screen also grew up. Andy was...",
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  {
    id: "2",
    title: "Toy Story 3",
    subTitle: `It's not just a toy - the inspiration given to us by "Toy Story 3"`,
    content:
      "The audience off the screen grew up and had children, and the protagonist Andy and his sister Dolly on the screen also grew up. Andy was...",
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  {
    id: "3",
    title: "Toy Story 3",
    subTitle: `It's not just a toy - the inspiration given to us by "Toy Story 3"`,
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
        <View style={styles.titleContainer}>
          <Text style={styles.reviewTitle}>{item.title}</Text>
          <FontAwesome
            name="heart"
            size={20}
            color="#5A5A5A"
            style={styles.icon}
          />
        </View>

        <Text style={styles.reviewSubTitle}>{item.subTitle}</Text>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    marginLeft: 10,
  },
  reviewSubTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    lineHeight: 60,
    marginVertical: 10,
  },
  reviewContent: {
    fontSize: 14,
    color: "#969696",
    marginVertical: 10,
    lineHeight: 21,
  },
  reviewAuthor: {
    fontSize: 13,
    color: "#fff",
  },
});

export default ReviewList;
