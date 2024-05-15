import { View, StyleSheet, TextInput } from "react-native";
import React from "react";

export function MyTextInput({ title, value, OnChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={OnChangeText}
        defaultValue={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  textInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    width: 358,
    height: 70,
    paddingHorizontal: 24,
    fontSize: 14,
  },
});
