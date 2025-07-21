import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ReviewBox from "../components/Review/ReviewBox";
import CreateReviewSheet from "../components/CreateReview/CreateReviewSheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useReviews } from "../contexts/ReviewContext";
import { useAuth } from "../contexts/AuthContext";

type AllReviewRouteProp = NativeStackScreenProps<
  RootStackParamList,
  "AllReviews"
>;

const AllReviewScreen: React.FC<AllReviewRouteProp> = ({
  route,
  navigation,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { reviews } = useReviews();
  const { productId } = route.params || {};
  const { currentUser } = useAuth();

  const renderReview = ({ item }: any) => (
    <ReviewBox {...item} userId={item.userId} reviewId={item.id} />
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>All reviews</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonInnerContainer}
            onPress={() => {
              if (!currentUser) return navigation.navigate("Login");
              setIsModalOpen(true);
            }}
          >
            <Text style={styles.buttonText}>Create Review</Text>
          </Pressable>
        </View>

        <View>
          <FlatList
            data={reviews.filter((r) => r.productId === productId).reverse()}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
          />
        </View>
      </View>
      {isModalOpen && (
        <CreateReviewSheet
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          productId={productId}
        />
      )}
    </>
  );
};

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

export default AllReviewScreen;
