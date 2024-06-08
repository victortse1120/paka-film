import { CameraView } from "expo-camera";
import { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ticketToData from "../utils/ticketToData";
import LoadingLayer from "../components/LoadingLayer";
import ocr from "../utils/ocr";

export default function TakePhoto() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  const takePhoto = async () => {
    setLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      try {
        const recognizedText = await ocr(photo.base64);
        const ticketData = ticketToData(recognizedText);
        navigation.navigate("WriteReview", { ticketData });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      {isFocused && (
        <CameraView style={styles.camera} facing={"back"} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      {isLoading && <LoadingLayer />}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
