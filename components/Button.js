import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MyButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFC800",
    borderRadius: 8,
    width: "100%",
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    lineHeight: 16 * 1.3,
    fontSize: 16,
    color: "#000",
  },
});
