import { View, Text, StyleSheet, Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";

export default function UserInfo({ avatar, fullname, email, createdAt }: any) {
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
          <Text style={styles.text}>{fullname}</Text>
          <Text style={[styles.text, styles.textDate]}>{createdAt}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Entypo name="dots-three-horizontal" size={18} color="#333" />
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
  right: {},
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
