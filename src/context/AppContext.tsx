import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_BRAND_INQUIRIES,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_PACKAGES,
  INITIAL_PORTFOLIO,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS,
  INITIAL_USERS,
} from '../data/mockData';
import {
  AppSettings,
  BrandInquiry,
  Coupon,
  CreatorBrandKit,
  CreatorPackage,
  CreatorSubscription,
  CustomerReview,
  NotificationItem,
  OrderItem,
  OrderStatus,
  PaymentStatus,
  PortfolioItem,
  User,
} from '../types';

interface CheckoutRequest {
  title: string;
  amount: number;
  serviceType: string;
  orderId?: string;
  subscriptionPlanId?: 'starter' | 'growth' | 'pro' | 'custom';
  packageId?: string;
  creditsToCredit?: number;
  isExpress?: boolean;
  expressFee?: number;
  baseAmount?: number;
  reducedTime?: string;
  metadata?: Record<string, any>;
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  loginAs: (role: 'owner' | 'editor' | 'creator' | 'guest') => void;
  loginWithCredentials: (email: string, pass: string, code2FA?: string) => { success: boolean; message: string; requires2FA?: boolean };
  logout: () => void;
  logoutAllDevices: () => void;
  
  // Settings
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;

  // Orders
  orders: OrderItem[];
  createOrder: (orderData: Partial<OrderItem>) => OrderItem;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  assignEditor: (orderId: string, editorId: string, editorName: string) => void;
  requestRevision: (orderId: string, notes: string, timecodes?: string) => void;
  deliverOrderVideo: (orderId: string, finalUrl: string) => void;
  uploadOrderPreview: (orderId: string, previewUrl: string) => void;
  updateOrderPayment: (orderId: string, status: PaymentStatus, method: string, paymentId: string) => void;
  
  // Real UTR Payment Verification
  validateUtr: (utr: string, currentOrderId?: string) => { isValid: boolean; message: string; network?: string; isDuplicate?: boolean };
  submitUtrPayment: (orderId: string, utrNumber: string, payerUpiId?: string, proofUrl?: string) => { success: boolean; message: string };
  confirmPaymentProcessing: (orderId: string, utrNumber: string, payerUpiId?: string, backendTaskId?: string) => void;
  acceptUtrPayment: (orderId: string, adminNotes?: string) => void;
  rejectUtrPayment: (orderId: string, reason: string) => void;

  // Subscriptions & Credits
  userSubscription: CreatorSubscription | null;
  subscribeToPlan: (planId: 'starter' | 'growth' | 'pro' | 'custom', paymentMethod: string, paymentId: string) => void;
  cancelSubscription: () => void;
  useCredits: (credits: number) => boolean;
  grantBonusCredits: (credits: number) => void;
  upgradeSubscription: (newPlanId: 'starter' | 'growth' | 'pro') => void;

  // Packages & Store
  packages: CreatorPackage[];
  updatePackage: (pkg: CreatorPackage) => void;

