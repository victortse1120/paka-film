import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import defaultStyles from "./../components/styles/DefaultStyles";
import productStyles from "./../components/styles/ProductStyles";

import { dummyData } from "./../demo_data/DemoData";

import ArrowLeftSyvg from "./../assets/svg/arrowLeftSvg";
import StarSvg from "./../assets/svg/starSvg";
import MovieSvg from "./../assets/svg/movieSvg";
import PaperAirplaneSvg from "./../assets/svg/paperAirplaneSvg";
import ClockSvg from "./../assets/svg/clockSvg";
import LabelSvg from "./../assets/svg/labelSvg";
import { FontAwesome } from "@expo/vector-icons";

import { Shadow } from "react-native-shadow-2";

import { LinearGradient } from "expo-linear-gradient";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductDetail(props) {
  const insets = useSafeAreaInsets();

  const item = props.route.params?.item ?? dummyData[0];

  const navigation = useNavigation();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [item]);

  orderNow = async () => {
    try {
      // Retrieve the existing order items from AsyncStorage
      const existingOrderItems = await AsyncStorage.getItem("orderItems");
      let newOrderItems = [];
      if (existingOrderItems) {
        // If there are existing order items, parse the data and add the new item object to the array
        newOrderItems = JSON.parse(existingOrderItems);
        let savedItemIndex = newOrderItems.findIndex(
          (mItem) => mItem.id == item.id
        );
        if (newOrderItems[savedItemIndex]) {
          newOrderItems[savedItemIndex].qty =
            newOrderItems[savedItemIndex].qty + qty;
        } else {
          newOrderItems.push({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            qty,
          });
        }
      } else {
        // If there are no existing order items, create a new array with the new item object
        newOrderItems = [
          {
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            qty,
          },
        ];
      }
      // Save the updated order items array to AsyncStorage
      await AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
      console.log("Item added to order");
      console.log(newOrderItems);

      navigation.navigate("Order");
    } catch (error) {
      console.log("Error saving order item:", error);
    }
  };

  const renderInfo = (iconConponent, title, info) => {
    return (
      <View style={s.infoView}>
        <View style={s.infoIcon}>{iconConponent}</View>
        <Text style={s.infoTitleText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={s.infoContentText} numberOfLines={1}>
          {/* {info ?? "-"} */}
          {info !== undefined ? info : "-"}
        </Text>
      </View>
    );
  };

  return (
    <View style={[defaultStyles.containerFull, { paddingBottom: 0 }]}>
      <ImageBackground
        source={{ uri: item.image }}
        resizeMode={"cover"}
        style={{ flex: 1 }}
      >
        <View style={s.overlay}>
          <View style={s.upperHalf}>
            <ImageBackground
              source={{ uri: item.image }}
              style={s.imageBackground}
              resizeMode="cover"
              blurRadius={15}
            >
              <LinearGradient
                colors={["transparent", "black"]}
                style={s.gradientOverlay}
              />
            </ImageBackground>

            <View style={s.blurOverlay} />
          </View>
          <View style={s.lowerHalf} />
        </View>

        <View style={s.heart}>
          <FontAwesome name="heart-o" size={30} color="#FFFFFF" />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View
            style={[
              {
                marginTop: 80,
                alignItems: "center",
              },
            ]}
          >
            <Shadow
              distance={30}
              startColor={"#FFFFFF"}
              finalColor={"#FFFFFF"}
              offset={[0, 0]}
              blurRadius={30}
            >
              <Image
                style={[s.image]}
                source={{ uri: item.image }}
                resizeMode={"cover"}
              />
            </Shadow>
          </View>

          {/* <View style={[defaultStyles.baseShadow, {}]}> */}
          <View style={[defaultStyles.baseView, { marginTop: 30 }]}>
            <Text style={s.title} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[s.description, { marginTop: 18 }]} numberOfLines={4}>
              {item.description}
            </Text>
            <View style={[defaultStyles.lineH, { marginVertical: 32 }]} />
            {renderInfo(
              <MovieSvg fill={"#FFC800"} />,
              "Director",
              item.director
            )}
            {renderInfo(
              <PaperAirplaneSvg fill={"#FFC800"} />,
              "Release",
              item.release
            )}
            {renderInfo(
              <ClockSvg fill={"#FFC800"} />,
              "Duration",
              item.duration
            )}
            {renderInfo(<LabelSvg fill={"#FFC800"} />, "Genre", item.genre)}
            {renderInfo(
              <StarSvg fill={"#FFC800"} />,
              "User Rating",
              item.userRating
            )}
          </View>
        </ScrollView>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("WatchingMethod");
          }}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: 22,
              paddingVertical: 8,
              marginBottom: Platform.OS === "android" ? 8 : 30,
            }}
          >
            <View style={defaultStyles.defaultButton}>
              <Text style={defaultStyles.defaultButtonText}>
                {"WATCHING METHODS"}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  baseShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "60%",
    aspectRatio: 0.68,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    lineHeight: 16.7,
  },
  infoView: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 22,
  },
  infoIcon: {
    width: 18,
    aspectRatio: 1,
    marginTop: 4,
  },
  infoTitleText: {
    flex: 1,
    fontSize: 16,
    color: "#A7A7A7",
    paddingHorizontal: 12,
  },
  infoContentText: {
    fontSize: 16,
    color: "#A7A7A7",
    width: 200,
    textAlign: "right",
  },

  heart: {
    position: "absolute",
    top: 28,
    right: 20,
  },
  imageBackground: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  upperHalf: {
    flex: 2,
    overflow: "hidden",
  },
  lowerHalf: {
    flex: 1,
    backgroundColor: "black",
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: "100%",
  },
});
