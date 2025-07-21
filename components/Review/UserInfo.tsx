import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useReviews } from "../../contexts/ReviewContext";

export default function UserInfo({
  reviewId,
  userId,
  avatar,
  fullname,
  email,
  createdAt,
}: any) {
  const { currentUser } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showMenu, setShowMenu] = useState(false);

  const { deleteReview } = useReviews();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri:
                avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfLDIZzOmE3tXtQUkPZ_o89LbJbQcMNYuK5Q&s",
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>{fullname || email || "Anonymous"}</Text>
          <Text style={[styles.text, styles.textDate]}>{createdAt}</Text>
        </View>
      </View>
      <View style={styles.actionBox}>
        <Pressable
          onPress={() => {
            if (!currentUser) return navigation.navigate("Login");
            setShowMenu(!showMenu);
          }}
        >
          <View>
            <Entypo name="dots-three-horizontal" size={18} color="#333" />
          </View>
        </Pressable>

        {showMenu && (
          <View style={styles.menu}>
            {/* <Pressable
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: "#ddd" },
              ]}
              onPress={() => {
                if (!currentUser) return navigation.navigate("Login");
                if (currentUser.id !== userId) {
                  alert("You can only edit your own review");
                  setShowMenu(false);
                  return;
                }
                alert("Edit review");
              }}
            >
              <Text style={styles.menuText}>Chỉnh sửa</Text>
            </Pressable> */}
            <Pressable
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: "#ddd" },
              ]}
              onPress={() => {
                if (!currentUser) return navigation.navigate("Login");
                if (currentUser.id !== userId) {
                  alert("You can only delete your own review");
                  setShowMenu(false);
                  return;
                }

                Alert.alert(
                  "Xác nhận xóa",
                  "Bạn có chắc chắn muốn xóa bình luận này?",
                  [
                    {
                      text: "Hủy",
                      style: "cancel",
                      onPress: () => setShowMenu(false),
                    },
                    {
                      text: "Xóa",
                      onPress: () => {
                        deleteReview(reviewId);
                        setShowMenu(false);
                      },
                      style: "destructive",
                    },
                  ]
                );
              }}
            >
              <Text style={styles.menuText}>Xoá</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionBox: {
    position: "relative",
  },

  menu: {
    width: 90,
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 5,
  },
  menuText: {
    fontSize: 12,
    color: "#333",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  info: {},
  text: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  textDate: {
    fontSize: 14,
    color: "#777",
  },
});
