import { View, StyleSheet, TextInput } from "react-native";

export function MyTextInput({ title, width, height, OnChangeText }) {
  return (
    <TextInput
      style={[
        styles.textInput,
        width ? { width: width } : {},
        height ? { height: height } : {},
      ]}
      onChangeText={OnChangeText}
      defaultValue=""
      placeholder={title}
      placeholderTextColor="#787878"
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 8,
    backgroundColor: "#3C3C3C",
    borderRadius: 12,
    width: 374,
    height: 41,
    paddingHorizontal: 24,
    fontSize: 14,
  },
});
