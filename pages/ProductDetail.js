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
          {info ?? "-"}
        </Text>
      </View>
    );
  };

  return (
    <View style={[defaultStyles.containerFull, { paddingBottom: 0 }]}>
      <ImageBackground
        source={{ uri: item.image }}
        style={{ flex: 1 }}
        resizeMode="cover"
        blurRadius={8}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            backgroundColor: "#000000080",
          }}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View
            style={[
              {
                marginTop: 80,
                alignItems: "center",
              },
            ]}
          >
            <View style={[defaultStyles.baseShadow, {}]}>
              <Image
                style={[s.image]}
                source={{ uri: item.image }}
                resizeMode={"cover"}
              />
            </View>
          </View>

          <View style={[defaultStyles.baseView, { marginTop: 30 }]}>
            <Text style={s.title} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[s.description, { marginTop: 18 }]} numberOfLines={4}>
              {item.description}
            </Text>
            <View style={[defaultStyles.lineH, { marginVertical: 32 }]} />
            {renderInfo(<MovieSvg fill={"#FFC800"} />, "Director")}
            {renderInfo(<PaperAirplaneSvg fill={"#FFC800"} />, "Release")}
            {renderInfo(<ClockSvg fill={"#FFC800"} />, "Duration")}
            {renderInfo(<LabelSvg fill={"#FFC800"} />, "Genre")}
            {renderInfo(<StarSvg fill={"#FFC800"} />, "User Rating")}
          </View>
        </ScrollView>

        <TouchableWithoutFeedback
          onPress={() => {
            this.orderNow();
          }}
        >
          <View
            style={{
              width: "100%",
              padding: 6,
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
    borderRadius: 10,
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
  },
  infoView: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 22,
  },
  infoIcon: {
    width: 18,
    aspectRatio: 1,
  },
  infoTitleText: {
    flex: 1,
    fontSize: 14,
    color: "#A7A7A7",
    paddingHorizontal: 12,
  },
  infoContentText: {
    fontSize: 14,
    color: "#A7A7A7",
    width: 200,
    textAlign: "right",
  },
});
