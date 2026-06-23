"use client";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Review } from "../../../../types/vendor";
import { useReviews } from "components/event-planner/vendor/vendorView/ReviewsContext";


interface VendorReviewsProps {
  vendor: {
    reviewCount: number;
    reviews: Review[];
    name: string;
    id: string;
  };
  onAddReview: () => void;
  onSubmitReview?: (review: { rating: number; content: string }) => void;
}
export function VendorReviews({
  vendor,
  onAddReview,
}: VendorReviewsProps): React.JSX.Element {
  const router = useRouter();

  const { reviews: contextReviews, updateReview } = useReviews();
  const [isLiking, setIsLiking] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Process reviews from context
  const reviews = contextReviews.map((review) => ({
    ...review,
    isLiked: review.isLiked || false,
    currentLikes: review.likes || 0,
    userImage: review.userImage || "/noavatar.png",
    comment: review.content || "",
  }));

  // Calculate pagination only when showing all reviews
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const paginatedReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Determine which reviews to display
  const displayedReviews = showAllReviews
    ? reviews.length > reviewsPerPage
      ? paginatedReviews
      : reviews
    : reviews.slice(0, 1);

  const handleLikeClick = async (reviewId: string) => {
    setIsLiking(reviewId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const review = reviews.find((r) => r.id === reviewId);
      if (review) {
        updateReview(reviewId, {
          isLiked: !review.isLiked,
          likes: review.isLiked ? review.likes - 1 : review.likes + 1,
        });
      }
    } finally {
      setIsLiking(null);
    }
  };

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
    // Reset to first page when toggling
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2 pb-1 pt-3">
        <h2 className="text-gray-800 font-semibold">
          Reviews ({vendor.reviewCount})
        </h2>
        <button
          onClick={() => {
            onAddReview(); // Call any existing handler
            router.push(
              `/vendor/vendors/view/${vendor.id}/booking-details?add-review=true`
            );
          }}
          className="text-sm text-[#6946e2] font-medium hover:underline"
          aria-label="Write a review"
        >
          Write a review
        </button>
      </div>

      {reviews.length > 0 ? (
        <>
          {displayedReviews.map((review) => (
            <article key={review.id} className="border-t pt-4 pb-4">
              <div className="flex flex-col items-start bg-[#f9f9f9] p-2 rounded-lg mb-2 w-full">
                <div className="flex flex-row items-center mb-2 gap-2">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden">
                    <Image
                      src={review.userImage}
                      alt={`${review.userName}'s avatar`}
                      width={28}
                      height={28}
                      className="object-cover"
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm text-gray-900 font-semibold">
                      {review.userName}
                    </h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ))}
                      <span className="sr-only">
                        Rating: {review.rating} out of 5 stars
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm mb-1 font-light">
                  {review.comment}
                </p>
              </div>
              <footer className="flex gap-2 items-center text-xs text-gray-500 pt-2">
                <time dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <button
                  className="flex items-center text-xs gap-1 hover:text-[#c96fff] transition-colors disabled:opacity-50"
                  onClick={() => handleLikeClick(review.id)}
                  disabled={isLiking === review.id}
                  aria-label={
                    review.isLiked ? "Unlike this review" : "Like this review"
                  }
                >
                  {isLiking === review.id ? (
                    <span className="w-4 h-4 flex items-center justify-center">
                      ...
                    </span>
                  ) : (
                    <Heart
                      className={`w-4 h-4 ${
                        review.isLiked
                          ? "fill-[#c96fff] text-[#c96fff]"
                          : "text-gray-500"
                      }`}
                    />
                  )}
                  <span
                    className={
                      review.isLiked ? "text-[#c96fff]" : "text-gray-500"
                    }
                  >
                    {review.currentLikes}
                  </span>
                </button>
              </footer>
            </article>
          ))}

          {/* Show All/Less button */}
          {vendor.reviewCount > 1 && (
            <button
              onClick={toggleShowAllReviews}
              className="bg-[#ebecee] rounded-xl w-full block text-center py-3 text-xs text-gray-500 font-semibold hover:bg-[#c96fff] hover:text-white transition-colors duration-300 mb-4"
              aria-label={
                showAllReviews
                  ? "Show less reviews"
                  : `See all ${vendor.reviewCount} reviews`
              }
            >
              {showAllReviews
                ? "Show less"
                : `See all ${vendor.reviewCount} reviews`}
            </button>
          )}

          {/* Pagination controls (only show when displaying all reviews and more than 5 reviews) */}
          {showAllReviews && reviews.length > reviewsPerPage && (
            <div className="flex justify-center items-center mt-2 gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-8 h-8 rounded-full ${
                      currentPage === number
                        ? "bg-[#6946e2] text-white"
                        : "hover:bg-gray-100"
                    }`}
                    aria-label={`Go to page ${number}`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="border-t pt-4 text-center">
          <p className="text-sm text-gray-500 mb-4">
            No reviews yet. Be the first to review!
          </p>
          <button
            onClick={() => {
              onAddReview(); // Call any existing handler
              router.push(
                `/vendor/vendors/view/${vendor.id}/booking-details?add-review=true`
              );
            }}
            className="text-sm text-[#6946e2] font-medium hover:underline"
            aria-label="Write a review"
          >
            Write a review
          </button>
        </div>
      )}
    </div>
  );
}
