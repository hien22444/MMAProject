export interface User {
  email: string;
  password: string;
  role: 'user' | 'admin';
  hasProfileInfo: boolean;

  name?: string;
  phone?: string;
  address?: string;
  gender?: string;
  dob?: string; // ISO date string
}
