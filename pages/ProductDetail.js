import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
  ToastAndroid,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import defaultStyles from "./../components/styles/DefaultStyles";

import StarSvg from "./../assets/svg/starSvg";
import MovieSvg from "./../assets/svg/movieSvg";
import PaperAirplaneSvg from "./../assets/svg/paperAirplaneSvg";
import ClockSvg from "./../assets/svg/clockSvg";
import LabelSvg from "./../assets/svg/labelSvg";
import { FontAwesome } from "@expo/vector-icons";

import { Shadow } from "react-native-shadow-2";

import { LinearGradient } from "expo-linear-gradient";
import { storeMovies } from "../storages/MovieReviews";
import { useContext } from "react";
import { MyContext } from "../context/myContext";

export default function ProductDetail() {
  const route = useRoute();
  const { item } = route.params;
  const { movies, setMovies } = useContext(MyContext);
  const navigation = useNavigation();

  const toggleFavorite = async () => {
    const updatedMovies = movies.map((movie) =>
      item.id === movie.id ? { ...movie, favorite: !movie.favorite } : movie
    );
    storeMovies(updatedMovies);
    setMovies(updatedMovies);
    ToastAndroid.show(
      updatedMovies.find((m) => m.id === item.id).favorite
        ? "Added to favorites"
        : "Favorites removed",
      ToastAndroid.SHORT
    );
  };

  const renderInfo = (iconConponent, title, info) => {
    return (
      <View style={s.infoView}>
        <View style={s.infoIcon}>{iconConponent}</View>
        <Text style={s.infoTitleText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={s.infoContentText} numberOfLines={1}>
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

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View
            style={[
              {
                marginTop: 56,
                alignItems: "center",
              },
            ]}
          >
            <FontAwesome
              name={
                movies.filter((movie) => movie.id == item.id)[0].favorite
                  ? "heart"
                  : "heart-o"
              }
              size={30}
              color={
                movies.filter((movie) => movie.id == item.id)[0].favorite
                  ? "#FFC800"
                  : "#FFF"
              }
              onPress={toggleFavorite}
              style={{
                alignSelf: "flex-end",
                paddingHorizontal: 16,
              }}
            />
            <Shadow
              startColor={"#ffffff80"}
              finalColor={"#ffffff05"}
              radius={8}
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
