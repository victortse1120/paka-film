import { CameraView } from "expo-camera";
import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ticketToData from "../utils/ticketToData";
import LoadingLayer from "../components/LoadingLayer";

export default function TakePhoto() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  const ocr = async (base64) => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.EXPO_PUBLIC_GOOGLE_VISION_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [
                  {
                    type: "TEXT_DETECTION",
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      if (data.responses && data.responses.length > 0) {
        const result = data.responses[0];

        if (result.error) {
          ToastAndroid.show(result.error.message, ToastAndroid.SHORT);
          console.log(result.error.message);
        }
        if (result.fullTextAnnotation && result.fullTextAnnotation.text) {
          const recognizedText = result.fullTextAnnotation.text;
          console.log("Recognized Text:", recognizedText);
          const ticketData = ticketToData(recognizedText);
          navigation.navigate("WriteReview", { ticketData });
        } else {
          ToastAndroid.show("No text found in the image", ToastAndroid.SHORT);
          console.log("No text found in the image");
        }
      } else {
        ToastAndroid.show("Invalid API response", ToastAndroid.SHORT);
        console.log("Invalid API response");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    setLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      ocr(photo.base64);
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
