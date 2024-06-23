import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Dimensions } from "react-native";
import { removeMyReview } from "../storages/MovieReviews";
import defaultStyles from "../components/styles/DefaultStyles";

const { width } = Dimensions.get("window");

const ReviewItem = ({ item, onOptionsPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ReviewDetail", { review: item })}
    >
      <View style={styles.reviewContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.reviewTitle}>{item.film}</Text>
          <TouchableOpacity onPress={() => onOptionsPress(item)}>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={24}
              color="#969696"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.reviewSubTitle}>{item.title}</Text>
          <Text style={styles.reviewContent}>{item.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ReviewMyself = ({ reviews, setMyReviews }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleOptionsPress = (item) => {
    setSelectedReview(item);
    setBottomModalVisible(true);
  };

  const handleDeletePress = async () => {
    setMyReviews(reviews.filter((review) => review !== selectedReview));
    await removeMyReview(selectedReview);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reviews}
        renderItem={({ item, index }) => (
          <View>
            {index > 0 && (
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "#969696",
                  marginVertical: 20,
                }}
              />
            )}
            <ReviewItem item={item} onOptionsPress={handleOptionsPress} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        transparent={true}
        visible={bottomModalVisible}
        onRequestClose={() => {
          setBottomModalVisible(!bottomModalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalDivider1} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(true);
                setBottomModalVisible(false);
              }}
              activeOpacity={1}
            >
              <Text style={styles.modalButtonText1}>Delete</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setBottomModalVisible(false)}
              activeOpacity={1}
            >
              <Text style={styles.modalButtonText2}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setBottomModalVisible(!bottomModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: "60%", justifyContent: "center" }}>
              <Text style={defaultStyles.Body}>
                Confirm to delete the review?
              </Text>
            </View>

            <View style={[styles.dividerLine, { width: "100%", height: 1 }]} />
            <View style={styles.buttonContainer}>
              <Pressable onPress={handleDeletePress}>
                <Text style={defaultStyles.Body}>Yes</Text>
              </Pressable>
              <View
                style={[styles.dividerLine, { width: 1, height: "100%" }]}
              />
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={[defaultStyles.Body, { color: "#FFC800" }]}>
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 24,
  },
  reviewContainer: {
    padding: 20,
    paddingHorizontal: 16,
    marginVertical: 0,
    backgroundColor: "#2D2D2D",
    borderRadius: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    marginLeft: 10,
  },

  detailContainer: {
    backgroundColor: "#3C3C3C",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  reviewSubTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    lineHeight: 24,
    marginVertical: 10,
  },
  reviewContent: {
    fontSize: 14,
    color: "#969696",
    marginVertical: 10,
    lineHeight: 21,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  authorIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  reviewAuthor: {
    fontSize: 13,
    color: "#fff",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  modalContainer: {
    backgroundColor: "#2D2D2D",

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalButton: {
    padding: 14,
    alignItems: "center",
  },
  modalButtonText1: {
    fontSize: 16,
    color: "#FEDB00",
  },

  modalButtonText2: {
    fontSize: 16,
    color: "white",
  },
  modalDivider1: {
    height: 2.5,
    backgroundColor: "#3C3C3C",
    width: width,
    marginTop: 45,
  },
  modalDivider: {
    height: 2.5,
    backgroundColor: "#3C3C3C",
    width: width,
    marginVertical: 1,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 160,
    width: "80%",
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
  },
  dividerLine: {
    backgroundColor: "#5A5A5A",
  },
  modalText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    height: "40%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ReviewMyself;
