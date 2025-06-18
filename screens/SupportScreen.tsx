import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import type { StackNavigationProp } from "@react-navigation/stack";

type SupportScreenProps = {
  navigation: StackNavigationProp<any>;
};

const SupportScreen = ({ navigation }: SupportScreenProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn?", isUser: false },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, isUser: true },
      ]);
      setMessage("");

      // Simulate reply after 1 second
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.isUser ? styles.userBubble : styles.supportBubble,
            ]}
          >
            <Text style={msg.isUser ? styles.userText : styles.supportText}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#6200ee",
    borderBottomRightRadius: 0,
  },
  supportBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 0,
  },
  userText: {
    color: "white",
  },
  supportText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200ee",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SupportScreen;
