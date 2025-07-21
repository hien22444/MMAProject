import React, { createContext, useState, useContext, ReactNode } from "react";
import { messages as initialMessages } from "../data/messages";
import { SupportMessage } from "../types/message";

// Define Review type

interface MessageContextType {
  messages: SupportMessage[];
  addMessage: (message: SupportMessage) => void;
  deleteMessage: (messageId: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<SupportMessage[]>(initialMessages);

  const addMessage = (message: SupportMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const deleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
