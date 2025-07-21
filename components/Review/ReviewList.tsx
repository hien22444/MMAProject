import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

import ReviewBox from "./ReviewBox";
import { Review } from "../../types/review";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";

type ReviewListProps = {
  reviews: Review[];
  productId: string;
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews, productId }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh giá khách hàng:</Text>
      {reviews.length === 0 ? (
        <Text style={styles.text}>Chưa có đánh giá nào</Text>
      ) : (
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
      )}

      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          android_ripple={{ color: "#FF6F61" }}
          onPress={() => {
            navigation.navigate("AllReviews", {
              productId: productId,
            });
          }}
        >
          <Text style={{ color: "#FF6F61" }}>
            {reviews.length > 0 ? "Xem thêm đánh giá " : "Đánh giá "}&gt;&gt;
          </Text>
        </Pressable>
      </View>
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
  text: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    marginTop: 10,
  },
  list: {
    width: "100%",
  },
});

export default ReviewList;
