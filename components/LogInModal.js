import { Text, StyleSheet, Modal, View, Image } from "react-native";
import defaultStyles from "./styles/DefaultStyles";
import { useEffect } from "react";

export default function LogInModal({ modalVisible, setModalVisible, error }) {
  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => {
        setModalVisible(false);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={
              error == ""
                ? require("../assets/success.png")
                : require("../assets/fail.png")
            }
            style={{ width: 64, height: 64 }}
          />
          <View style={{ height: 8 }} />
          <Text
            style={[
              defaultStyles.Body,
              { fontSize: 18, color: error == "" ? "#FFC800" : "#FF3C00" },
            ]}
          >
            {error == "" ? "Login Successfully" : "Login Fail"}
          </Text>
          <View style={{ height: 8 }} />
          <Text style={[defaultStyles.Body, { color: "#969696" }]}>
            {error}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 200,
    width: 200,
    margin: 20,
    backgroundColor: "#3C3C3C",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
});
