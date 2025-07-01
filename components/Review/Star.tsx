import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

export default function Star({
  numStar,
  maxStar,
}: {
  numStar: number;
  maxStar: number;
}) {
  return (
    <View style={styles.container}>
      {Array(maxStar)
        .fill(0)
        .map((_, index) => (
          <Entypo
            key={index}
            name={index < numStar ? "star" : "star-outlined"}
            size={20}
            color={index < numStar ? "yellow" : "#ccc"}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 110,
  },
  star: {},
});
