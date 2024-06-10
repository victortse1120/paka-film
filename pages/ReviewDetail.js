import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import authorIcon from "./../assets/icon_user.png";
import StarSvg from "./../assets/svg/starSvg";
const ReviewDetail = ({ route }) => {
  const { review } = route.params;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={[defaultStyles.Headline, styles.title]}>{review.title}</Text>
      <Text style={styles.subTitle}>{review.subTitle}</Text>

      <View style={styles.authorContainer}>
        <Image source={authorIcon} style={styles.authorIcon} />
        <Text style={styles.author}>
          {"By Peter Chan"} {review.createdAt}
        </Text>
        <View style={styles.ratingContainer}>
          <StarSvg
            fill="gold"
            width={18}
            height={18}
            style={{ marginRight: 8 }}
          />

          <Text style={styles.rating}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.authorSeparator} />

      <Text style={styles.content}>{review.content}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{review.cinema}</Text>
        <View style={styles.detailBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Date:</Text>
            <Text style={styles.detailText}>{review.watchingdate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Time:</Text>
            <Text style={styles.detailText}>{review.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>House:</Text>
            <Text style={styles.detailText}>{review.house}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailText}>Seat:</Text>
            <Text style={styles.detailText}>{review.seat}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    margin: 3,
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
