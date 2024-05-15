import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import defaultStyles from "./../components/styles/DefaultStyles";
import { MyTextInput } from "../components/TextInput";
import MyButton from "../components/Button";
import { useState } from "react";
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

  return (
    <View style={styles.container}>
      <Text style={[defaultStyles.Headline, styles.headline]}>Film Info</Text>
      <MyTextInput
        title="Film Name"
        OnChangeText={(newText) => setForm({ ...form, film: newText })}
      />
      <View style={styles.row}>
        <MyTextInput
          title="Date"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, date: newText })}
        />
        <MyTextInput
          title="Time"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, time: newText })}
        />
      </View>

      <MyTextInput
        title="Cinema Name"
        OnChangeText={(newText) => setForm({ ...form, cinema: newText })}
      />
      <View style={styles.row}>
        <MyTextInput
          title="House"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, house: newText })}
        />
        <MyTextInput
          title="Seat"
          width={181}
          OnChangeText={(newText) => setForm({ ...form, seat: newText })}
        />
      </View>

      <Text style={[defaultStyles.Headline, styles.headline]}>
        Review Content
      </Text>
      <MyTextInput
        title="Title"
        OnChangeText={(newText) => setForm({ ...form, title: newText })}
      />
      <MyTextInput
        title="Write some thoughts..."
        height={182}
        OnChangeText={(newText) => setForm({ ...form, content: newText })}
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
