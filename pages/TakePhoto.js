import { Camera } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import { useNavigation } from "@react-navigation/native";
import ticketToData from "../utils/ticketToData";

export default function TakePhoto() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const cameraRef = useRef(null);

  const ocr = async (base64) => {
    try {
      const response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCBeBFhTSIMdYA0jLwwvzRak5e1gzqN4EQ",
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
          console.log(result.error.message);
        }
        if (result.fullTextAnnotation && result.fullTextAnnotation.text) {
          const recognizedText = result.fullTextAnnotation.text;
          console.log("Recognized Text:", recognizedText);
          const ticketData = ticketToData(recognizedText);
          navigation.navigate("WriteReview", { ticketData });
        } else {
          console.log("No text found in the image");
        }
      } else {
        console.log("Invalid API response");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      ocr(photo.base64);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Camera style={styles.camera} facing={"back"} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
