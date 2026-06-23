import React, { useState } from "react";
import Image from "next/image";

interface ReviewsCardProps {
  rating: number;
  reviewCount: number;
}

export default function ReviewsCard({ rating, reviewCount }: ReviewsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = [
    {
      name: "Adam Sandler",
      date: "28 Nov, 2022",
      comment:
        "It was a great service and overall experience working with them.",
      avatar: "/noavatar.png",
      stars: 5,
    },
    {
      name: "Adam Sandler",
      date: "28 Nov, 2022",
      comment:
        "It was a great service and overall experience working with them.",
      avatar: "/noavatar.png",
      stars: 5,
    },
    {
      name: "Adam Sandler",
      date: "28 Nov, 2022",
      comment:
        "It was a great service and overall experience working with them.",
      avatar: "/noavatar.png",
      stars: 5,
    },
    {
      name: "Adam Sandler",
      date: "28 Nov, 2022",
      comment:
        "It was a great service and overall experience working with them.",
      avatar: "/noavatar.png",
      stars: 5,
    },
  ];

  // Function to render star ratings
  const renderStars = (count: number) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <>
      <div className="rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-700">
              Reviews ({reviewCount})
            </h3>
            <span className="font-bold text-gray-700">
              <span className="text-[#cc77fe] text-lg">★</span>
              {rating}
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-gray-600 hover:underline"
          >
            View all &gt;
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="bg-[#f9f9f9] p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium text-sm text-gray-800">
                    {review.name}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              <div className="text-[#cc77fe] text-sm mb-1">
                {renderStars(review.stars)}
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm top-[-80px]"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="bg-white rounded-xl relative w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl mx-4 top-[-40px] lg:left-[13%]">
            <div className="sticky top-0 bg-zinc-100 p-5 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-700 text-xl">
                  Reviews ({reviewCount})
                </h3>
                <span className="font-bold text-gray-700 text-xl">
                  <span className="text-[#cc77fe] text-xl">★</span>
                  {rating}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 bg-red-200 rounded-lg text-red-600 p-1 hover:bg-red-300 hover:text-red-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5 bg-gray-100 space-y-5 overflow-y-auto max-h-[calc(80vh-80px)]">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-5 last:border-0 bg-[#f9f9f9] p-3 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#f9f9f9] rounded-full overflow-hidden">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {review.name}
                        </p>
                        <p className="text-[#cc77fe]">
                          {renderStars(review.stars)}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
