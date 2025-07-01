import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define Order types
export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  imageUrl?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  products: OrderProduct[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: string;
  subTotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Sample orders data with proper user association
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user@test.com",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerEmail: "user@test.com",
    products: [
      { 
        id: "1", 
        name: "Áo Thun Unisex Basic", 
        price: 199000, 
        quantity: 2, 
        color: "Đen", 
        size: "L", 
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      },
      { 
        id: "4", 
        name: "Giày Thể Thao Nam", 
        price: 850000, 
        quantity: 1, 
        color: "Trắng", 
        size: "42", 
        imageUrl: "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
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
    status: "delivered",
    subTotal: 1248000,
    shippingFee: 30000,
    discount: 50000,
    total: 1228000,
    createdAt: "2024-06-01T10:30:00.000Z",
    updatedAt: "2024-06-03T15:20:00.000Z"
  },
  {
    id: "ORD-002",
    userId: "user@test.com",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerEmail: "user@test.com",
    products: [
      { 
        id: "3", 
        name: "Đầm Maxi Nữ", 
        price: 650000, 
        quantity: 1, 
        color: "Hồng", 
        size: "M", 
        imageUrl: "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ],
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0901234567",
      address: "456 Lê Văn Lương",
      ward: "Phường Tân Hưng",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "Thẻ tín dụng",
    status: "shipping",
    subTotal: 650000,
    shippingFee: 30000,
    discount: 0,
    total: 680000,
    createdAt: "2024-06-15T09:15:00.000Z",
    updatedAt: "2024-06-16T14:10:00.000Z"
  },
  {
    id: "ORD-003",
    userId: "user@test.com",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerEmail: "user@test.com",
    products: [
      { 
        id: "6", 
        name: "Áo Sơ Mi Nam Dài Tay", 
        price: 350000, 
        quantity: 1, 
        color: "Trắng", 
        size: "XL", 
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ],
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0901234567",
      address: "789 Nguyễn Hữu Thọ",
      ward: "Phường Tân Phú",
      district: "Quận 7",
      city: "TP.HCM"
    },
    paymentMethod: "Ví điện tử",
    status: "pending",
    subTotal: 350000,
    shippingFee: 30000,
    discount: 0,
    total: 380000,
    createdAt: "2024-06-20T16:45:00.000Z",
    updatedAt: "2024-06-20T16:45:00.000Z"
  }
];

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  getOrdersByUserId: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: string) => Order[];
  getUserOrders: (userEmail: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [...prevOrders, order]);
  };

  const updateOrder = (updatedOrder: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: status, 
              updatedAt: new Date().toISOString() 
            } 
          : order
      )
    );
  };

  const getOrdersByUserId = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
  };

  const getUserOrders = (userEmail: string) => {
    return orders.filter(order => order.userId === userEmail || order.customerEmail === userEmail);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrder,
      updateOrderStatus,
      getOrdersByUserId,
      getOrderById,
      getOrdersByStatus,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
