import { SupportMessage } from "../types/message";

const messages: SupportMessage[] = [
  {
    id: "0",
    senderId: "2",
    receiverId: "support_1",
    senderType: "user",
    content: "Xin chào, tôi cần hỗ trợ về đơn hàng #12345",
    timestamp: new Date("2023-11-15T09:00:00"),
    status: "read",
  },
  {
    id: "1",
    senderId: "support_1",
    receiverId: "2",
    senderType: "agent",
    content:
      "Xin chào bạn! Tôi là nhân viên hỗ trợ. Bạn có thể cho biết vấn đề cụ thể?",
    timestamp: new Date("2023-11-15T09:02:30"),
    status: "read",
  },
  {
    id: "2",
    senderId: "2",
    receiverId: "support_1",
    senderType: "user",
    content: "Tôi đã thanh toán nhưng chưa nhận được xác nhận đơn hàng",
    timestamp: new Date("2023-11-15T09:03:15"),
    status: "read",
  },
  {
    id: "3",
    senderId: "support_1",
    receiverId: "2",
    senderType: "agent",
    content:
      "Tôi sẽ kiểm tra hệ thống. Bạn đã nhận được email nào từ chúng tôi chưa?",
    timestamp: new Date("2023-11-15T09:05:00"),
    status: "read",
  },
];

export { messages };
