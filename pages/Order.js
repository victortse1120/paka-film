import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import FavoriteMovies from "../components/FavoriteMovies";
import MyTabs from "../components/Tab";
import ReviewList from "../components/ReviewList";
import dummyPublicReviews from "../data/reviews.json";
import { dummyData } from "../demo_data/DemoData";
import {
  getMovies,
  getPublicReviews,
  storeMovies,
  storePublicReviews,
} from "../storages/MovieReviews";
import { MyContext } from "../context/myContext";

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const { movies, setMovies, publicReviews, setPublicReviews } =
    useContext(MyContext);

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

  useEffect(() => {
    async function fetchMovies() {
      const movies = await getMovies();
      if (movies.length == 0) {
        await storeMovies(dummyData);
        setPublicReviews(dummyData);
      } else {
        setPublicReviews(movies);
      }
    }
    fetchMovies();
  }, []);

  const toggleFavorite = (review) => {
    const updatedReviews = publicReviews.map((publicReview) =>
      publicReview.id == review.id
        ? { ...review, favorite: !review.favorite }
        : publicReview
    );
    setPublicReviews(updatedReviews);
    storePublicReviews(updatedReviews);
  };

  const toggleMovieFavorite = (toggledMovie) => {
    const updatedMovies = movies.map((movie) =>
      movie === toggledMovie ? { ...movie, favorite: !movie.favorite } : movie
    );
    setMovies(updatedMovies);
    storeMovies(updatedMovies);
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
        number={[
          movies.filter((movie) => movie.favorite).length,
          publicReviews.filter((review) => review.favorite).length,
        ]}
      />
      {active == 0 ? (
        <FavoriteMovies
          movies={movies.filter((movie) => movie.favorite)}
          toggleMovieFavorite={toggleMovieFavorite}
        />
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
