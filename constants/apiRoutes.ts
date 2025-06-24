const BASE_URL = 'https://api.clothingapp.com/api/v1';

export const apiRoutes = {
  // Auth
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  forgotPassword: `${BASE_URL}/auth/forgot-password`,
  resetPassword: `${BASE_URL}/auth/reset-password`,
  logout: `${BASE_URL}/auth/logout`,
  refreshToken: `${BASE_URL}/auth/refresh-token`,
  
  // Products
  products: `${BASE_URL}/products`,
  product: (id: string) => `${BASE_URL}/products/${id}`,
  productReviews: (id: string) => `${BASE_URL}/products/${id}/reviews`,
  featuredProducts: `${BASE_URL}/products/featured`,
  newArrivals: `${BASE_URL}/products/new-arrivals`,
  bestSellers: `${BASE_URL}/products/best-sellers`,
  searchProducts: `${BASE_URL}/products/search`,
  
  // Categories
  categories: `${BASE_URL}/categories`,
  category: (id: string) => `${BASE_URL}/categories/${id}`,
  categoryProducts: (id: string) => `${BASE_URL}/categories/${id}/products`,
  
  // Cart
  cart: `${BASE_URL}/cart`,
  addToCart: `${BASE_URL}/cart/add`,
  updateCartItem: (id: string) => `${BASE_URL}/cart/item/${id}`,
  removeCartItem: (id: string) => `${BASE_URL}/cart/item/${id}`,
  clearCart: `${BASE_URL}/cart/clear`,
  
  // Orders
  orders: `${BASE_URL}/orders`,
  order: (id: string) => `${BASE_URL}/orders/${id}`,
  checkout: `${BASE_URL}/orders/checkout`,
  
  // User
  user: `${BASE_URL}/user`,
  updateUserProfile: `${BASE_URL}/user/profile`,
  userAddresses: `${BASE_URL}/user/addresses`,
  userAddress: (id: string) => `${BASE_URL}/user/addresses/${id}`,
  userPaymentMethods: `${BASE_URL}/user/payment-methods`,
  userPaymentMethod: (id: string) => `${BASE_URL}/user/payment-methods/${id}`,
  
  // Wishlist
  wishlist: `${BASE_URL}/wishlist`,
  addToWishlist: (productId: string) => `${BASE_URL}/wishlist/add/${productId}`,
  removeFromWishlist: (productId: string) => `${BASE_URL}/wishlist/remove/${productId}`,
  
  // Reviews
  reviews: `${BASE_URL}/reviews`,
  review: (id: string) => `${BASE_URL}/reviews/${id}`,
  userReviews: `${BASE_URL}/user/reviews`,
  
  // Coupons
  coupons: `${BASE_URL}/coupons`,
  applyCoupon: `${BASE_URL}/coupons/apply`,
  
  // Support
  support: `${BASE_URL}/support`,
  supportTicket: (id: string) => `${BASE_URL}/support/${id}`,
  
  // Admin routes
  admin: {
    dashboard: `${BASE_URL}/admin/dashboard`,
    users: `${BASE_URL}/admin/users`,
    user: (id: string) => `${BASE_URL}/admin/users/${id}`,
    orders: `${BASE_URL}/admin/orders`,
    order: (id: string) => `${BASE_URL}/admin/orders/${id}`,
    products: `${BASE_URL}/admin/products`,
    product: (id: string) => `${BASE_URL}/admin/products/${id}`,
    categories: `${BASE_URL}/admin/categories`,
    category: (id: string) => `${BASE_URL}/admin/categories/${id}`,
    discounts: `${BASE_URL}/admin/discounts`,
    discount: (id: string) => `${BASE_URL}/admin/discounts/${id}`,
    analytics: `${BASE_URL}/admin/analytics`,
  }
};

export default apiRoutes;
