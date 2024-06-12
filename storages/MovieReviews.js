import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeMovieReview = async (review) => {
  try {
    const existingReviews = await getMovieReviews();
    const updatedReviews = [...existingReviews, review];
    await storeMovieReviews(updatedReviews);
  } catch (e) {
    console.error("Error storing movie review:", e);
  }
};

const storeMovieReviews = async (reviews) => {
  try {
    const jsonReviews = JSON.stringify(reviews);
    await AsyncStorage.setItem("movieReviews", jsonReviews);
  } catch (e) {
    console.error("Error storing movie reviews:", e);
  }
};

export const getMovieReviews = async () => {
  try {
    const jsonReviews = await AsyncStorage.getItem("movieReviews");
    if (jsonReviews !== null) {
      const reviews = JSON.parse(jsonReviews);
      return reviews;
    }
    return [];
  } catch (e) {
    console.error("Error retrieving movie reviews:", e);
    return [];
  }
};

export const removeMovieReview = async (review) => {
  try {
    const existingReviews = await getMovieReviews();
    const updatedReviews = existingReviews.filter(
      (existingReview) => existingReview != review
    );
    await storeMovieReviews(updatedReviews);
  } catch (e) {
    console.error("Error storing movie review:", e);
  }
};
