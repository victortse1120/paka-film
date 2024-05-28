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
import { useState, useEffect } from "react";
import RatingBar from "../components/RatingBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import cinemas from "../data/cinemas.json";
import markerImage from "../assets/marker.png";
import * as Location from "expo-location";
import LoadingLayer from "../components/LoadingLayer";

export default function WatchingMethod() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.Headline, styles.headline]}>
        Watching methods
      </Text>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {cinemas.map((cinema, index) => (
            <Marker
              key={index}
              coordinate={cinema.coordinates}
              title={cinema.name}
              image={markerImage}
            />
          ))}
        </MapView>
      ) : (
        <LoadingLayer />
      )}
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
