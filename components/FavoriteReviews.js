import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import authorIcon from "./../assets/icon_user.png";

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
            color="#FFC800"
            style={styles.icon}
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.reviewSubTitle}>{item.subTitle}</Text>
          <Text style={styles.reviewContent}>{item.content}</Text>
        </View>

        <View style={styles.authorContainer}>
          <Image source={authorIcon} style={styles.authorIcon} />
          <Text style={styles.reviewAuthor}>
            {item.author} {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ReviewList = () => (
  <FlatList
    data={reviews}
    renderItem={({ item, index }) => (
      <View>
        {index > 0 && (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#969696",
              marginVertical: 20,
            }}
          />
        )}
        <ReviewItem item={item} />
      </View>
    )}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  reviewContainer: {
    padding: 20,
    paddingHorizontal: 16,
    marginVertical: 0,
    backgroundColor: "#2D2D2D",
    borderRadius: 12,
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

  detailContainer: {
    backgroundColor: "#3C3C3C",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  reviewSubTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    lineHeight: 24,
    marginVertical: 10,
  },
  reviewContent: {
    fontSize: 14,
    color: "#969696",
    marginVertical: 10,
    lineHeight: 21,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  authorIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  reviewAuthor: {
    fontSize: 13,
    color: "#fff",
  },
});

export default ReviewList;
