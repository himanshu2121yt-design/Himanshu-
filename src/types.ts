export type UserRole = 'owner' | 'developer' | 'admin' | 'editor' | 'creator' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  instagram?: string;
  phone?: string;
  isOwner?: boolean;
  isDeveloper?: boolean;
  twoFactorEnabled?: boolean;
  createdAt: string;
}

export type OrderStatus =
  | 'Request Received'
  | 'Processing'
  | 'Confirmed'
  | 'Editing'
  | 'Review'
  | 'Revision'
  | 'Completed';

export type PaymentStatus =
  | 'Pending'
  | 'Processing'
  | 'Under Verification'
  | 'Successful'
  | 'Failed'
  | 'Rejected'
  | 'Refunded';

export type ServiceType =
  | 'Short Video Editing'
  | 'Advanced Video Editing'
  | 'Brand Promotion'
  | 'Creator Subscription'
  | 'Creator Package';

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  whatsapp: string;
  instagram: string;
  service: ServiceType;
  packageTitle?: string;
  numberOfVideos: number;
  videoLength: string;
  editingStyle: string;
  deadline: string;
  budget: number;
  finalPrice?: number;
  referenceLink?: string;
  uploadedFiles: {
    name: string;
    size: string;
    url: string;
    type: string;
  }[];
  additionalInstructions?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentId?: string;
  utrNumber?: string;
  payerUpiId?: string;
  paymentProofUrl?: string;
  utrSubmittedAt?: string;
  paymentVerifiedBy?: string;
  paymentVerifiedAt?: string;
  paymentRejectionReason?: string;
  bankReferenceNumber?: string;
  assignedEditorId?: string;
  assignedEditorName?: string;
  assignedDeveloperName?: string;
  isExpressDelivery?: boolean;
  expressFee?: number;
  reducedTime?: string;
  createdAt: string;
  updatedAt: string;
  finalVideoUrl?: string;
  previewVideoUrl?: string;
  revisions: {
    id: string;
    requestedAt: string;
    notes: string;
    timecodes?: string;
    resolved: boolean;
  }[];
  timeline: {
    step: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  usedCredits?: number;
}

export interface UtrVerificationRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  whatsapp: string;
  instagram?: string;
  amount: number;
  service: string;
  utrNumber: string;
  payerUpiId?: string;
  proofUrl?: string;
  submittedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  bankMatchScore?: number;
  network?: string;
}

export interface CreatorSubscription {
  id: string;
  userId: string;
  planId: 'starter' | 'growth' | 'pro' | 'custom';
  planName: string;
  monthlyFee: number;
  totalMonthlyCredits: number;
  usedCredits: number;
  remainingCredits: number;
  status: 'active' | 'cancelled' | 'payment_failed' | 'paused';
  renewalDate: string;
  startDate: string;
  autoRenew: boolean;
  billingHistory: {
    id: string;
    date: string;
    amount: number;
    status: PaymentStatus;
    paymentId: string;
  }[];
}

export interface CreatorPackage {
  id: string;
  title: string;
  tagline: string;
  videosCount: number;
  startingPrice: number;
  popular?: boolean;
  features: string[];
}

export interface BrandInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  whatsapp: string;
  instagramOrWebsite: string;
  productService: string;
  campaignType: string;
  numberOfVideos: number;
  campaignDeadline: string;
  budget: string;
  requirements: string;
  briefFileName?: string;
  briefFileUrl?: string;
  status: 'New Proposal' | 'Under Review' | 'Quote Sent' | 'Approved' | 'Declined' | 'Completed';
  quotedAmount?: number;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category:
    | 'Instagram Reels'
    | 'YouTube Shorts'
    | 'Brand Promotions'
    | 'Product Videos'
    | 'Before/After Edits'
    | 'Creative Edits';
  description: string;
  views?: string;
  likes?: string;
  retention?: string;
  videoUrl: string;
  thumbnailUrl: string;
  beforeUrl?: string;
  afterUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  instagram?: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  approved: boolean;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minOrderValue: number;
  active: boolean;
  validTill: string;
}

export interface AppSettings {
  appName: string;
  tagline: string;
  creatorName: string;
  instagramHandle: string;
  whatsappNumber: string;
  emailAddress: string;
  youtubeUrl: string;
  telegramUrl: string;
  upiId: string;
  bankAccountName: string;
  qrCodeUrl?: string;
  autoVerifyUtr?: boolean;
  upiEnabled: boolean;
  razorpayEnabled: boolean;
  cardsEnabled: boolean;
  netBankingEnabled: boolean;
  baseShortVideoPrice: number;
  expressDeliveryCharge: number;
  expressReducedTime: string;
  brandMinBudget: number;
  creditRules: {
    basicReel: number;
    advancedReel: number;
    heavyMotionGraphics: number;
  };
}

export interface CreatorBrandKit {
  creatorName: string;
  instagram: string;
  youtube?: string;
  contentCategory: string;
  typicalVideoLength: string;
  preferredEditingStyle: string;
  brandColors: string[];
  captionStyle: string;
  referenceVideos: string;
  preferredDeliveryTime: string;
  savedInstructions: string;
  logoUrl?: string;
  watermarkUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'subscription' | 'revision' | 'brand';
  date: string;
  read: boolean;
  targetId?: string;
}
