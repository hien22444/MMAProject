import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UserInfo from "./UserInfo";
import ReviewContent from "./ReviewContent";

export default function ReviewBox({
  reviewId,
  userId,
  avatar,
  fullname,
  email,
  createdAt,
  numStar,
  maxStar,
  content,
}: any) {
  return (
    <View style={styles.container}>
      <UserInfo
        reviewId={reviewId}
        userId={userId}
        avatar={null}
        fullname={fullname}
        email={email}
        createdAt={createdAt}
      />
      <ReviewContent numStar={numStar} maxStar={maxStar} content={content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
