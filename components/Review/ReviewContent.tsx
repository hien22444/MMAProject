import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Star from "./Star";

export default function ReviewContent({
  numStar,
  maxStar,
  content,
}: {
  numStar: number;
  maxStar: number;
  content: string;
}) {
  return (
    <View style={styles.container}>
      <Star numStar={numStar} maxStar={maxStar} />
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 7,
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 1,
    minHeight: 100,
  },
  content: {
    marginVertical: 10,
    fontSize: 16,
  },
});
