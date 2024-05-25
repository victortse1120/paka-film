import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FavoriteMovies from "../components/FavoriteMovies";
import MyTabs from "../components/Tab";
import ReviewList from "../components/ReviewList";

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const [fovouriteNumbers, setFovouriteNumbers] = useState([3, 3]);

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
      {active == 0 ? <FavoriteMovies /> : <ReviewList favorite={true} />}
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
