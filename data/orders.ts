// Dữ liệu mẫu đơn hàng
export const orders = [
  {
    id: "ORD-001",
    userId: "user123",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerEmail: "nguyenvana@gmail.com",
    products: [
      { id: "1", name: "Áo Thun Unisex Basic", price: 199000, quantity: 2, color: "Đen", size: "L" },
      { id: "4", name: "Giày Thể Thao Nam", price: 850000, quantity: 1, color: "Trắng", size: "42" }
    ],
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Nguyễn Văn Linh",
      ward: "Phường Tân Phong",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "COD",
    status: "Đã giao hàng",
    subTotal: 1248000,
    shippingFee: 30000,
    discount: 50000,
    total: 1228000,
    createdAt: "2025-06-01T10:30:00.000Z",
    updatedAt: "2025-06-03T15:20:00.000Z"
  },
  {
    id: "ORD-002",
    userId: "user456",
    customerName: "Trần Thị B",
    customerPhone: "0987654321",
    customerEmail: "tranthib@gmail.com",
    products: [
      { id: "3", name: "Đầm Maxi Nữ", price: 650000, quantity: 1, color: "Hồng", size: "M" },
      { id: "5", name: "Túi Xách Nữ Da Thật", price: 1200000, quantity: 1, color: "Đen", size: "One size" }
    ],
    shippingAddress: {
      fullName: "Trần Thị B",
      phone: "0987654321",
      address: "456 Lê Văn Lương",
      ward: "Phường Tân Hưng",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "Thẻ tín dụng",
    status: "Đang giao hàng",
    subTotal: 1850000,
    shippingFee: 30000,
    discount: 0,
    total: 1880000,
    createdAt: "2025-06-03T09:15:00.000Z",
    updatedAt: "2025-06-04T14:10:00.000Z"
  },
  {
    id: "ORD-003",
    userId: "user789",
    customerName: "Lê Văn C",
    customerPhone: "0912345678",
    customerEmail: "levanc@gmail.com",
    products: [
      { id: "6", name: "Áo Sơ Mi Nam Dài Tay", price: 350000, quantity: 2, color: "Trắng", size: "XL" },
      { id: "8", name: "Quần Short Nam Thể Thao", price: 220000, quantity: 2, color: "Đen", size: "L" }
    ],
    shippingAddress: {
      fullName: "Lê Văn C",
      phone: "0912345678",
      address: "789 Nguyễn Hữu Thọ",
      ward: "Phường Tân Phú",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "Ví điện tử",
    status: "Chờ xác nhận",
    subTotal: 1140000,
    shippingFee: 30000,
    discount: 100000,
    total: 1070000,
    createdAt: "2025-06-05T16:45:00.000Z",
    updatedAt: "2025-06-05T16:45:00.000Z"
  },
  {
    id: "ORD-004",
    userId: "user101",
    customerName: "Phạm Thị D",
    customerPhone: "0976543210",
    customerEmail: "phamthid@gmail.com",
    products: [
      { id: "7", name: "Váy Liền Công Sở", price: 520000, quantity: 1, color: "Xanh navy", size: "M" },
      { id: "10", name: "Đồng Hồ Nam Dây Da", price: 1500000, quantity: 1, color: "Nâu", size: "One size" }
    ],
    shippingAddress: {
      fullName: "Phạm Thị D",
      phone: "0976543210",
      address: "101 Nguyễn Đức Cảnh",
      ward: "Phường Tân Phong",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "Chuyển khoản ngân hàng",
    status: "Đã hủy",
    subTotal: 2020000,
    shippingFee: 30000,
    discount: 0,
    total: 2050000,
    createdAt: "2025-06-02T11:20:00.000Z",
    updatedAt: "2025-06-02T15:30:00.000Z"
  },
  {
    id: "ORD-005",
    userId: "user202",
    customerName: "Hoàng Minh E",
    customerPhone: "0989876543",
    customerEmail: "hoangminhe@gmail.com",
    products: [
      { id: "2", name: "Quần Jean Nam Slim Fit", price: 450000, quantity: 1, color: "Xanh đậm", size: "32" },
      { id: "9", name: "Áo Khoác Denim Unisex", price: 590000, quantity: 1, color: "Xanh đậm", size: "L" }
    ],
    shippingAddress: {
      fullName: "Hoàng Minh E",
      phone: "0989876543",
      address: "202 Nguyễn Thị Thập",
      ward: "Phường Bình Thuận",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "COD",
    status: "Đã giao hàng",
    subTotal: 1040000,
    shippingFee: 30000,
    discount: 0,
    total: 1070000,
    createdAt: "2025-05-28T14:25:00.000Z",
    updatedAt: "2025-05-30T16:15:00.000Z"
  },
  {
    id: "ORD-006",
    userId: "user303",
    customerName: "Vũ Anh F",
    customerPhone: "0932198765",
    customerEmail: "vuanhf@gmail.com",
    products: [
      { id: "1", name: "Áo Thun Unisex Basic", price: 199000, quantity: 3, color: "Trắng", size: "M" }
    ],
    shippingAddress: {
      fullName: "Vũ Anh F",
      phone: "0932198765",
      address: "303 Huỳnh Tấn Phát",
      ward: "Phường Tân Thuận Đông",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "COD",
    status: "Đang chuẩn bị hàng",
    subTotal: 597000,
    shippingFee: 30000,
    discount: 0,
    total: 627000,
    createdAt: "2025-06-05T08:40:00.000Z",
    updatedAt: "2025-06-05T10:20:00.000Z"
  }
];

export default orders;
