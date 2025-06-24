import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ReviewBox from "./ReviewBox";
import { Review } from "../../types/review";

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh giá khách hàng:</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewBox
            avatar={item.avatar}
            fullname={item.fullname}
            email={item.email}
            createdAt={item.createdAt}
            numStar={item.numStar}
            maxStar={item.maxStar}
            content={item.content}
          />
        )}
        scrollEnabled={false} // Vì dùng trong ScrollView
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  list: {
    width: "100%",
  },
});

export default ReviewList;
