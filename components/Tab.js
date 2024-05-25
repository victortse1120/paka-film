import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

function MyTab({ title, index, onPress, active, reviewNumbers }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: active ? "#FFC800" : "transparent" },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: active ? "#000" : "#969696" }]}>
        {`${title}(${reviewNumbers[index]})`}
      </Text>
    </TouchableOpacity>
  );
}

export default function MyTabs({ titles, onPress, active, reviewNumbers }) {
  return (
    <View style={styles.container}>
      {titles.map((title, index) => (
        <MyTab
          title={title}
          index={index}
          onPress={() => onPress(index)}
          active={active == index}
          reviewNumbers={reviewNumbers}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 12,
    backgroundColor: "#2D2D2D",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 12,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    lineHeight: 16 * 1.3,
    fontSize: 16,
  },
});
