import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MyTextButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderRadius: 8,
    width: 374,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    lineHeight: 16 * 1.3,
    fontSize: 16,
    color: "#FFF",
    textDecorationLine: "underline",
  },
});
