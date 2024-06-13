import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import FavoriteMovies from "../components/FavoriteMovies";
import MyTabs from "../components/Tab";
import ReviewList from "../components/ReviewList";
import dummyPublicReviews from "../data/reviews.json";
import {
  getPublicReviews,
  storePublicReviews,
  togglePublicReviewFavorite,
} from "../storages/MovieReviews";
import { PublicReviewContext } from "../context/PublicReviewContext";

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const [fovouriteNumbers, setFavouriteNumbers] = useState([3, 3]);
  const { publicReviews, setPublicReviews } = useContext(PublicReviewContext);

  useEffect(() => {
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
      <Text style={styles.title}>Favorite</Text>
      <MyTabs
        titles={["Movies", "Reviews"]}
        active={active}
        onPress={(index) => {
          setActive(index);
        }}
        number={fovouriteNumbers}
      />
      {active == 0 ? (
        <FavoriteMovies />
      ) : (
        <ReviewList
          reviews={publicReviews.filter((review) => review.favorite)}
          toggleFavorite={toggleFavorite}
        />
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
