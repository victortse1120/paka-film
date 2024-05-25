import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const movies = [
  {
    id: "1",
    title: "The Dark Knight",
    rating: "7.4",
    image: require("./../assets/filmImage/thedark.jpg"),
  },
  {
    id: "2",
    title: "Big Hero 6",
    rating: "7.4",
    image: require("./../assets/filmImage/bighero6.jpeg"),
  },
  {
    id: "3",
    title: "Toy Story 3",
    rating: "7.4",
    image: require("./../assets/filmImage/toystory3.png"),
  },
];

const MovieItem = ({ item }) => (
  <View style={styles.movieContainer}>
    <Image source={item.image} style={styles.movieImage} />
    <View style={styles.movieDetails}>
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <FontAwesome
          name="heart"
          size={20}
          color="#FFC800"
          style={styles.icon}
        />
      </View>
      <Text style={styles.movieRating}>
        <FontAwesome name="star" size={12} color="#FFC800" /> {item.rating}
      </Text>
    </View>
  </View>
);

const Separator = () => (
  <View
    style={{
      borderTopWidth: 1,
      borderTopColor: "#969696",
      marginTop: 10,
      marginBottom: 25,
    }}
  />
);

const FavoriteMovies = () => (
  <FlatList
    data={movies}
    renderItem={({ item, index }) => (
      <>
        {index > 0 && <Separator />}
        <MovieItem item={item} />
      </>
    )}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
  />
);

// const MovieItem = ({ item }) => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       onPress={() => navigation.navigate("ReviewDetail", { review: item })}
//     >
//       <View style={styles.reviewContainer}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.reviewTitle}>{item.title}</Text>
//           <FontAwesome
//             name="heart"
//             size={20}
//             color="#FFC800"
//             style={styles.icon}
//           />
//         </View>

//         <View style={styles.detailContainer}>
//           <Text style={styles.reviewSubTitle}>{item.subTitle}</Text>
//           <Text style={styles.reviewContent}>{item.content}</Text>
//         </View>

//         <View style={styles.authorContainer}>
//           <Image source={authorIcon} style={styles.authorIcon} />
//           <Text style={styles.reviewAuthor}>
//             {item.author} {item.date}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const ReviewList = () => (
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
//     keyExtractor={(item) => item.id}
//     contentContainerStyle={styles.listContainer}
//   />
// );

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 20,
//   },
//   movieContainer: {
//     padding: 20,
//     paddingHorizontal: 16,
//     marginVertical: 0,
//     backgroundColor: "#2D2D2D",
//     borderRadius: 12,
//   },
//   titleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   reviewTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   icon: {
//     marginLeft: 10,
//   },

//   detailContainer: {
//     backgroundColor: "#3C3C3C",
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 16,
//   },
//   reviewSubTitle: {
//     fontSize: 16,
//     color: "white",
//     fontWeight: "bold",
//     lineHeight: 24,
//     marginVertical: 10,
//   },
//   reviewContent: {
//     fontSize: 14,
//     color: "#969696",
//     marginVertical: 10,
//     lineHeight: 21,
//   },
//   authorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   authorIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 8,
//   },
//   reviewAuthor: {
//     fontSize: 13,
//     color: "#fff",
//   },
// });

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  movieContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 5,
  },
  movieImage: {
    width: 144,
    height: 212,
    borderWidth: 0.5,
    borderColor: "white",
  },
  movieDetails: {
    flex: 1,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    right: -2,
  },
  movieRating: {
    fontSize: 14,
    color: "#FFC800",
    marginTop: 12,
  },
});

export default FavoriteMovies;
