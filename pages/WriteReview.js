import { View, StyleSheet, Text } from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import MyTextInput from "../components/TextInput";
import MyButton from "../components/Button";
import { useState, useRef } from "react";
import RatingBar from "../components/RatingBar";

export default function WriteReviews() {
  const [form, setForm] = useState({
    film: "",
    date: "",
    time: "",
    cinema: "",
    house: "",
    seat: "",
    title: "",
    content: "",
  });
  const [rating, setRating] = useState(0);
  const dateRef = useRef();
  const timeRef = useRef();
  const cinemaRef = useRef();
  const houseRef = useRef();
  const seatRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.Headline, styles.headline]}>Film Info</Text>
      <MyTextInput
        title="Film Name"
        OnChangeText={(newText) => setForm({ ...form, film: newText })}
        returnKeyTypeIsNext={true}
        onSubmitEditing={() => dateRef?.current?.focus()}
      />
      <View style={styles.row}>
        <MyTextInput
          title="Date"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, date: newText })}
          returnKeyTypeIsNext={true}
          ref={dateRef}
          onSubmitEditing={() => timeRef?.current?.focus()}
        />
        <MyTextInput
          title="Time"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, time: newText })}
          returnKeyTypeIsNext={true}
          ref={timeRef}
          onSubmitEditing={() => cinemaRef?.current?.focus()}
        />
      </View>

      <MyTextInput
        title="Cinema Name"
        OnChangeText={(newText) => setForm({ ...form, cinema: newText })}
        returnKeyTypeIsNext={true}
        ref={cinemaRef}
        onSubmitEditing={() => houseRef?.current?.focus()}
      />
      <View style={styles.row}>
        <MyTextInput
          title="House"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, house: newText })}
          returnKeyTypeIsNext={true}
          ref={houseRef}
          onSubmitEditing={() => seatRef?.current?.focus()}
        />
        <MyTextInput
          title="Seat"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, seat: newText })}
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
        OnChangeText={(newText) => setForm({ ...form, title: newText })}
        returnKeyTypeIsNext={true}
        ref={titleRef}
        onSubmitEditing={() => contentRef?.current?.focus()}
      />
      <MyTextInput
        title="Write some thoughts..."
        height={182}
        OnChangeText={(newText) => setForm({ ...form, content: newText })}
        returnKeyTypeIsNext={false}
        ref={contentRef}
        onSubmitEditing={() => contentRef?.current?.blur()}
      />
      <View style={styles.row}>
        <Text style={defaultStyles.Caption}>Rating:</Text>
        <RatingBar rating={rating} setRating={setRating} />
      </View>
      <View style={styles.bottomView}>
        <MyButton title={"FINISH AND POST"} onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 32,
    alignItems: "center",
    alignSelf: "center",
    width: 374,
    height: "100%",
  },
  headline: {
    marginVertical: 16,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bottomView: {
    position: "absolute",
    bottom: 32,
    alignItems: "center",
  },
});
