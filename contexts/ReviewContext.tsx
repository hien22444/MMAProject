import React, { createContext, useState, useContext, ReactNode } from "react";
import { reviews as initialReviews } from "../data/reviews";
import { Review } from "../types/review";

// Define Review type

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (review: Review) => void;
  deleteReview: (reviewId: string) => void;
  getReviewById: (id: string) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const addReview = (review: Review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  const updateReview = (updatedReview: Review) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  const getReviewById = (id: string) => {
    return reviews.find((review) => review.id === id);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        updateReview,
        deleteReview,
        getReviewById,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

// Custom hook
export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
