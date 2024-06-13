import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeMyReview = async (review) => {
  try {
    const existingReviews = await getMyReviews();
    const updatedReviews = [...existingReviews, review];
    await storeMyReviews(updatedReviews);
  } catch (e) {
    console.error("Error storing my review:", e);
  }
};

const storeMyReviews = async (reviews) => {
  try {
    const jsonReviews = JSON.stringify(reviews);
    await AsyncStorage.setItem("myReviews", jsonReviews);
  } catch (e) {
    console.error("Error storing my reviews:", e);
  }
};

export const getMyReviews = async () => {
  try {
    const jsonReviews = await AsyncStorage.getItem("myReviews");
    if (jsonReviews !== null) {
      const reviews = JSON.parse(jsonReviews);
      return reviews;
    }
    return [];
  } catch (e) {
    console.error("Error retrieving my reviews:", e);
    return [];
  }
};

export const removeMyReview = async (review) => {
  try {
    const existingReviews = await getMyReviews();
    const updatedReviews = existingReviews.filter(
      (existingReview) => existingReview != review
    );
    await storeMyReviews(updatedReviews);
  } catch (e) {
    console.error("Error removing my review:", e);
  }
};
