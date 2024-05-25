import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavoriteMovies from "../components/FavoriteMovies";
import FavoriteReviews from "../components/FavoriteReviews";

const TopTab = createMaterialTopTabNavigator();

export default function ReviewTabs() {
  const [active, setActive] = useState(0);
  const [reviewNumbers, setReviewNumbers] = useState([3, 3]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
      <TopTab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#FFC800",
            width: 172,
            height: 56,
            borderRadius: 10,
          },
          tabBarStyle: {
            backgroundColor: "#2D2D2D",
            borderRadius: 12,
            margin: 20,
            marginBottom: 10,
          },
          tabBarLabelStyle: {
            color: "grey",
            textTransform: "none",
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarItemStyle: {
            "&.Mui-selected": {
              color: "black",
            },
          },
        }}
      >
        <TopTab.Screen
          name="Movies"
          component={FavoriteMovies}
          options={{ tabBarLabel: "Movies (3)" }}
        />
        <TopTab.Screen
          name="Reviews"
          component={FavoriteReviews}
          options={{ tabBarLabel: "Reviews (2)" }}
        />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 40,
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
