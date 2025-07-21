interface SupportMessage {
  id: string;
  senderId: string | undefined;
  receiverId: string | undefined;
  senderType: "user" | "agent";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export { SupportMessage };
