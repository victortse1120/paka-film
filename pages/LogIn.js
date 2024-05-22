import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import defaultStyles from "../components/styles/DefaultStyles";
import MyTextInput from "../components/TextInput";
import MyButton from "../components/Button";
import { useState, useRef } from "react";
import RatingBar from "../components/RatingBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyTextButton from "../components/TextButton";

export default function LogIn() {
  const navigation = useNavigation();
  const route = useRoute();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const passwordRef = useRef();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.avoidingView}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={[defaultStyles.Headline, styles.headline]}>
            User Login
          </Text>
          <View style={styles.innerContainer}>
            <Image
              source={require("../assets/pakafilmlogo.png")}
              style={{ width: 240, height: 54 }}
            />

            <MyTextInput
              title="USER EMAIL"
              defaultValue={form.film}
              OnChangeText={(newText) => setForm({ ...form, film: newText })}
              returnKeyTypeIsNext={true}
              onSubmitEditing={() => passwordRef?.current?.focus()}
            />

            <MyTextInput
              title="PASSWORD"
              defaultValue={form.date}
              OnChangeText={(newText) => setForm({ ...form, date: newText })}
              returnKeyTypeIsNext={false}
              ref={passwordRef}
              onSubmitEditing={() => passwordRef?.current?.blur()}
            />
            <MyButton
              title={"LOGIN"}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "MainBottomTab" }],
                });
              }}
            />

            <MyTextButton title={"No Account? Register Now"} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  container: {
    paddingTop: 32,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  innerContainer: {
    backgroundColor: "#3C3C3C",
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: "center",
    width: "100%",
    height: 480,
    flex: 1,
    justifyContent: "space-around",
    borderRadius: 20,
  },
  headline: {
    marginVertical: 16,
  },
});
