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
          height
            ? {
                height: height,
                textAlignVertical: "top",
                paddingVertical: 16,
              }
            : {},
        ]}
        onChangeText={onChangeText}
        defaultValue=""
        placeholder={title}
        placeholderTextColor="#787878"
        returnKeyType={returnKeyTypeIsNext ? "next" : "done"}
        ref={ref}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        multiline={height ? true : false}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
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
