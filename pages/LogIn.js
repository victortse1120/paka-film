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
import { useNavigation, useRoute } from "@react-navigation/native";
import MyTextButton from "../components/TextButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function LogIn() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLogin, setIsLogin] = useState(true);
  const passwordRef = useRef();
  const auth = getAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (text) => {
    setForm((prevForm) => ({
      ...prevForm,
      email: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setForm((prevForm) => ({
      ...prevForm,
      password: text,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.avoidingView}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={[defaultStyles.Headline, styles.headline]}>
            {isLogin ? "User Login" : "User Register"}
          </Text>
          <View style={styles.innerContainer}>
            <Image
              source={require("../assets/pakafilmlogo.png")}
              style={{ width: 240, height: 54 }}
            />

            <MyTextInput
              title="USER EMAIL"
              defaultValue={form.email}
              onChangeText={handleEmailChange}
              returnKeyTypeIsNext={true}
              onSubmitEditing={() => passwordRef?.current?.focus()}
            />

            <MyTextInput
              title="PASSWORD"
              defaultValue={form.password}
              onChangeText={handlePasswordChange}
              returnKeyTypeIsNext={false}
              ref={passwordRef}
              onSubmitEditing={() => passwordRef?.current?.blur()}
            />
            <MyButton
              title={isLogin ? "LOGIN" : "REGISTER"}
              onPress={() => {
                createUserWithEmailAndPassword(auth, form.email, form.password)
                  .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(userCredential);
                    // ...
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                  });
              }}
            />

            <MyTextButton
              title={
                isLogin
                  ? "No Account? Register Now"
                  : "Have an account? Login Now"
              }
              onPress={() => {
                setIsLogin(!isLogin);
              }}
            />
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
