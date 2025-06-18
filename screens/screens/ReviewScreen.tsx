import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";

const product = {
  id: 1,
  name: "Áo thun nam cổ tròn",
  image: "https://via.placeholder.com/150",
  price: 199000,
};

import type { StackNavigationProp } from "@react-navigation/stack";

type ReviewScreenProps = {
  navigation: StackNavigationProp<any>;
};

const ReviewScreen = ({ navigation }: ReviewScreenProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <View style={styles.submittedContainer}>
        <Icon name="check-circle" size={60} color="#4CAF50" />
        <Text style={styles.submittedTitle}>Cảm ơn đánh giá của bạn!</Text>
        <Text style={styles.submittedText}>
          Đánh giá của bạn đã được ghi nhận.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productInfo}>
        <View style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            {product.price.toLocaleString()}đ
          </Text>
        </View>
      </View>

      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>
          Bạn đánh giá sản phẩm này thế nào?
        </Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Icon
                name={star <= rating ? "star" : "star-border"}
                size={40}
                color={star <= rating ? "#FFC107" : "#ddd"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.sectionTitle}>Nhận xét của bạn</Text>
        <TextInput
          style={styles.reviewInput}
          value={review}
          onChangeText={setReview}
          placeholder="Hãy chia sẻ cảm nhận về sản phẩm..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
        />
        <Text style={styles.charCount}>{review.length}/500</Text>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, rating === 0 && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={rating === 0}
      >
        <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  productInfo: {
    flexDirection: "row",
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "bold",
  },
  ratingSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewSection: {
    marginBottom: 20,
  },
  reviewInput: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 5,
  },
  charCount: {
    textAlign: "right",
    color: "#999",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submittedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  submittedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#4CAF50",
  },
  submittedText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReviewScreen;
