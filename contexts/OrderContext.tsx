import React, { createContext, useState, useContext, ReactNode } from 'react';
import { orders as initialOrders } from '../data/orders';

// Define Order types
export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
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

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  getOrdersByUserId: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

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

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrder,
      updateOrderStatus,
      getOrdersByUserId,
      getOrderById,
      getOrdersByStatus
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
