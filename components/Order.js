// import { useState, useCallback } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableWithoutFeedback,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import defaultStyles from "./styles/DefaultStyles";
// import productStyles from "./styles/ProductStyles";

// import AshbinSvg from "../assets/svg/ashbinSvg";
// import { useEffect } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useFocusEffect } from "@react-navigation/native";

// export default function Order() {
//   const [orderItems, setOrderItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const insets = useSafeAreaInsets();

//   useFocusEffect(
//     useCallback(() => {
//       fetchItems();
//       return () => {};
//     }, [])
//   );

//   useEffect(() => {
//     setTotalPrice(calculateTotalPrice());
//   }, [orderItems]);

//   fetchItems = async () => {
//     try {
//       const value = await AsyncStorage.getItem("orderItems");
//       const parsedValue = JSON.parse(value);
//       setOrderItems(parsedValue ?? []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addItem = (item) => {
//     const index = orderItems.indexOf(item);
//     if (index > -1) {
//       const newOrderItems = [...orderItems];
//       newOrderItems[index] = {
//         ...newOrderItems[index],
//         qty: newOrderItems[index].qty + 1,
//       };
//       setOrderItems(newOrderItems);
//       AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
//     }
//   };

//   const minusItem = (item) => {
//     const index = orderItems.indexOf(item);
//     if (index > -1) {
//       const newOrderItems = [...orderItems];
//       newOrderItems[index] = {
//         ...newOrderItems[index],
//         qty: newOrderItems[index].qty - 1,
//       };
//       if (newOrderItems[index].qty === 0) {
//         newOrderItems.splice(index, 1);
//       }
//       setOrderItems(newOrderItems);
//       AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
//     }
//   };

//   const deleteItem = (item) => {
//     const index = orderItems.indexOf(item);
//     if (index > -1) {
//       const newOrderItems = [...orderItems];
//       newOrderItems.splice(index, 1);
//       setOrderItems(newOrderItems);
//       AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
//     }
//   };

//   const calculateTotalPrice = () => {
//     let totalPrice = 0;
//     orderItems.forEach((item) => {
//       totalPrice += item.price * item.qty;
//     });
//     return totalPrice;
//   };

//   checkOut = () => {
//     AsyncStorage.clear();
//     console.log("store clean");
//   };

//   return (
//     <View style={[defaultStyles.containerFull, { paddingTop: insets.top, paddingBottom: 30  }]}>
//       <View style={defaultStyles.baseView}>
//         <Text style={s.title}>
//           {"Total"}
//           <Text style={s.qty}>{" (" + orderItems.length + ")"}</Text>
//         </Text>
//       </View>
//       <FlatList
//         style={{ flex: 1 }}
//         data={orderItems}
//         keyExtractor={(item) => item.id + ""}
//         ItemSeparatorComponent={
//           <View style={[defaultStyles.lineH, { marginVertical: 10 }]} />
//         }
//         renderItem={({ item }) => (
//           <View style={s.itemView}>
//             <Image style={s.image} source={{ uri: item.image }} />
//             <View style={s.itemInfoView}>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={s.itemInfoTitle} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//                 <TouchableWithoutFeedback
//                   onPress={() => {
//                     deleteItem(item);
//                   }}
//                 >
//                   <View style={s.itemInfoTitleIcon}>
//                     <AshbinSvg fill={"#fff"} />
//                   </View>
//                 </TouchableWithoutFeedback>
//               </View>
//               <View
//                 style={[
//                   productStyles.qtyView,
//                   { marginTop: 10, justifyContent: "flex-start" },
//                 ]}
//               >
//                 <TouchableWithoutFeedback
//                   onPress={() => {
//                     minusItem(item);
//                   }}
//                 >
//                   <View style={productStyles.qtyButton}>
//                     <Text style={defaultStyles.defaultButtonText}>{"-"}</Text>
//                   </View>
//                 </TouchableWithoutFeedback>
//                 <Text style={productStyles.qtyText}>{item.qty + " DAY"}</Text>
//                 <TouchableWithoutFeedback
//                   onPress={() => {
//                     addItem(item);
//                   }}
//                 >
//                   <View style={productStyles.qtyButton}>
//                     <Text style={defaultStyles.defaultButtonText}>{"+"}</Text>
//                   </View>
//                 </TouchableWithoutFeedback>
//               </View>
//               <View style={{ flex: 1 }} />
//               <Text style={s.paragraph}>
//                 $ <Text style={{ fontSize: 22 }}>{item.price * item.qty}</Text>
//               </Text>
//             </View>
//           </View>
//         )}
//       />
//       <Text style={s.totalPriceText}>{"Total Price:$ " + totalPrice}</Text>
//       <TouchableWithoutFeedback onPress={() => {}}>
//         <View style={{ width: "100%", padding: 6 }}>
//           <View style={defaultStyles.defaultButton}>
//             <Text style={defaultStyles.defaultButtonText}>{"LEASE ALL"}</Text>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const s = StyleSheet.create({
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   qty: {
//     fontSize: 18,
//     color: "white",
//   },
//   itemView: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//   },
//   image: {
//     width: "34%",
//     aspectRatio: 0.68,
//     borderRadius: 8,
//   },
//   itemInfoView: {
//     flex: 1,
//     height: "100%",
//     paddingStart: 10,
//   },
//   itemInfoTitle: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//   },
//   itemInfoTitleIcon: {
//     width: 16,
//     aspectRatio: 1,
//     marginStart: 8,
//   },
//   paragraph: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "right",
//   },
//   totalPriceText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     paddingVertical: 12,
//   },
// });

import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReviewList from "./ReviewList";

import FavoruiteMovies from "./FavoruiteMovies";
import FavoruiteReviews from "./FavoruiteReviews";

const { width } = Dimensions.get("window");

const TopTab = createMaterialTopTabNavigator();

export default function ReviewTabs() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoruite</Text>
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
          name="Movies"
          component={FavoruiteMovies}
          options={{ tabBarLabel: "Movies (3)" }}
        />
        <TopTab.Screen
          name="Reviews"
          component={FavoruiteReviews}
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
