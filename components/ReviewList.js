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
import catCatLeeIcon from "./../assets/Catcatlee.png";
import marvelFansIcon from "./../assets/Marvel_Fans.png";
import baymax6Icon from "./../assets/Baymax6.png";

const reviews = [
  {
    id: "1",
    title: "The Super Mario Bros.",
    subTitle: `Mushroom Kingdom Madness`,
    content:
      "The Super Mario Bros. movie brings Nintendo's iconic plumbers to the big screen in a vibrant, if uneven, adaptation. Boasting eye-catching visuals and an infectious sense of fun, the film ...",
    author: "By Catcat.lee",
    date: "11-03-2024",
    favorite: false,
    authorIcon: catCatLeeIcon,
    time: "15:10pm",
    house: "1",
    seat: "E4",
  },
  {
    id: "2",
    title: "The Dark Knight",
    subTitle: `Gotham's Gritty Triumph`,
    content:
      "The Dark Knight elevates the superhero genre with its thrilling blend of visceral action and complex moral quandaries. Led by Heath Ledger's unforgettable Joker, the film immerses viewers ...",
    author: "By Marvel_Fans",
    date: "10-03-2024",
    favorite: false,
    authorIcon: marvelFansIcon,
    watchingdate: "09-03-2024",
    time: "10:40pm",
    house: "6",
    seat: "K12",
  },
  {
    id: "3",
    title: "Luca",
    subTitle: `Seaside Serenade`,
    content:
      "Luca is a delightful, visually stunning coming-of-age tale from Pixar. Set against the breathtaking Italian Riviera, the film follows a young sea monster's journey of self-discovery, blending...",
    author: "By Baymax6",
    date: "10-03-2024",
    favorite: false,
    authorIcon: baymax6Icon,
    watchingdate: "06-03-2024",
    time: "20:45pm",
    house: "3",
    seat: "K7",
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
            color={item.favorite ? "#FFC800" : "#5A5A5A"}
            style={styles.icon}
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.reviewSubTitle}>{item.subTitle}</Text>
          <Text style={styles.reviewContent}>{item.content}</Text>
        </View>

        <View style={styles.authorContainer}>
          <Image source={item.authorIcon} style={styles.authorIcon} />
          <Text style={styles.reviewAuthor}>
            {item.author} {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ReviewList = ({ favorite }) => (
  <FlatList
    data={favorite ? reviews.filter((review) => review.favorite) : reviews}
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
    paddingVertical: 24,
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
    marginVertical: 8,
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
