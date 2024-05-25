import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReviewList from "../components/ReviewList";
import ReviewMyself from "../components/ReviewMyself";

const { width } = Dimensions.get("window");

const TopTab = createMaterialTopTabNavigator();

export default function ReviewTabs() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <TopTab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#FFC800",
            width: 172,
            height: 56,
            borderRadius: 10,
            // marginVertical: 8,
            // marginHorizontal: 20,
            // padding: 6,
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
            // 選中時的樣式
            "&.Mui-selected": {
              color: "black", // 選中時文字變黑色
            },
          },
        }}
      >
        <TopTab.Screen
          name="News"
          component={ReviewList}
          options={{ tabBarLabel: "News (3)" }}
        />
        <TopTab.Screen
          name="Myself"
          component={ReviewMyself}
          options={{ tabBarLabel: "Myself (2)" }}
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
    marginTop: 40,
    paddingLeft: 20,
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
