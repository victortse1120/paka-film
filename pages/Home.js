import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import defaultStyles from "../components/styles/DefaultStyles";

import MyButton from "../components/Button";
import MyTextButton from "../components/TextButton";

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
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={[defaultStyles.Headline, { marginBottom: 16 }]}>
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
      <View style={{ height: 80 }} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 180,
    height: 236,
    margin: 16,
  },
  bottomView: {
    position: "absolute",
    bottom: 16,
    alignItems: "center",
  },
});
