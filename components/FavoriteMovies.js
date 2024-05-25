import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const movies = [
  {
    id: "1",
    title: "The Dark Knight",
    rating: "7.4",
    image: require("./../assets/filmImage/thedark.jpg"),
  },
  {
    id: "2",
    title: "Big Hero 6",
    rating: "7.4",
    image: require("./../assets/filmImage/bighero6.jpeg"),
  },
  {
    id: "3",
    title: "Toy Story 3",
    rating: "7.4",
    image: require("./../assets/filmImage/toystory3.png"),
  },
];

const MovieItem = ({ item }) => (
  <View style={styles.movieContainer}>
    <Image source={item.image} style={styles.movieImage} />
    <View style={styles.movieDetails}>
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <FontAwesome
          name="heart"
          size={20}
          color="#FFC800"
          style={styles.icon}
        />
      </View>
      <Text style={styles.movieRating}>
        <FontAwesome name="star" size={12} color="#FFC800" /> {item.rating}
      </Text>
    </View>
  </View>
);

const Separator = () => (
  <View
    style={{
      borderTopWidth: 1,
      borderTopColor: "#969696",
      marginTop: 10,
      marginBottom: 25,
    }}
  />
);

const FavoriteMovies = () => (
  <FlatList
    data={movies}
    renderItem={({ item, index }) => (
      <>
        {index > 0 && <Separator />}
        <MovieItem item={item} />
      </>
    )}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 24,
  },
  movieContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 5,
  },
  movieImage: {
    width: 144,
    height: 212,
    borderWidth: 0.5,
    borderColor: "white",
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    right: -2,
  },
  movieRating: {
    fontSize: 14,
    color: "#FFC800",
    marginTop: 12,
  },
});

export default FavoriteMovies;
