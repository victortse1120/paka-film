import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";

import defaultStyles from "./../components/styles/DefaultStyles";

import ArrowRightSvg from "./../assets/svg/arrowRightSvg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";

export default function Setting() {
  const insets = useSafeAreaInsets();
  const auth = getAuth();

  return (
    <View style={[defaultStyles.container, { paddingTop: insets.top }]}>
      <View style={styles.userView}>
        <Image
          style={styles.userIcon}
          source={require("./../assets/icon_user.png")}
          resizeMode={"cover"}
        />
        <View style={styles.userInfoView}>
          <Text style={styles.userName}>{"Peter Chan"}</Text>
          <Text style={styles.userInfo}>{"ID: 984567502344594"}</Text>
        </View>
      </View>
      <View style={defaultStyles.lineH} />
      <TouchableWithoutFeedback>
        <View style={styles.optionButtonView}>
          <Text style={styles.optionButtonText}>
            {"Change account password"}
          </Text>
          <View style={styles.optionButtonIcon}>
            <ArrowRightSvg />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={defaultStyles.lineH} />

      <TouchableWithoutFeedback
        onPress={() => {
          signOut(auth)
            .then(() =>
              ToastAndroid.show("Account logged out", ToastAndroid.SHORT)
            )
            .catch((error) => {
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        }}
      >
        <View style={styles.logoutButtonRootView}>
          <View style={defaultStyles.defaultButton}>
            <Text style={defaultStyles.defaultButtonText}>{"LOGOUT"}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    width: 80,
    aspectRatio: 1,
  },
  userView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  userInfoView: {
    flex: 1,
    marginStart: 30,
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  userInfo: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  optionButtonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  optionButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  optionButtonIcon: {
    width: 12,
    aspectRatio: 1,
  },
  logoutButtonRootView: {
    marginVertical: 36,
    marginHorizontal: 20,
  },
});
