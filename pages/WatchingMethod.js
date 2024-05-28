import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import defaultStyles from "../components/styles/DefaultStyles";
import MyTextInput from "../components/TextInput";
import MyButton from "../components/Button";
import { useState, useRef } from "react";
import RatingBar from "../components/RatingBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import cinemas from "../data/cinemas.json";
import markerImage from "../assets/marker.png";

export default function WatchingMethod() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.Headline, styles.headline]}>
        Watching methods
      </Text>
      <MapView style={styles.map}>
        {cinemas.map((cinema, index) => (
          <Marker
            key={index}
            coordinate={cinema.coordinates}
            title={cinema.name}
            image={markerImage}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
  },
  headline: {
    marginVertical: 16,
  },
  map: {
    width: "100%",
    height: "50%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
