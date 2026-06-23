"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Review } from "../../../../types/vendor";

type AddReviewParams = Omit<Review, "id" | "date" | "likes">;

type ReviewsContextType = {
  reviews: Review[];
  addReview: (review: AddReviewParams) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
};

const ReviewsContext = createContext<ReviewsContextType | null>(null);

export function ReviewsProvider({
  children,
  initialReviews = [],
}: {
  children: React.ReactNode;
  initialReviews?: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // Debugging
  useEffect(() => {
    console.log("Reviews updated:", reviews);
  }, [reviews]);

  const addReview = useCallback((review: AddReviewParams) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      likes: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  }, []);

  const updateReview = useCallback((id: string, updates: Partial<Review>) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              ...updates,
              likes: Math.max(0, updates.likes ?? review.likes),
            }
          : review
      )
    );
  }, []);

  const deleteReview = useCallback((id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      reviews,
      addReview,
      updateReview,
      deleteReview,
    }),
    [reviews, addReview, updateReview, deleteReview]
  );

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
