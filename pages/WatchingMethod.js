import { View, StyleSheet, Text, ScrollView } from "react-native";
import defaultStyles from "../components/styles/DefaultStyles";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import cinemas from "../data/cinemas.json";
import markerImage from "../assets/marker.png";
import userMarkerImage from "../assets/user_marker.png";
import * as Location from "expo-location";
import LoadingLayer from "../components/LoadingLayer";
import { calculateDistance } from "../utils/common";

export default function WatchingMethod() {
  const [location, setLocation] = useState(null);
  const [nearestCinemas, setNearestCinemas] = useState(null);

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
      const calculatedNearestCinemas = cinemas
        .map((cinema) => ({
          ...cinema,
          distance: parseFloat(
            calculateDistance(
              cinema.coordinates.latitude,
              cinema.coordinates.longitude,
              currentLocation.coords.latitude,
              currentLocation.coords.longitude
            )
          ).toFixed(1),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
      setNearestCinemas(calculatedNearestCinemas);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.Headline, styles.headline]}>
        Watching methods
      </Text>
      {location && nearestCinemas ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={location} image={userMarkerImage} />
          {nearestCinemas.map((cinema, index) => (
            <Marker
              key={index}
              coordinate={cinema.coordinates}
              title={cinema.name}
              description={`${cinema.distance} km`}
              image={markerImage}
            />
          ))}
        </MapView>
      ) : (
        <LoadingLayer />
      )}
      <ScrollView>
        {nearestCinemas ? (
          nearestCinemas.map((nearestCinema, index) => (
            <View key={index} style={styles.row}>
              <Text style={defaultStyles.Body}>{nearestCinema.name}</Text>
              <Text style={[defaultStyles.Body, { color: "#FFC800" }]}>
                {nearestCinema.distance} km
              </Text>
            </View>
          ))
        ) : (
          <></>
        )}
      </ScrollView>
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
    marginVertical: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});
