import { ToastAndroid } from "react-native";

export default async function ocr(base64) {
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
      throw result.error.message;
    }
    if (result.fullTextAnnotation && result.fullTextAnnotation.text) {
      const recognizedText = result.fullTextAnnotation.text;
      return recognizedText;
    } else {
      ToastAndroid.show("No text found in the image", ToastAndroid.SHORT);
      throw "No text found in the image";
    }
  } else {
    ToastAndroid.show("Invalid API response", ToastAndroid.SHORT);
    throw "Invalid API response";
  }
}
