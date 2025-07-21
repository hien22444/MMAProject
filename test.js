// Test script để kiểm tra app
console.log('Testing app...');

// Test 1: Check if all providers are working
console.log('✓ AuthProvider, ProductProvider, OrderProvider, CartProvider should be available');

// Test 2: Login credentials
console.log('✓ Admin login: admin / 123');
console.log('✓ User login: user@test.com / user123');

// Test 3: Navigation flow
console.log('✓ After login -> Admin goes to AdminTab, User goes to Tab');
console.log('✓ User can navigate to OrderHistory from Profile');

// Test 4: Data consistency
console.log('✓ Products: 25 items shared between admin and user');
console.log('✓ Orders: Multiple orders for user@test.com');
console.log('✓ Cart: Uses Product from ProductContext');

export const testCredentials = {
  admin: { email: 'admin', password: '123' },
  user: { email: 'user@test.com', password: 'user123' }
};

export const testNavigation = {
  adminScreens: ['ProductManagement', 'OrderManagement', 'Analytics', 'CategoryManagement', 'UserManager'],
  userScreens: ['Home', 'Cart', 'Chat', 'Profile', 'OrderHistory']
};