  // Brand Inquiries
  brandInquiries: BrandInquiry[];
  submitBrandInquiry: (inquiry: Omit<BrandInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateBrandInquiryStatus: (id: string, status: BrandInquiry['status'], quotedAmount?: number) => void;

  // Portfolio
  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  removePortfolioItem: (id: string) => void;

  // Reviews
  reviews: CustomerReview[];
  submitReview: (rev: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => void;
  toggleApproveReview: (id: string, approved: boolean) => void;

  // Coupons
  coupons: Coupon[];
  applyCoupon: (code: string, amount: number) => { valid: boolean; discount: number; finalAmount: number; message: string };
  addCoupon: (coupon: Coupon) => void;

  // Brand Kit
  brandKit: CreatorBrandKit;
  updateBrandKit: (kit: Partial<CreatorBrandKit>) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type: NotificationItem['type'], targetId?: string) => void;
  markNotificationsAsRead: () => void;

  // Checkout Modal Trigger
  activeCheckout: CheckoutRequest | null;
  openCheckout: (req: CheckoutRequest) => void;
  closeCheckout: () => void;

  // Active Receipt Modal
  activeReceipt: { order: OrderItem | null; paymentDetails: any } | null;
  openReceipt: (order: OrderItem, paymentDetails?: any) => void;
  closeReceipt: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage keys
  const STORAGE_PREFIX = 'HEH_V1_';

  // Load from local storage or defaults
  const loadState = <T,>(key: string, fallback: T): T => {
    try {
      const stored = localStorage.getItem(STORAGE_PREFIX + key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveState = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  };

  // State definitions
  const [users] = useState<User[]>(() => loadState('USERS', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadState('CURRENT_USER', INITIAL_USERS[0])); // Default to Himanshu (owner) for complete access inspection
  const [settings, setSettings] = useState<AppSettings>(() => loadState('SETTINGS', INITIAL_SETTINGS));
  const [orders, setOrders] = useState<OrderItem[]>(() => loadState('ORDERS', INITIAL_ORDERS));
  const [packages, setPackages] = useState<CreatorPackage[]>(() => loadState('PACKAGES', INITIAL_PACKAGES));
  const [brandInquiries, setBrandInquiries] = useState<BrandInquiry[]>(() => loadState('BRANDS', INITIAL_BRAND_INQUIRIES));
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => loadState('PORTFOLIO', INITIAL_PORTFOLIO));
  const [reviews, setReviews] = useState<CustomerReview[]>(() => loadState('REVIEWS', INITIAL_REVIEWS));
  const [coupons, setCoupons] = useState<Coupon[]>(() => loadState('COUPONS', INITIAL_COUPONS));
  
  const [userSubscription, setUserSubscription] = useState<CreatorSubscription | null>(() =>
    loadState('SUBSCRIPTION', {
      id: 'sub-active-1',
      userId: 'user-creator-1',
      planId: 'growth',
      planName: 'Growth Creator',
      monthlyFee: 699,
      totalMonthlyCredits: 75,
      usedCredits: 42,
      remainingCredits: 33,
      status: 'active',
      renewalDate: '25 October',
      startDate: '2025-02-25',
      autoRenew: true,
      billingHistory: [
        {
          id: 'bill-1',
          date: '25 Feb 2025',
          amount: 699,
          status: 'Successful',
          paymentId: 'PAY-SUB-8921',
        },
      ],
    })
  );

  const [brandKit, setBrandKit] = useState<CreatorBrandKit>(() =>
    loadState('BRAND_KIT', {
      creatorName: 'Rohan Mehra',
      instagram: '@rohan_fitlife',
      youtube: 'https://youtube.com/@rohanfitness',
      contentCategory: 'Fitness & Motivation',
      typicalVideoLength: '30-45 sec',
      preferredEditingStyle: 'High-energy kinetic cuts, punch zooms, bold text with sound effects',
      brandColors: ['#F59E0B', '#10B981', '#0F172A'],
      captionStyle: 'Alex Hormozi Yellow/White Pop-up with emojis',
      referenceVideos: 'https://instagram.com/reel/sample_motivation',
      preferredDeliveryTime: '24 Hours',
      savedInstructions: 'Always remove breathing pauses. Emphasize weight drops and drop 808 sub-bass on beat drops.',
    })
  );

  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadState('NOTIFICATIONS', [
      {
        id: 'notif-1',
        title: 'New Order Confirmed',
        message: 'Order #HEH-8941 is in progress. Vaibhav is editing.',
        type: 'order',
        date: '10 mins ago',
        read: false,
        targetId: 'ord-101',
      },
      {
        id: 'notif-2',
        title: 'Payment Received',
        message: '₹10 received via UPI (himanshu2121@fam) for Short Video Edit.',
        type: 'payment',
        date: '1 hour ago',
        read: false,
      },
    ])
  );

  const [activeCheckout, setActiveCheckout] = useState<CheckoutRequest | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<{ order: OrderItem | null; paymentDetails: any } | null>(null);

  // Sync to localStorage
  useEffect(() => saveState('CURRENT_USER', currentUser), [currentUser]);
  useEffect(() => saveState('SETTINGS', settings), [settings]);
  useEffect(() => saveState('ORDERS', orders), [orders]);
  useEffect(() => saveState('PACKAGES', packages), [packages]);
  useEffect(() => saveState('BRANDS', brandInquiries), [brandInquiries]);
  useEffect(() => saveState('PORTFOLIO', portfolio), [portfolio]);
  useEffect(() => saveState('REVIEWS', reviews), [reviews]);
  useEffect(() => saveState('COUPONS', coupons), [coupons]);
  useEffect(() => saveState('SUBSCRIPTION', userSubscription), [userSubscription]);
  useEffect(() => saveState('BRAND_KIT', brandKit), [brandKit]);
  useEffect(() => saveState('NOTIFICATIONS', notifications), [notifications]);

  // Notifications helper
  const addNotification = (title: string, message: string, type: NotificationItem['type'], targetId?: string) => {
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title,
      message,
      type,
      date: 'Just now',
      read: false,
      targetId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Auth methods
  const loginAs = (role: 'owner' | 'editor' | 'creator' | 'guest') => {
    if (role === 'guest') {
      setCurrentUser(null);
      return;
    }
    const matched = users.find((u) => u.role === (role === 'owner' ? 'owner' : role));
    if (matched) {
      setCurrentUser(matched);
    }
  };

  const loginWithCredentials = (email: string, pass: string, code2FA?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check Developer (Himanshu) login:
    // Only himanshu2121yt@gmail.com with password 'himanshu' can access
    if (cleanEmail === 'himanshu2121yt@gmail.com') {
      if (pass !== 'himanshu') {
        return {
          success: false,
          message: 'Access Denied: Incorrect developer password. Only authorized developer (Himanshu) can access this portal.',
        };
      }
      const developerUser = users.find((u) => u.email.toLowerCase() === 'himanshu2121yt@gmail.com') || INITIAL_USERS[0];
      setCurrentUser({
        ...developerUser,
        role: 'owner',
        isOwner: true,
        isDeveloper: true,
      });
      addNotification('Developer Session Started', 'Secure developer console unlocked for Himanshu.', 'order');
      return { success: true, message: 'Welcome back, Himanshu (Developer & Studio Founder)!' };
    }

    // Check Editor (Vaibhav) login:
    if (cleanEmail === 'vaibhav.editor@himanshuedits.com' || cleanEmail.startsWith('vaibhav')) {
      const editorUser = users.find((u) => u.role === 'editor') || INITIAL_USERS[1];
      setCurrentUser(editorUser);
      addNotification('Editor Workstation Online', 'Workstation session active for Vaibhav.', 'order');
      return { success: true, message: 'Welcome back, Vaibhav (Lead Video Editor)!' };
    }

    // Normal client/creator login
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (found) {
      setCurrentUser(found);
      return { success: true, message: `Logged in as ${found.name}` };
    }

    // Auto-create new client/creator account
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email: cleanEmail,
      role: 'creator',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const logoutAllDevices = () => {
    setCurrentUser(null);
    addNotification('Security Alert', 'All active sessions terminated.', 'order');
  };

  // Settings
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addNotification('Settings Updated', 'System & payment preferences saved.', 'payment');
  };

  // Orders
  const createOrder = (orderData: Partial<OrderItem>): OrderItem => {
    const orderNum = 'HEH-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderItem = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      customerName: orderData.customerName || (currentUser?.name ?? 'Guest Client'),
      customerEmail: orderData.customerEmail || (currentUser?.email ?? 'client@example.com'),
      whatsapp: orderData.whatsapp || '+919876543210',
      instagram: orderData.instagram || '@creator',
      service: orderData.service || 'Short Video Editing',
      packageTitle: orderData.packageTitle || 'Quick Edit',
      numberOfVideos: orderData.numberOfVideos || 1,
      videoLength: orderData.videoLength || '30-60 sec',
      editingStyle: orderData.editingStyle || 'Modern Creator Style',
      deadline: orderData.deadline || '48 Hours',
      budget: orderData.budget || 10,
      finalPrice: orderData.finalPrice || orderData.budget || 10,
      referenceLink: orderData.referenceLink || '',
      uploadedFiles: orderData.uploadedFiles || [],
      additionalInstructions: orderData.additionalInstructions || '',
      status: 'Request Received',
      paymentStatus: 'Pending',
      assignedEditorId: 'user-editor-1',
      assignedEditorName: 'Vaibhav',
      assignedDeveloperName: 'Himanshu',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      revisions: [],
      timeline: [
        {
          step: 'Request Received',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: orderData.isExpressDelivery
            ? 'Project registered in Priority Queue! Faster video delivery (+₹50 charges) selected: turnaround reduced to 12–24 Hours.'
            : 'Project request registered in system (Standard turnaround: 48 Hours).',
        },
      ],
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    addNotification('New Order Received', `Order #${orderNum} for ${newOrder.service} created.`, 'order', newOrder.id);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newTimeline = [
          ...o.timeline,
          {
            step: status,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: note || `Order updated to ${status}`,
          },
        ];
        return {
          ...o,
          status,
          updatedAt: new Date().toISOString(),
          timeline: newTimeline,
        };
      })
    );
    addNotification('Order Status Changed', `Order #${orderId} moved to ${status}.`, 'order', orderId);
  };

