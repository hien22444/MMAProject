import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import GlobalColors from "../constants/colors";

export default function CreateReviewScreen() {
  const [numStar, setNumStar] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your rate?</Text>
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() => setNumStar(index + 1)}
            style={styles.star}
          >
            <Entypo
              name={index + 1 <= numStar ? "star" : "star-outlined"}
              size={30}
              color={index + 1 <= numStar ? "gold" : "gray"}
            />
          </Pressable>
        ))}
      </View>
      {/* <Star numStar={0} maxStar={5} /> */}
      <Text style={styles.subtitle}>
        Please share your opinion about the product
      </Text>

      <TextInput multiline numberOfLines={4} style={styles.comment} />

      <View style={styles.cameraContainer}>
        <Pressable style={styles.cameraInnerContainer}>
          <View style={styles.camera}>
            <Entypo name="camera" size={20} color="white" />
          </View>
          <Text style={{ textAlign: "center" }}>Add your photos</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonInnerContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

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

  buttonContainer: {
    backgroundColor: GlobalColors.primary,
    width: "100%",
    borderRadius: 20,
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
