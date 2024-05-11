import { Platform, StatusBar, StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
  baseView: {
    paddingHorizontal: 10,
  },
  baseShadow: {
    shadowColor: Platform.OS == "android" ? "#fff" : "rgba(255, 255, 255, 1)",
    shadowOpacity: Platform.OS == "android" ? 6 : 2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: Platform.OS == "android" ? 6 : 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerFull: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? 8 : 30,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minHeight: 60,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  headerIcon: {
    width: 30,
    aspectRatio: 1,
    padding: 6,
  },
  lineH: {
    width: "100%",
    height: 1,
    backgroundColor: "#707070",
  },
  defaultButton: {
    width: "100%",
    height: 48,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFC800",
    borderRadius: 4,
  },
  defaultButtonText: {
    width: "100%",
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default defaultStyles;
