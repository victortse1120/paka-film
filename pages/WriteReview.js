import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import MyTextInput from "../components/TextInput";
import MyButton from "../components/Button";
import { useState, useRef } from "react";
import RatingBar from "../components/RatingBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { storeMyReview } from "../storages/MovieReviews";
import { getTodayDate } from "../utils/common";
import * as ImagePicker from "expo-image-picker";
import ocr from "../utils/ocr";
import ticketToData from "../utils/ticketToData";
import LoadingLayer from "../components/LoadingLayer";

export default function WriteReviews() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ticketData = {} } = route.params || {
    film: "",
    date: "",
    time: "",
    cinema: "",
    house: "",
    seat: "",
    title: "",
    content: "",
  };
  const [form, setForm] = useState(ticketData);
  const [rating, setRating] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const dateRef = useRef();
  const timeRef = useRef();
  const cinemaRef = useRef();
  const houseRef = useRef();
  const seatRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        const recognizedText = await ocr(result.assets[0].base64);
        const ticketData = ticketToData(recognizedText);
        setForm(ticketData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.avoidingView}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}></View>
            <Text style={[defaultStyles.Headline, styles.headline]}>
              Film Info
            </Text>
            <TouchableOpacity style={styles.upload} onPress={pickImageAsync}>
              <Image
                source={require("../assets/upload.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text
                style={[
                  defaultStyles.Body,
                  { color: "#FFC800", paddingHorizontal: 8 },
                ]}
              >
                Upload
              </Text>
            </TouchableOpacity>
          </View>

          <MyTextInput
            title="Film Name"
            defaultValue={form.film}
            onChangeText={(newText) => setForm({ ...form, film: newText })}
            returnKeyTypeIsNext={true}
            onSubmitEditing={() => dateRef?.current?.focus()}
          />
          <View style={styles.row}>
            <MyTextInput
              title="Date"
              defaultValue={form.date}
              width={181}
              onChangeText={(newText) => setForm({ ...form, date: newText })}
              returnKeyTypeIsNext={true}
              ref={dateRef}
              onSubmitEditing={() => timeRef?.current?.focus()}
            />
            <MyTextInput
              title="Time"
              defaultValue={form.time}
              width={181}
              onChangeText={(newText) => setForm({ ...form, time: newText })}
              returnKeyTypeIsNext={true}
              ref={timeRef}
              onSubmitEditing={() => cinemaRef?.current?.focus()}
            />
          </View>

          <MyTextInput
            title="Cinema Name"
            defaultValue={form.cinema}
            onChangeText={(newText) => setForm({ ...form, cinema: newText })}
            returnKeyTypeIsNext={true}
            ref={cinemaRef}
            onSubmitEditing={() => houseRef?.current?.focus()}
          />
          <View style={styles.row}>
            <MyTextInput
              title="House"
              defaultValue={form.house}
              width={181}
              onChangeText={(newText) => setForm({ ...form, house: newText })}
              returnKeyTypeIsNext={true}
              ref={houseRef}
              onSubmitEditing={() => seatRef?.current?.focus()}
            />
            <MyTextInput
              title="Seat"
              defaultValue={form.seat}
              width={181}
              onChangeText={(newText) => setForm({ ...form, seat: newText })}
              returnKeyTypeIsNext={true}
              ref={seatRef}
              onSubmitEditing={() => titleRef?.current?.focus()}
            />
          </View>

          <Text style={[defaultStyles.Headline, styles.headline]}>
            Review Content
          </Text>
          <MyTextInput
            title="Title"
            defaultValue={form.title}
            onChangeText={(newText) => setForm({ ...form, title: newText })}
            returnKeyTypeIsNext={true}
            ref={titleRef}
            onSubmitEditing={() => contentRef?.current?.focus()}
          />
          <MyTextInput
            title="Write some thoughts..."
            defaultValue={form.content}
            height={182}
            onChangeText={(newText) => setForm({ ...form, content: newText })}
            returnKeyTypeIsNext={false}
            ref={contentRef}
            onSubmitEditing={() => contentRef?.current?.blur()}
          />
          <View style={[styles.row, { marginBottom: 16 }, { marginTop: 8 }]}>
            <Text style={defaultStyles.Caption}>Rating:</Text>
            <RatingBar rating={rating} setRating={setRating} />
          </View>

          <MyButton
            title={"FINISH AND POST"}
            onPress={async () => {
              await storeMyReview({
                ...form,
                rating: rating,
                createdAt: getTodayDate(),
              });
              navigation.reset({
                index: 0,
                routes: [{ name: "Tabs" }],
              });
              ToastAndroid.show("Review published", ToastAndroid.SHORT);
            }}
          />
        </View>
      </ScrollView>
      {isLoading && <LoadingLayer />}
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
    width: 374,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  upload: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    flex: 1,
    textAlign: "center",
    marginVertical: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
