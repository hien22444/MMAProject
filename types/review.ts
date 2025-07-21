export interface Review {
  id: string;
  productId: string;
  userId: string;
  avatar: string;
  fullname: string;
  email: string;
  createdAt: string;
  numStar: number;
  maxStar: number;
  content: string;
}
