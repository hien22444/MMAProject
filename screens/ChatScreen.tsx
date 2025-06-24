import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import ChatMessage from "../components/Chat/ChatMessage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GlobalColors from "../constants/colors";

interface SupportMessage {
  id: string;
  content: string;
  senderType: "user" | "agent" | "system";
  senderId: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  isSystemMessage?: boolean;
}

const chatMessages: SupportMessage[] = [
  {
    id: "msg1",
    content: "Xin chào, tôi cần hỗ trợ về đơn hàng #12345",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:00:00"),
    status: "read",
  },
  {
    id: "msg2",
    content:
      "Xin chào bạn! Tôi là nhân viên hỗ trợ. Bạn có thể cho biết vấn đề cụ thể?",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:02:30"),
    status: "read",
  },
  {
    id: "msg3",
    content: "Tôi đã thanh toán nhưng chưa nhận được xác nhận đơn hàng",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:03:15"),
    status: "read",
  },
  {
    id: "msg4",
    content:
      "Tôi sẽ kiểm tra hệ thống. Bạn đã nhận được email nào từ chúng tôi chưa?",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:05:00"),
    status: "read",
  },
  {
    id: "msg5",
    content: "Tôi chỉ nhận được email xác nhận thanh toán thôi",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:06:22"),
    status: "read",
  },
  {
    id: "msg6",
    content: "Đã xác nhận đơn hàng của bạn. Đây là mã theo dõi: ABX-123-456",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:10:00"),
    status: "read",
  },
  {
    id: "msg7",
    content: "Cảm ơn! Khi nào tôi nhận được hàng?",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:11:30"),
    status: "read",
  },
  {
    id: "msg8",
    content:
      "Dự kiến giao trong 2-3 ngày tới. Bạn cần thêm thông tin gì nữa không?",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:13:00"),
    status: "read",
  },
  {
    id: "msg9",
    content: "Tôi muốn đổi địa chỉ giao hàng được không?",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:15:45"),
    status: "read",
  },
  {
    id: "msg10",
    content: "Vui lòng cung cấp địa chỉ mới, tôi sẽ cập nhật ngay",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:17:00"),
    status: "read",
  },
  {
    id: "msg11",
    content: "Địa chỉ mới: 123 Đường ABC, Quận 1, TP.HCM",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:18:30"),
    status: "delivered",
  },
  {
    id: "msg12",
    content:
      "Đã cập nhật địa chỉ thành công. Bạn có muốn nhận qua bưu điện hay giao tận nơi?",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:20:00"),
    status: "delivered",
  },
  {
    id: "msg13",
    content: "Giao tận nơi nhé. Giờ nhận hàng từ 9h-17h",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:22:15"),
    status: "delivered",
  },
  {
    id: "msg14",
    content: "Đã ghi nhận yêu cầu. Chúng tôi sẽ liên hệ trước khi giao 30 phút",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:25:00"),
    status: "delivered",
  },
  {
    id: "msg15",
    content: "Cảm ơn nhiều!",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:26:00"),
    status: "sent",
  },
  {
    id: "msg16",
    content:
      "Chúng tôi vừa gửi email xác nhận thông tin đơn hàng mới nhất cho bạn",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:30:00"),
    status: "sent",
  },
  {
    id: "msg17",
    content: "Tôi đã nhận được email rồi",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:32:00"),
    status: "sent",
  },
  {
    id: "msg18",
    content: "Phiên chat này sẽ tự động đóng sau 10 phút không có phản hồi",
    senderType: "system",
    senderId: "system",
    timestamp: new Date("2023-11-15T09:35:00"),
    status: "read",
    isSystemMessage: true,
  },
  {
    id: "msg19",
    content: "Nếu cần thêm hỗ trợ, bạn có thể mở chat mới bất kỳ lúc nào",
    senderType: "agent",
    senderId: "agent_456",
    timestamp: new Date("2023-11-15T09:36:00"),
    status: "sent",
  },
  {
    id: "msg20",
    content: "Cảm ơn bạn đã hỗ trợ nhiệt tình!",
    senderType: "user",
    senderId: "user_789",
    timestamp: new Date("2023-11-15T09:40:00"),
    status: "sent",
  },
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContent}>
        {chatMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ScrollView>
      <View style={styles.toolbox}>
        <TextInput
          placeholder="Type your message..."
          style={styles.inputText}
        />
        <View>
          <Pressable>
            <FontAwesome name="send" size={24} color={GlobalColors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "space-between",
  },
  chatContent: {
    flex: 1,
    marginBottom: 10,
  },
  toolbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,

    padding: 10,
  },
  inputText: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
