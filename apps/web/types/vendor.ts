export interface Vendor {
  id: string;
  name: string;
  icon: string;
  category: string;
  locationLatitude?: number;
  locationLongitude?: number;

  location: string; // Human-readable address
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  verified: boolean;
  price: string;
  pricePerDay: number; // Added for calculations
  reviews: Review[];
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  services: string[];
  companyName: string;
  businessNumber: string;
  storeLocation: string;
  verifiedDate: string;
  storeAddress: string;
  paymentMethods: string[]; // Added
  cancellationPolicy: string; // Added
  minBookingDays: number; // Added
}

// Update your Review type to look like this:
export interface Review {
  userAvatar: string;
  id: string;
  userName: string;
  content: string;
  comment: string;
  date: string;
  likes: number;
  rating: number;
  userImage: string;
  isLiked?: boolean;
  currentLikes?: number;
}
export interface Booking {
  id: string;
  eventName: string;
  eventDescription: string; // Added
  dates: string;
  startDate: string; // Added
  endDate: string; // Added
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  milestones: Milestone[];
  paymentMethod?: string; // Added
  specialRequests?: string; // Added
}
export interface Milestone {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "pending" | "paid" | "completed" | "refunded";
}

export interface Offer {
  id: string;
  amount: number;
  message: string;
  status: "pending" | "accepted" | "rejected" | "countered";
  submittedDate: string;
  daysRequested: number; // Added
  eventType: string; // Added
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  isRead: boolean; // Added
}

// New interfaces for payment
export interface PaymentMethod {
  id: string;
  type: "credit_card" | "paypal" | "bank_transfer";
  details: object;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed" | "refunded";
  method: string;
  bookingId: string;
}


