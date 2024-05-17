// import {View, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native'

// import defaultStyles from './../components/styles/DefaultStyles';

// export default function Market() {

//   const navigation = useNavigation()

//   return (
//       <View style={defaultStyles.container}>

//       </View>
//   )
// }

// const styles = StyleSheet.create({

// })
import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const reviews = [
  {
    id: "1",
    title: "Toy Story 3",
    content:
      'It’s not just a toy - the inspiration given to us by "Toy Story 3"',
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  {
    id: "2",
    title: "Toy Story 3",
    content:
      'It’s not just a toy - the inspiration given to us by "Toy Story 3"',
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  {
    id: "2",
    title: "Toy Story 3",
    content:
      'It’s not just a toy - the inspiration given to us by "Toy Story 3"',
    author: "By Peter Chan",
    date: "11-03-2024",
  },
  
];

const ReviewItem = ({ item }) => (
  <View style={styles.reviewContainer}>
    <Text style={styles.reviewTitle}>{item.title}</Text>
    <Text style={styles.reviewContent}>{item.content}</Text>
    <Text style={styles.reviewAuthor}>
      {item.author} {item.date}
    </Text>
  </View>
);

const ReviewList = () => (
  <FlatList
    data={reviews}
    renderItem={({ item }) => <ReviewItem item={item} />}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
  />
);

const TopTab = createMaterialTopTabNavigator();

function ReviewTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "yellow" },
        tabBarStyle: { backgroundColor: "black" },
        tabBarLabelStyle: { color: "white" },
      }}
    >
      <TopTab.Screen
        name="News"
        component={ReviewList}
        options={{ tabBarLabel: "News (3)" }}
      />
      <TopTab.Screen
        name="Myself"
        component={ReviewList}
        options={{ tabBarLabel: "Myself (2)" }}
      />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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

export default App;
s;
