// ReviewDetail.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReviewDetail = ({ route }) => {
  const { review } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{review.title}</Text>
      <Text style={styles.content}>{review.content}</Text>
      <Text style={styles.author}>
        {review.author} {review.date}
      </Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>MCL - Cheung Sha Wan</Text>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>Date: {review.date}</Text>
          <Text style={styles.detailText}>Time: 11:40am</Text>
          <Text style={styles.detailText}>House: 2</Text>
          <Text style={styles.detailText}>Seat: H6</Text>
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
  },
  content: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  detailContainer: {
    marginTop: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  detailBox: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 5,
  },
});

export default ReviewDetail;
