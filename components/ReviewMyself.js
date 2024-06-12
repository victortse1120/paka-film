import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Dimensions } from "react-native";
import { removeMovieReview } from "../storages/MovieReviews";

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
  const [selectedReview, setSelectedReview] = useState(null);

  const handleOptionsPress = (item) => {
    setSelectedReview(item);
    setModalVisible(true);
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  const handleDeletePress = async () => {
    setMyReviews(reviews.filter((review) => review !== selectedReview));
    setModalVisible(false);
    await removeMovieReview(selectedReview);
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
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalDivider1} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeletePress}
              activeOpacity={1}
            >
              <Text style={styles.modalButtonText1}>Delete</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCancelPress}
              activeOpacity={1}
            >
              <Text style={styles.modalButtonText2}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// const ReviewMyself = ({ reviews }) => (
//   <FlatList
//     data={reviews}
//     renderItem={({ item, index }) => (
//       <View>
//         {index > 0 && (
//           <View
//             style={{
//               borderTopWidth: 1,
//               borderTopColor: "#969696",
//               marginVertical: 20,
//             }}
//           />
//         )}
//         <ReviewItem item={item} />
//       </View>
//     )}
//     keyExtractor={(item, index) => index}
//     contentContainerStyle={styles.listContainer}
//   />
// );

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
});

export default ReviewMyself;
