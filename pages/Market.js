import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ReviewList from "../components/ReviewList";
import ReviewMyself from "../components/ReviewMyself";
import MyTabs from "../components/Tab";
import {
  getMyReviews,
  getPublicReviews,
  storePublicReviews,
  togglePublicReviewFavorite,
} from "../storages/MovieReviews";
import dummyPublicReviews from "../data/reviews.json";
import { PublicReviewContext } from "../context/PublicReviewContext";

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const [reviewNumbers, setReviewNumbers] = useState([6, 3]);
  const [myReviews, setMyReviews] = useState([]);
  const { publicReviews, setPublicReviews } = useContext(PublicReviewContext);

  useEffect(() => {
    async function fetchMyReviews() {
      const reviews = await getMyReviews();
      setMyReviews(reviews);
    }
    fetchMyReviews();
    async function fetchPublicReviews() {
      const reviews = await getPublicReviews();
      if (reviews.length == 0) {
        await storePublicReviews(dummyPublicReviews);
        setPublicReviews(dummyPublicReviews);
      } else {
        setPublicReviews(reviews);
      }
    }
    fetchPublicReviews();
  }, []);

  useEffect(() => {
    setReviewNumbers([3, myReviews.length]);
  }, [myReviews]);

  const toggleFavorite = async (review) => {
    togglePublicReviewFavorite(review);
    const updatedReviews = publicReviews.map((publicReview) =>
      publicReview === review
        ? { ...review, favorite: !review.favorite }
        : publicReview
    );
    setPublicReviews(updatedReviews);
  };

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
        <ReviewList reviews={publicReviews} toggleFavorite={toggleFavorite} />
      ) : (
        <ReviewMyself reviews={myReviews} setMyReviews={setMyReviews} />
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
    marginTop: 45,
    marginBottom: 12,
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
