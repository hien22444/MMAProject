import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import ChatMessage from "../components/Chat/ChatMessage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GlobalColors from "../constants/colors";
import { SupportMessage } from "../types/message";
import { useMessages } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";
import { useRef, useEffect } from "react";

export default function ChatScreen() {
  const { messages, addMessage, deleteMessage } = useMessages();

  const { currentUser } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);

  const [newMessage, setNewMessage] = useState<SupportMessage>({
    id: (messages.length + 1).toString(),
    senderId: currentUser?.role == "user" ? currentUser?.id : "support_1",
    receiverId: currentUser?.role == "user" ? "support_1" : currentUser?.id,
    senderType: currentUser?.role == "user" ? "user" : "agent",
    content: "",
    timestamp: new Date(),
    status: "sent",
  });

  const handleSend = () => {
    if (newMessage.content.trim() !== "") {
      addMessage(newMessage);
      setNewMessage({
        id: (messages.length + 2).toString(),
        senderId: currentUser?.role == "user" ? currentUser?.id : "support_1",
        receiverId: currentUser?.role == "user" ? "support_1" : currentUser?.id,
        senderType: currentUser?.role == "user" ? "user" : "agent",
        content: "",
        timestamp: new Date(),
        status: "sent",
      });
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true }); // step 2
  }, [messages]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.chatContent}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {messages
          .filter(
            (message) =>
              message.senderId == currentUser?.id ||
              message.receiverId == currentUser?.id
          )
          .map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isUserSender={
                (currentUser?.role == "user" && message.senderType == "user") ||
                (currentUser?.role == "agent" && message.senderType == "agent")
                  ? true
                  : false
              }
            />
          ))}
      </ScrollView>
      <View style={styles.toolbox}>
        <TextInput
          placeholder="Type your message..."
          style={styles.inputText}
          value={newMessage.content}
          onChangeText={(text) =>
            setNewMessage({ ...newMessage, content: text })
          }
          onSubmitEditing={handleSend}
          autoFocus={true}
          blurOnSubmit={false}
          returnKeyType="send"
        />

        <Pressable onPress={handleSend}>
          <FontAwesome name="send" size={24} color={GlobalColors.primary} />
        </Pressable>
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
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
    fontSize: 16,
  },
});
