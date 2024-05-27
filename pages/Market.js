import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ReviewList from "../components/ReviewList";
import ReviewMyself from "../components/ReviewMyself";
import MyTabs from "../components/Tab";
import { getMovieReviews } from "../storages/MovieReviews";

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const [reviewNumbers, setReviewNumbers] = useState([6, 3]);
  const [myReviews, setmyReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const reviews = await getMovieReviews();
      setmyReviews(reviews);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setReviewNumbers([6, myReviews.length]);
  }, [myReviews]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <MyTabs
        titles={["News", "Myself"]}
        active={active}
        onPress={(index) => {
          setActive(index);
        }}
        number={reviewNumbers}
      />
      {active == 0 ? (
        <ReviewList favorite={false} />
      ) : (
        <ReviewMyself reviews={myReviews} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginVertical: 16,
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
