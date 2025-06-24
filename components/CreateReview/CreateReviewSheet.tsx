import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import BottomSheet from "../BottomSheet/BottomSheet";
import Entypo from "@expo/vector-icons/Entypo";
import GlobalColors from "../../constants/colors";
import { useRoute } from "@react-navigation/native";

export default function CreateReviewSheet({
  isModalOpen,
  setIsModalOpen,
}: any) {
  const route = useRoute();
  const productId = "123";
  const userId = "123";

  const [newReview, setNewReview] = useState({
    numStar: 0,
    comment: "",
    productId,
    userId,
  });

  const handleCreateReview = () => {
    console.log(newReview);
    setIsModalOpen(false);
    setNewReview({ numStar: 0, comment: "", productId, userId });
  };

  return (
    <BottomSheet isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <Text style={styles.title}>What is your rate?</Text>
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() =>
              setNewReview((prev) => ({ ...prev, numStar: index + 1 }))
            }
            style={styles.star}
          >
            <Entypo
              name={index + 1 <= newReview.numStar ? "star" : "star-outlined"}
              size={30}
              color={index + 1 <= newReview.numStar ? "gold" : "gray"}
            />
          </Pressable>
        ))}
      </View>
      {/* <Star numStar={0} maxStar={5} /> */}
      <Text style={styles.subtitle}>
        Please share your opinion about the product
      </Text>

      <TextInput
        multiline
        numberOfLines={4}
        style={styles.comment}
        onChangeText={(text) =>
          setNewReview((prev) => ({ ...prev, comment: text }))
        }
        value={newReview.comment}
        placeholder="Your review here..."
      />

      <View style={styles.cameraContainer}>
        <Pressable style={styles.cameraInnerContainer}>
          <View style={styles.camera}>
            <Entypo name="camera" size={20} color="white" />
          </View>
          <Text style={{ textAlign: "center" }}>Add your photos</Text>
        </Pressable>
      </View>

      <View style={styles.buttonGroup}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.buttonInnerContainer,
              pressed && { opacity: 0.5 },
            ]}
            onPress={handleCreateReview}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.buttonContainer,
            { backgroundColor: GlobalColors.gray },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.buttonInnerContainer,
              pressed && { opacity: 0.5 },
            ]}
            onPress={() => setIsModalOpen(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  star: {},

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
    maxWidth: 250,
    marginHorizontal: "auto",
  },

  comment: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    minHeight: 100,
    maxHeight: 300,
    textAlignVertical: "top",
  },

  cameraContainer: {
    width: 90,
    height: 90,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 10,
    marginBottom: 20,
  },
  cameraInnerContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },

  camera: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GlobalColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },

  buttonContainer: {
    backgroundColor: GlobalColors.primary,
    width: "45%",
    borderRadius: 5,
  },
  buttonInnerContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
