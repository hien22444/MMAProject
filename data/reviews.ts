import { Review } from "../types/review";

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "3",
    avatar: "",
    fullname: "Nguyễn Sỹ Đức",
    email: "duc@gmail.com",
    createdAt: "23/10/2025",
    numStar: 4,
    maxStar: 5,
    content: "Sản phẩm dùng ổn, đóng gói kỹ, giao hàng nhanh. Sẽ ủng hộ tiếp!",
  },
  {
    id: "2",
    productId: "1",
    userId: "4",
    avatar: "",
    fullname: "Trần Văn An",
    email: "an@gmail.com",
    createdAt: "23/10/2025",
    numStar: 1,
    maxStar: 5,
    content: "Hàng nhận về bị lỗi, không giống mô tả. Rất thất vọng.",
  },
  {
    id: "3",
    productId: "1",
    userId: "5",
    avatar: "",
    fullname: "Lưu Vũ Ninh",
    email: "ninh@gmail.com",
    createdAt: "23/10/2025",
    numStar: 5,
    maxStar: 5,
    content:
      "Cực kỳ hài lòng! Sản phẩm chất lượng, đúng như hình. Đóng gói cẩn thận.",
  },
  {
    id: "4",
    productId: "1",
    userId: "6",
    avatar: "",
    fullname: "Trần Gia Hân",
    email: "han@gmail.com",
    createdAt: "23/10/2025",
    numStar: 2,
    maxStar: 5,
    content: "Sản phẩm nhìn ngoài không được như mong đợi. Giao hơi chậm.",
  },
  {
    id: "0",
    productId: "1",
    userId: "7",
    avatar: "",
    fullname: "Ngô Bá Khải",
    email: "khai@gmail.com",
    createdAt: "23/10/2025",
    numStar: 3,
    maxStar: 5,
    content:
      "Chất lượng tạm ổn, giá hợp lý. Phục vụ tốt nhưng có thể cải thiện thêm.",
  },
];

export default reviews;
