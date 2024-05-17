import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingLayer() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFC800" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
