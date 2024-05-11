import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CustomCarousel from "carousel-with-pagination-rn";

import SettingSvg from "./../assets/svg/starSvg";

import defaultStyles from "./../components/styles/DefaultStyles";

import {
  dummySliderData,
  dummyHotMoviesData,
  dummyHotAnimationData,
} from "./../demo_data/DemoData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Main() {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const renderSubItem = (title, mainStyle, data) => {
    return (
      <>
        <Text style={[defaultStyles.baseView, styles.subItemHeader, mainStyle]}>
          {title}
        </Text>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
          ItemSeparatorComponent={<View style={{ width: 20 }} />}
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("ProductDetail", { item })}
              >
                <View style={styles.subItemView}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.subItemImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.subItemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 6 }}>
                    <View style={styles.subItemScoreIcon}>
                      <SettingSvg name="Setting" fill={"#FFC800"} />
                    </View>
                    <Text style={styles.subItemScore}>{item.stars + ""}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </>
    );
  };

  return (
    <View style={[defaultStyles.container, { paddingTop: insets.top }]}>
      <View style={defaultStyles.header}>
        <Image
          source={require("../assets/pakafilmlogo.png")}
          style={styles.headerImage}
        />
        <View style={{ flex: 1 }} />
        <TouchableWithoutFeedback>
          <View style={styles.headerSearchView}>
            <FontAwesome name="search" size={24} color="black" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <CustomCarousel
          paginationContainerStyle={styles.sliderPaginationContainerStyle}
          indicatorWidth={[12, 56, 12]}
          indicatorHeight={[12, 12, 12]}
          inidicatorBorderRadius={8}
          indicatorColor={["#ffffff", "#FFC800", "#ffffff"]}
          data={dummySliderData}
          renderItem={({ item }) => {
            return (
              <View style={styles.sliderView}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.sliderImageBg}
                  resizeMode="cover"
                >
                  <Text style={styles.sliderTitle}>{item.name}</Text>
                  <Text
                    style={[
                      styles.sliderContent,
                      { marginTop: 15, marginBottom: 40 },
                    ]}
                    numberOfLines={3}
                  >
                    {item.description}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("ProductDetail", { item })
                    }
                  >
                    <View style={styles.sliderButton}>
                      <Text style={styles.sliderButtonTxt}>
                        {"MORE DETAIL"}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </ImageBackground>
              </View>
            );
          }}
        />
        {renderSubItem("Hot Movies", { marginTop: 20 }, dummyHotMoviesData)}
        {renderSubItem(
          "Hot Animation",
          { marginTop: 30 },
          dummyHotAnimationData
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 160,
    height: 36,
  },
  headerSearchView: {
    width: 52,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
    borderRadius: 20,
  },
  sliderView: {
    width: width,
    height: width / 0.67,
  },
  sliderImageBg: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  sliderPaginationContainerStyle: {
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  sliderTitle: {
    width: "100%",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  sliderContent: {
    width: "100%",
    color: "white",
    fontSize: 16,
  },
  sliderButton: {
    alignSelf: "baseline",
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#FFC800",
    borderRadius: 12,
  },
  sliderButtonTxt: {
    color: "black",
    fontSize: 16,
  },
  subItemHeader: {
    width: "100%",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  subItemView: {
    paddingVertical: 5,
    width: 144,
  },
  subItemImage: {
    width: "100%",
    aspectRatio: 0.68,
    borderRadius: 8,
  },
  subItemName: {
    width: "100%",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 14,
  },
  subItemScore: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginStart: 8,
  },
  subItemScoreIcon: {
    width: 12,
    aspectRatio: 1,
  },
});
