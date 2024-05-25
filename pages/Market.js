import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ReviewList from "../components/ReviewList";
import ReviewMyself from "../components/ReviewMyself";
import MyTabs from "../components/Tab";

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const [reviewNumbers, setReviewNumbers] = useState([3, 3]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <MyTabs
        titles={["News", "Myself"]}
        active={active}
        onPress={(index) => {
          setActive(index);
        }}
        reviewNumbers={reviewNumbers}
      />
      {active == 0 ? <ReviewList /> : <ReviewMyself />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
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