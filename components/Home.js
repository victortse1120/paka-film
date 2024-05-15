import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import defaultStyles from "./../components/styles/DefaultStyles";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    ocr();
  }, [image]);

  const ocr = async () => {
    if (image) {
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
                    content: image,
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
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    setImage(result.assets[0].base64);
  };

  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = Camera.useCameraPermissions();

  return (
    <View style={defaultStyles.container}>
      {/* <Camera style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera> */}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const navigation = useNavigation();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
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
  image: {
    width: 200,
    height: 200,
  },
});
