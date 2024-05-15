import { StyleSheet, TextInput } from "react-native";
import { forwardRef } from "react";

const MyTextInput = forwardRef(
  (
    {
      title,
      width,
      height,
      onChangeText,
      returnKeyTypeIsNext,
      onSubmitEditing,
    },
    ref
  ) => {
    return (
      <TextInput
        style={[
          styles.textInput,
          width ? { width: width } : {},
          height ? { height: height } : {},
        ]}
        onChangeText={onChangeText}
        defaultValue=""
        placeholder={title}
        placeholderTextColor="#787878"
        returnKeyType={returnKeyTypeIsNext ? "next" : "done"}
        ref={ref}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
    );
  }
);

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 8,
    backgroundColor: "#3C3C3C",
    borderRadius: 12,
    width: 374,
    height: 41,
    paddingHorizontal: 24,
    fontSize: 14,
    color: "white",
  },
});

export default MyTextInput;