  const assignEditor = (orderId: string, editorId: string, editorName: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          assignedEditorId: editorId,
          assignedEditorName: editorName,
          status: o.status === 'Request Received' ? 'Confirmed' : o.status,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...o.timeline,
            {
              step: 'Confirmed',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: `Assigned to editor ${editorName}.`,
            },
          ],
        };
      })
    );
    addNotification('Editor Assigned', `${editorName} assigned to project #${orderId}.`, 'order', orderId);
  };

  const requestRevision = (orderId: string, notes: string, timecodes?: string) => {
    const revId = 'rev-' + Date.now();
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          status: 'Revision',
          revisions: [
            ...o.revisions,
            {
              id: revId,
              requestedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              notes,
              timecodes,
              resolved: false,
            },
          ],
          timeline: [
            ...o.timeline,
            {
              step: 'Revision',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: `Revision submitted: ${notes.slice(0, 40)}...`,
            },
          ],
        };
      })
    );
    addNotification('Revision Requested', `Customer requested changes for #${orderId}.`, 'revision', orderId);
  };

  const deliverOrderVideo = (orderId: string, finalUrl: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          finalVideoUrl: finalUrl,
          status: 'Completed',
          timeline: [
            ...o.timeline,
            {
              step: 'Completed',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: 'Final render approved and delivered to client!',
            },
          ],
        };
      })
    );
    addNotification('Order Completed 🎉', `Final video ready for download on #${orderId}.`, 'order', orderId);
  };

  const uploadOrderPreview = (orderId: string, previewUrl: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          previewVideoUrl: previewUrl,
          status: 'Review',
          timeline: [
            ...o.timeline,
            {
              step: 'Review',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: 'Draft preview uploaded for client review.',
            },
          ],
        };
      })
    );
    addNotification('Draft Preview Ready', `Order #${orderId} has a preview ready for review.`, 'order', orderId);
  };

  const updateOrderPayment = (orderId: string, status: PaymentStatus, method: string, paymentId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          paymentStatus: status,
          paymentMethod: method,
          paymentId,
          status: status === 'Successful' ? (o.status === 'Request Received' ? 'Confirmed' : o.status) : o.status,
        };
      })
    );
    if (status === 'Successful') {
      addNotification('Payment Confirmed', `Payment of order #${orderId} verified successfully via ${method}.`, 'payment', orderId);
    }
  };

  // Real UTR Payment Verification
  const validateUtr = (utr: string, currentOrderId?: string) => {
    const clean = utr.trim();
    if (!clean) {
      return { isValid: false, message: 'Please enter the 12-digit UTR / UPI Reference Number.' };
    }

    // Standard Indian UPI UTR is 12 numeric digits
    const is12Digits = /^\d{12}$/.test(clean);
    // Some IMPS / NEFT bank transfer references are 12 to 22 alphanumeric characters
    const isBankRef = /^[A-Za-z0-9]{12,22}$/.test(clean);

    if (!is12Digits && !isBankRef) {
      return {
        isValid: false,
        message: 'Invalid UTR format. Standard UPI reference must be 12 digits (e.g., 428919283741).',
      };
    }

    // Bogus/dummy patterns check
    const bogusPatterns = [
      '123456789012',
      '000000000000',
      '111111111111',
      '222222222222',
      '333333333333',
      '444444444444',
      '555555555555',
      '666666666666',
      '777777777777',
      '888888888888',
      '999999999999',
      '121212121212',
      '012345678901',
    ];
    if (bogusPatterns.includes(clean)) {
      return {
        isValid: false,
        message: 'Dummy / placeholder UTR detected. Please submit your genuine bank UTR number.',
      };
    }

    // Duplicate check across existing orders to prevent double-spending/spoofing
    const duplicate = orders.find(
      (o) => o.utrNumber === clean && o.id !== currentOrderId && o.paymentStatus !== 'Rejected'
    );
    if (duplicate) {
      return {
        isValid: false,
        isDuplicate: true,
        message: `Fraud warning: UTR ${clean} was already recorded for Order #${duplicate.orderNumber}. Duplicate UTRs are rejected.`,
      };
    }

    // Identify Indian banking gateway from RRN prefix
    let network = 'NPCI UPI Network';
    const firstDigit = clean[0];
    if (firstDigit === '4') network = 'State Bank / HDFC / Paytm UPI';
    else if (firstDigit === '5') network = 'ICICI Bank / Axis Bank UPI';
    else if (firstDigit === '3') network = 'Kotak Mahindra / Yes Bank';
    else if (firstDigit === '6') network = 'Bank of Baroda / PNB / Canara';

    return {
      isValid: true,
      network,
      message: `Valid 12-digit UTR (${network})`,
    };
  };

  const submitUtrPayment = (
    orderId: string,
    utrNumber: string,
    payerUpiId?: string,
    proofUrl?: string
  ) => {
    const val = validateUtr(utrNumber, orderId);
    if (!val.isValid) {
      return { success: false, message: val.message };
    }

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newTimeline = [
          ...o.timeline,
          {
            step: o.status,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: `UTR ${utrNumber} submitted by client. Awaiting Himanshu's bank verification.`,
          },
        ];
        return {
          ...o,
          paymentStatus: 'Under Verification' as PaymentStatus,
          paymentMethod: `UPI (UTR: ${utrNumber})`,
          paymentId: `UTR-${utrNumber}`,
          utrNumber,
          payerUpiId: payerUpiId || o.payerUpiId,
          paymentProofUrl: proofUrl || o.paymentProofUrl,
          utrSubmittedAt: new Date().toISOString(),
          paymentRejectionReason: undefined,
          updatedAt: new Date().toISOString(),
          timeline: newTimeline,
        };
      })
    );

    addNotification(
      'Payment Verification Pending',
      `UTR #${utrNumber} submitted for Order #${orderId}. Himanshu has received the bank settlement alert.`,
      'payment',
      orderId
    );

    return {
      success: true,
      message: `UTR ${utrNumber} submitted! Himanshu will verify credit in his bank statement.`,
    };
  };

  const confirmPaymentProcessing = (
    orderId: string,
    utrNumber: string,
    payerUpiId?: string,
    backendTaskId?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newTimeline = [
          ...o.timeline,
          {
            step: 'Processing' as OrderStatus,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: `Client confirmed UTR ${utrNumber}. Order status set to Processing. Backend validation task ${backendTaskId || 'queued'} triggered.`,
          },
        ];
        return {
          ...o,
          status: 'Processing' as OrderStatus,
          paymentStatus: 'Processing' as PaymentStatus,
          paymentMethod: `UPI (UTR: ${utrNumber})`,
          paymentId: `UTR-${utrNumber}`,
          utrNumber,
          payerUpiId: payerUpiId || o.payerUpiId,
          utrSubmittedAt: new Date().toISOString(),
          paymentRejectionReason: undefined,
          updatedAt: new Date().toISOString(),
          timeline: newTimeline,
        };
      })
    );

    addNotification(
      'Order Status: Processing',
      `Order #${orderId} moved to Processing upon client-side confirmation. Backend validation task initiated for UTR ${utrNumber}.`,
      'payment',
      orderId
    );
  };

  const acceptUtrPayment = (orderId: string, adminNotes?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newTimeline = [
          ...o.timeline,
          {
            step: 'Confirmed' as OrderStatus,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: `✓ Real Payment Verified & Accepted by Himanshu. Bank credit confirmed! ${adminNotes || ''}`,
          },
        ];
        return {
          ...o,
          paymentStatus: 'Successful' as PaymentStatus,
          status: o.status === 'Request Received' ? 'Confirmed' : o.status,
          paymentVerifiedBy: 'Himanshu (Owner)',
          paymentVerifiedAt: new Date().toISOString(),
          paymentRejectionReason: undefined,
          updatedAt: new Date().toISOString(),
          timeline: newTimeline,
        };
      })
    );

    addNotification(
      'Payment Accepted 🎉',
      `Payment for Order #${orderId} verified and confirmed in bank account by Himanshu. Your video editing is now active!`,
      'payment',
      orderId
    );
  };

  const rejectUtrPayment = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newTimeline = [
          ...o.timeline,
          {
            step: o.status,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: `✕ Payment Verification Rejected by Himanshu: ${reason}`,
          },
        ];
        return {
          ...o,
          paymentStatus: 'Rejected' as PaymentStatus,
          paymentRejectionReason: reason,
          updatedAt: new Date().toISOString(),
          timeline: newTimeline,
        };
      })
    );

    addNotification(
      'Payment Verification Alert ⚠️',
      `UTR for Order #${orderId} was rejected by Himanshu: ${reason}. Please update your transaction reference.`,
      'payment',
      orderId
    );
  };

  // Subscriptions & Credits
  const subscribeToPlan = (planId: 'starter' | 'growth' | 'pro' | 'custom', paymentMethod: string, paymentId: string) => {
    const plansConfig = {
      starter: { name: 'Starter Creator', fee: 299, credits: 30 },
      growth: { name: 'Growth Creator', fee: 699, credits: 75 },
      pro: { name: 'Pro Creator', fee: 1499, credits: 150 },
      custom: { name: 'Custom Creator', fee: 2999, credits: 300 },
    };
    const sel = plansConfig[planId];
    const newSub: CreatorSubscription = {
      id: 'sub-' + Date.now(),
      userId: currentUser?.id || 'user-creator-1',
      planId,
      planName: sel.name,
      monthlyFee: sel.fee,
      totalMonthlyCredits: sel.credits,
      usedCredits: 0,
      remainingCredits: sel.credits,
      status: 'active',
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      startDate: new Date().toISOString(),
      autoRenew: true,
      billingHistory: [
        {
          id: 'bill-' + Date.now(),
          date: new Date().toLocaleDateString(),
          amount: sel.fee,
          status: 'Successful',
          paymentId,
        },
      ],
    };
    setUserSubscription(newSub);
    addNotification('Subscription Activated 🎉', `Welcome to ${sel.name}! ${sel.credits} video credits added.`, 'subscription');
  };

  const cancelSubscription = () => {
    if (!userSubscription) return;
    setUserSubscription({ ...userSubscription, autoRenew: false, status: 'cancelled' });
    addNotification('Subscription Cancelled', 'Auto-renew turned off. Remaining credits valid until billing cycle.', 'subscription');
  };

  const useCredits = (credits: number): boolean => {
    if (!userSubscription || userSubscription.remainingCredits < credits) {
      return false;
    }
    setUserSubscription({
      ...userSubscription,
      usedCredits: userSubscription.usedCredits + credits,
      remainingCredits: userSubscription.remainingCredits - credits,
    });
    return true;
  };

  const grantBonusCredits = (credits: number) => {
    if (!userSubscription) return;
    setUserSubscription({
      ...userSubscription,
      totalMonthlyCredits: userSubscription.totalMonthlyCredits + credits,
      remainingCredits: userSubscription.remainingCredits + credits,
    });
    addNotification('Bonus Credits Added!', `+${credits} editing credits granted to your account.`, 'subscription');
  };

  const upgradeSubscription = (newPlanId: 'starter' | 'growth' | 'pro') => {
    const plansConfig = {
      starter: { name: 'Starter Creator', fee: 299, credits: 30 },
      growth: { name: 'Growth Creator', fee: 699, credits: 75 },
      pro: { name: 'Pro Creator', fee: 1499, credits: 150 },
    };
    const sel = plansConfig[newPlanId];
    if (!userSubscription) return;
    setUserSubscription({
      ...userSubscription,
      planId: newPlanId,
      planName: sel.name,
      monthlyFee: sel.fee,
      totalMonthlyCredits: sel.credits,
      remainingCredits: userSubscription.remainingCredits + (sel.credits - userSubscription.totalMonthlyCredits),
    });
    addNotification('Plan Upgraded!', `Successfully moved to ${sel.name}.`, 'subscription');
  };

  // Packages
  const updatePackage = (pkg: CreatorPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === pkg.id ? pkg : p)));
    addNotification('Package Updated', `Pricing for ${pkg.title} modified.`, 'payment');
  };

  // Brands
  const submitBrandInquiry = (inquiry: Omit<BrandInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newBrand: BrandInquiry = {
      id: 'brand-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'New Proposal',
      ...inquiry,
    };
    setBrandInquiries((prev) => [newBrand, ...prev]);
    addNotification('New Brand Proposal Received', `Proposal from ${inquiry.companyName} submitted.`, 'brand', newBrand.id);
  };

  const updateBrandInquiryStatus = (id: string, status: BrandInquiry['status'], quotedAmount?: number) => {
    setBrandInquiries((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, quotedAmount: quotedAmount ?? b.quotedAmount } : b))
    );
    addNotification('Brand Inquiry Updated', `Brand campaign status updated to ${status}.`, 'brand', id);
  };

  // Portfolio
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      id: 'port-' + Date.now(),
      ...item,
    };
    setPortfolio((prev) => [newItem, ...prev]);
    addNotification('Portfolio Updated', `New showcase video "${item.title}" added.`, 'order');
  };

  const removePortfolioItem = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  // Reviews
  const submitReview = (rev: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => {
    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      approved: false, // Requires admin approval
      ...rev,
    };
    setReviews((prev) => [newRev, ...prev]);
    addNotification('Review Submitted', 'Thank you! Your review has been submitted for approval.', 'order');
  };

  const toggleApproveReview = (id: string, approved: boolean) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
  };

  // Coupons
  const applyCoupon = (code: string, amount: number) => {
    const clean = code.trim().toUpperCase();
    if (coupons.length === 0) {
      return {
        valid: false,
        discount: 0,
        finalAmount: amount,
        message: 'No active coupons yet. Custom coupons can be created in the Admin Dashboard by Himanshu.',
      };
    }
    const found = coupons.find((c) => c.code === clean && c.active);
    if (!found) {
      return { valid: false, discount: 0, finalAmount: amount, message: 'Invalid or expired coupon code.' };
    }
    if (amount < found.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        finalAmount: amount,
        message: `Coupon requires minimum order value of ₹${found.minOrderValue}.`,
      };
    }
    const rawDiscount = (amount * found.discountPercentage) / 100;
    const discount = Math.min(rawDiscount, found.maxDiscount);
    const finalAmount = Math.max(0, amount - discount);
    return {
      valid: true,
      discount: Math.round(discount),
      finalAmount: Math.round(finalAmount),
      message: `Coupon "${clean}" applied! Saved ₹${Math.round(discount)}.`,
    };
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
  };

  // Brand Kit
  const updateBrandKit = (kit: Partial<CreatorBrandKit>) => {
    setBrandKit((prev) => ({ ...prev, ...kit }));
    addNotification('Brand Kit Saved', 'Your visual style and preferences updated.', 'order');
  };

  // Checkout modal
  const openCheckout = (req: CheckoutRequest) => setActiveCheckout(req);
  const closeCheckout = () => setActiveCheckout(null);

  // Receipt modal
  const openReceipt = (order: OrderItem, paymentDetails?: any) => setActiveReceipt({ order, paymentDetails });
  const closeReceipt = () => setActiveReceipt(null);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        loginAs,
        loginWithCredentials,
        logout,
        logoutAllDevices,
        settings,
        updateSettings,
        orders,
        createOrder,
        updateOrderStatus,
        assignEditor,
        requestRevision,
        deliverOrderVideo,
        uploadOrderPreview,
        updateOrderPayment,
        validateUtr,
        submitUtrPayment,
        confirmPaymentProcessing,
        acceptUtrPayment,
        rejectUtrPayment,
        userSubscription,
        subscribeToPlan,
        cancelSubscription,
        useCredits,
        grantBonusCredits,
        upgradeSubscription,
        packages,
        updatePackage,
        brandInquiries,
        submitBrandInquiry,
        updateBrandInquiryStatus,
        portfolio,
        addPortfolioItem,
        removePortfolioItem,
        reviews,
        submitReview,
        toggleApproveReview,
        coupons,
        applyCoupon,
        addCoupon,
        brandKit,
        updateBrandKit,
        notifications,
        addNotification,
        markNotificationsAsRead,
        activeCheckout,
        openCheckout,
        closeCheckout,
        activeReceipt,
        openReceipt,
        closeReceipt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
