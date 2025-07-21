import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import GlobalColors from "../../constants/colors";

// id: string;
//   content: string;
//   senderType: "user" | "agent" | "system";
//   senderId: string;
//   timestamp: Date;
//   status: "sent" | "delivered" | "read";
//   isSystemMessage?: boolean;

export default function ChatMessage({ message, isUserSender }: any) {
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let direction = "left";
  if (
    (isUserSender && message.senderType == "user") ||
    (!isUserSender && message.senderType !== "user")
  ) {
    direction = "right";
  }

  return (
    <View
      style={[
        styles.containerBox,
        direction == "right" && { alignItems: "flex-end" },
      ]}
    >
      <View style={styles.messageBox}>
        <View style={styles.avatar}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            source={
              direction == "left"
                ? {
                    uri: "https://img.goodfon.com/wallpaper/big/3/1c/asian-girl-fei-photo-xin-xin-ksin-ksin-milaia-aziatka-vzgl-1.webp",
                  }
                : {
                    uri: "https://media.istockphoto.com/id/1388642146/photo/call-center-workers.jpg?s=612x612&w=0&k=20&c=OQ-BhHBcXxYxK2zz4JUQXR6SJ1NucnaVjHWu8ylksNI=",
                  }
            }
          />
        </View>
        <View
          style={[
            styles.info,
            direction == "right" && { backgroundColor: GlobalColors.primary },
          ]}
        >
          <Text style={{ fontSize: 16, color: "#333" }}>{message.content}</Text>
          <View style={styles.subinfo}>
            <Text style={{ fontSize: 12, color: "#555" }}>{formattedTime}</Text>
            <Text>
              {message.status == "sent" ? (
                <FontAwesome5 name="check-double" size={12} color="#555" />
              ) : message.status == "delivered" ? (
                <FontAwesome6 name="clock" size={12} color="#555" />
              ) : (
                "đã xem"
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBox: {
    width: "100%",
    marginVertical: 15,
  },
  messageBox: {
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#ccc",
  },

  info: {
    maxWidth: "65%",
    backgroundColor: "#f0f0f0",
    padding: 10,
    paddingBottom: 5,
    borderRadius: 10,
    overflow: "hidden",
  },

  subinfo: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
