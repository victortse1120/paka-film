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
import ReviewList from "./ReviewList";

const { width } = Dimensions.get("window");

const TopTab = createMaterialTopTabNavigator();

export default function ReviewTabs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <TopTab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#FFC800",
            width: 185,
            height: 40,
            borderRadius: 10,
            marginVertical: 5,
            padding: 15,
          },
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
    marginVertical: 10,
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
