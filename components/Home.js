import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import defaultStyles from "./../components/styles/DefaultStyles";

import MyButton from "./Button";
import MyTextButton from "./TextButton";
import { useEffect } from "react";

export default function Home() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Text style={[defaultStyles.Headline, { margin: 16 }]}>Loading</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <Text style={[defaultStyles.Headline, { margin: 16 }]}>
        Create Film Review
      </Text>
      <Image source={require("../assets/takePhoto.png")} style={styles.image} />
      <Text style={[defaultStyles.Subtitle, { margin: 16 }]}>
        Scan your Film Ticket with camera
      </Text>
      <Text style={defaultStyles.Caption}>
        1. Make sure the text on the Film ticket is clear{"\n\n"}
        2. Ticket match and zoom in with the camera
      </Text>

      <View style={styles.bottomView}>
        <MyButton
          title={"SCAN FILM TICKET"}
          onPress={() => {
            if (!permission.granted) {
              requestPermission();
            }
            navigation.navigate("TakePhoto");
          }}
        />
        <MyTextButton
          title={"Skip"}
          onPress={() => navigation.navigate("WriteReview")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 236,
    margin: 16,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
});
