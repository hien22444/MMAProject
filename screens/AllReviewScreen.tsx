import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import ReviewBox from "../components/Review/ReviewBox";
import CreateReviewSheet from "../components/CreateReview/CreateReviewSheet";
const reviews = [
  {
    id: 1,
    avatar: null,
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 4,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 2,
    avatar: null,
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 1,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 3,
    avatar: null,
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 5,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 4,
    avatar: null,
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 2,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: 5,
    avatar: null,
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 3,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
];

export default function AllReviewScreen() {
  const renderReview = ({ item }: any) => <ReviewBox {...item} />;
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>All reviews</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonInnerContainer}
            onPress={() => setIsModalOpen(true)}
          >
            <Text style={styles.buttonText}>Create Review</Text>
          </Pressable>
        </View>

        <View>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReview}
          />
        </View>
      </View>
      {isModalOpen && (
        <CreateReviewSheet
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  buttonContainer: {
    marginBottom: 10,
    width: 150,
  },
  buttonInnerContainer: {
    backgroundColor: "#ff6f61",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
