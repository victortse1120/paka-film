import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import authorIcon from "./../assets/icon_user.png";
import { FontAwesome } from "@expo/vector-icons";

const ReviewDetail = ({ route }) => {
  const { review } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{review.title}</Text>
      <Text style={styles.subTitle}>{review.subTitle}</Text>

      <View style={styles.authorContainer}>
        <Image source={authorIcon} style={styles.authorIcon} />
        <Text style={styles.author}>
          {review.author} {review.date}
        </Text>
        <View style={styles.ratingContainer}>
          <FontAwesome
            name="star"
            size={18}
            color="#FFC800"
            style={styles.icon}
          />
          <Text style={styles.rating}>8</Text>
        </View>
      </View>
      <View style={styles.authorSeparator} />

      <Text style={styles.content}>{review.content}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>MCL - Cheung Sha Wan</Text>
        <View style={styles.detailBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Date:</Text>
            <Text style={styles.detailText}>{review.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Time:</Text>
            <Text style={styles.detailText}>11:40am</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>House:</Text>
            <Text style={styles.detailText}>2</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Seat:</Text>
            <Text style={styles.detailText}>H6</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    lineHeight: 24,
    marginVertical: 10,
  },
  content: {
    fontSize: 14,
    color: "#969696",
    marginBottom: 10,
    lineHeight: 21,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  author: {
    fontSize: 13,
    color: "#C8C8C8",
    marginBottom: 20,
    marginTop: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginTop: -10,
  },
  icon: {
    marginRight: 8,
  },
  rating: {
    fontSize: 14,
    color: "#FFC800",
    fontWeight: "bold",
  },
  authorIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginTop: -6,
  },
  authorSeparator: {
    borderBottomColor: "#969696",
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 20,
  },
  detailContainer: {
    marginTop: 40,
    backgroundColor: "#2D2D2D",
    padding: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  detailBox: {
    backgroundColor: "#3C3C3C",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#C8C8C8",
    lineHeight: 21,
  },
});

export default ReviewDetail;
