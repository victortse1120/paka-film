import { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import defaultStyles from "./../components/styles/DefaultStyles";
import productStyles from "./../components/styles/ProductStyles";

import AshbinSvg from "./../assets/svg/ashbinSvg";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      fetchItems();
      return () => {};
    }, [])
  );

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [orderItems]);

  fetchItems = async () => {
    try {
      const value = await AsyncStorage.getItem("orderItems");
      const parsedValue = JSON.parse(value);
      setOrderItems(parsedValue ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = (item) => {
    const index = orderItems.indexOf(item);
    if (index > -1) {
      const newOrderItems = [...orderItems];
      newOrderItems[index] = {
        ...newOrderItems[index],
        qty: newOrderItems[index].qty + 1,
      };
      setOrderItems(newOrderItems);
      AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
    }
  };

  const minusItem = (item) => {
    const index = orderItems.indexOf(item);
    if (index > -1) {
      const newOrderItems = [...orderItems];
      newOrderItems[index] = {
        ...newOrderItems[index],
        qty: newOrderItems[index].qty - 1,
      };
      if (newOrderItems[index].qty === 0) {
        newOrderItems.splice(index, 1);
      }
      setOrderItems(newOrderItems);
      AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
    }
  };

  const deleteItem = (item) => {
    const index = orderItems.indexOf(item);
    if (index > -1) {
      const newOrderItems = [...orderItems];
      newOrderItems.splice(index, 1);
      setOrderItems(newOrderItems);
      AsyncStorage.setItem("orderItems", JSON.stringify(newOrderItems));
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orderItems.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
    return totalPrice;
  };

  checkOut = () => {
    AsyncStorage.clear();
    console.log("store clean");
  };

  return (
    <View style={[defaultStyles.containerFull, { paddingTop: insets.top, paddingBottom: 30  }]}>
      <View style={defaultStyles.baseView}>
        <Text style={s.title}>
          {"Total"}
          <Text style={s.qty}>{" (" + orderItems.length + ")"}</Text>
        </Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={orderItems}
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={
          <View style={[defaultStyles.lineH, { marginVertical: 10 }]} />
        }
        renderItem={({ item }) => (
          <View style={s.itemView}>
            <Image style={s.image} source={{ uri: item.image }} />
            <View style={s.itemInfoView}>
              <View style={{ flexDirection: "row" }}>
                <Text style={s.itemInfoTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    deleteItem(item);
                  }}
                >
                  <View style={s.itemInfoTitleIcon}>
                    <AshbinSvg fill={"#fff"} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={[
                  productStyles.qtyView,
                  { marginTop: 10, justifyContent: "flex-start" },
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    minusItem(item);
                  }}
                >
                  <View style={productStyles.qtyButton}>
                    <Text style={defaultStyles.defaultButtonText}>{"-"}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={productStyles.qtyText}>{item.qty + " DAY"}</Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    addItem(item);
                  }}
                >
                  <View style={productStyles.qtyButton}>
                    <Text style={defaultStyles.defaultButtonText}>{"+"}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ flex: 1 }} />
              <Text style={s.paragraph}>
                $ <Text style={{ fontSize: 22 }}>{item.price * item.qty}</Text>
              </Text>
            </View>
          </View>
        )}
      />
      <Text style={s.totalPriceText}>{"Total Price:$ " + totalPrice}</Text>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={{ width: "100%", padding: 6 }}>
          <View style={defaultStyles.defaultButton}>
            <Text style={defaultStyles.defaultButtonText}>{"LEASE ALL"}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  qty: {
    fontSize: 18,
    color: "white",
  },
  itemView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "34%",
    aspectRatio: 0.68,
    borderRadius: 8,
  },
  itemInfoView: {
    flex: 1,
    height: "100%",
    paddingStart: 10,
  },
  itemInfoTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  itemInfoTitleIcon: {
    width: 16,
    aspectRatio: 1,
    marginStart: 8,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "right",
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingVertical: 12,
  },
});
