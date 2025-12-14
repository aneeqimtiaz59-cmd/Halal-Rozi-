
import { LanguageContent, Product } from "../types";

export const TEXTS: LanguageContent = {
  welcome: { en: "Halal Rozi", ur: "حلال روزی" },
  subtitle: { en: "Earn Halal Income by Reselling", ur: "ری سیلنگ سے حلال کمائی کریں" },
  developer: { en: "Developed by M Aneeq Imtiaz", ur: "ڈویلپر: محمد انیق امتیاز" },
  login: { en: "Login", ur: "لاگ ان کریں" },
  googleLogin: { en: "Continue with Google", ur: "گوگل کے ساتھ جاری رکھیں" },
  phone: { en: "Phone Number", ur: "فون نمبر" },
  otp: { en: "Enter OTP", ur: "او ٹی پی درج کریں" },
  sendingOtp: { en: "Sending OTP...", ur: "OTP بھیجا جا رہا ہے..." },
  detectingOtp: { en: "Auto-detecting OTP...", ur: "خودکار OTP شناخت..." },
  adminLogin: { en: "Admin Portal", ur: "ایڈمن پورٹل" },
  userLogin: { en: "User Login", ur: "صارف لاگ ان" },
  accessKey: { en: "Invite Code / Access Key", ur: "انوائٹ کوڈ" },
  accessKeyPlaceholder: { en: "Enter Secret Key", ur: "خفیہ کوڈ درج کریں" },
  
  // Auth Constants
  password: { en: "Password", ur: "پاس ورڈ" },
  createAccount: { en: "Create Account", ur: "اکاؤنٹ بنائیں" },
  haveAccount: { en: "Already have an account?", ur: "کیا پہلے سے اکاؤنٹ موجود ہے؟" },
  noAccount: { en: "Don't have an account?", ur: "اکاؤنٹ نہیں ہے؟" },
  invalidPhone: { en: "Enter valid PK number (03...)", ur: "درست پاکستانی نمبر درج کریں" },
  signup: { en: "Sign Up", ur: "سائن اپ" },
  adminName: { en: "Admin Name", ur: "ایڈمن کا نام" },
  adminUsername: { en: "Username", ur: "یوزر نام" },
  adminPhone: { en: "Admin Phone", ur: "ایڈمن کا فون" },
  pleaseWait: { en: "Please Wait...", ur: "براہ کرم انتظار کریں..." },
  accessDashboard: { en: "Access Dashboard", ur: "ڈیش بورڈ تک رسائی حاصل کریں" },
  verifying: { en: "Verifying...", ur: "تصدیق ہو رہی ہے..." },
  
  // Navigation & General
  home: { en: "Home", ur: "ہوم" },
  shop: { en: "Products", ur: "پروڈکٹس" },
  cart: { en: "Bag", ur: "بیگ" },
  orders: { en: "Orders", ur: "آرڈرز" },
  profile: { en: "Profile", ur: "پروفائل" },
  admin: { en: "Admin", ur: "ایڈمن" },
  featured: { en: "Featured", ur: "نمایاں" },
  seeAll: { en: "See All", ur: "سب دیکھیں" },
  
  // Product & Cart
  addToCart: { en: "Add to Bag", ur: "بیگ میں ڈالیں" },
  placeOrder: { en: "Order Now", ur: "آرڈر کریں" },
  share: { en: "Share", ur: "شیئر کریں" },
  buyNow: { en: "Buy Now", ur: "ابھی خریدیں" },
  total: { en: "Total Amount", ur: "کل رقم" },
  customerPrice: { en: "Customer Price", ur: "کسٹمر کی قیمت" },
  wholesale: { en: "Wholesale", ur: "ہول سیل" },
  yourProfit: { en: "Your Profit", ur: "آپ کا منافع" },
  profitEarned: { en: "Profit Earned", ur: "کمایا گیا منافع" },
  enterProfit: { en: "Enter Profit (Rs)", ur: "منافع درج کریں" },
  checkout: { en: "Checkout", ur: "چیک آؤٹ" },
  emptyCart: { en: "Your bag is empty", ur: "آپ کا بیگ خالی ہے" },
  emptyCartDesc: { en: "Looks like you haven't added anything yet.", ur: "لگتا ہے آپ نے ابھی تک کچھ شامل نہیں کیا۔" },
  browseProducts: { en: "Browse Products", ur: "پروڈکٹس دیکھیں" },
  search: { en: "Search products...", ur: "مصنوعات تلاش کریں..." },
  
  // Dashboard & Admin
  dashboard: { en: "Dashboard", ur: "ڈیش بورڈ" },
  createProduct: { en: "Add Product", ur: "پروڈکٹ شامل کریں" },
  aiHelp: { en: "AI Description", ur: "AI تفصیل" },
  logout: { en: "Logout", ur: "لاگ آؤٹ" },
  name: { en: "Product Name", ur: "پروڈکٹ کا نام" },
  price: { en: "Price (PKR)", ur: "قیمت (روپے)" },
  description: { en: "Description", ur: "تفصیل" },
  category: { en: "Category", ur: "زمرہ" },
  submit: { en: "Save Product", ur: "محفوظ کریں" },
  myStore: { en: "My Store", ur: "میرا اسٹور" },
  incomingOrders: { en: "Incoming Orders", ur: "نئے آرڈرز" },
  revenueOverview: { en: "Revenue Overview", ur: "آمدنی کا جائزہ" },
  totalSoldItems: { en: "Total Sold Items", ur: "کل فروخت شدہ اشیاء" },
  avgOrderValue: { en: "Avg. Order Value", ur: "اوسط آرڈر ویلیو" },
  businessStatus: { en: "Business Status", ur: "کاروباری حیثیت" },
  
  // Delivery & Product Details
  delivery: { en: "Standard Delivery", ur: "اسٹینڈرڈ ڈلیوری" },
  deliveryPrice: { en: "Rs 90", ur: "90 روپے" },
  inStock: { en: "In Stock", ur: "اسٹاک میں ہے" },
  businessName: { en: "Business Name", ur: "کاروبار کا نام" },
  resellMode: { en: "Sell to Customer", ur: "کسٹمر کو بیچیں" },
  personalMode: { en: "Buy for Myself", ur: "اپنے لیے خریدیں" },
  personalBuy: { en: "Personal Buy", ur: "ذاتی خریداری" },
  senderName: { en: "Sender / Business Name", ur: "بھیجنے والے کا نام" },
  
  // Checkout & Order Summary
  customerDetails: { en: "Customer Details", ur: "کسٹمر کی تفصیلات" },
  myDetails: { en: "My Details", ur: "میری تفصیلات" },
  fullName: { en: "Full Name", ur: "پورا نام" },
  address: { en: "Full Address", ur: "مکمل پتہ" },
  city: { en: "City", ur: "شہر" },
  paymentMethod: { en: "Payment Method", ur: "ادائیگی کا طریقہ" },
  cod: { en: "Cash on Delivery", ur: "کیش آن ڈیلیوری" },
  confirmOrder: { en: "Place Order", ur: "آرڈر کنفرم کریں" },
  orderSummary: { en: "Order Summary", ur: "آرڈر کا خلاصہ" },
  itemsTotal: { en: "Items Total", ur: "اشیاء کا کل" },
  deliveryCharges: { en: "Delivery Charges", ur: "ڈلیوری چارجز" },
  totalPayable: { en: "Total Payable", ur: "کل قابل ادائیگی" },
  totalCollect: { en: "Total to Collect", ur: "کل وصولی" },
  receiverName: { en: "Receiver Name", ur: "وصول کنندہ کا نام" },
  
  // Reviews & Info
  reviews: { en: "Reviews", ur: "تبصرے" },
  sold: { en: "Sold", ur: "فروخت" },
  questions: { en: "Questions about this product", ur: "سوالات" },
  returnPolicy: { en: "7 Days Returns", ur: "7 دن میں واپسی" },
  warranty: { en: "Warranty not available", ur: "وارنٹی دستیاب نہیں" },
  chat: { en: "Chat", ur: "چیٹ" },
  overview: { en: "Product Overview", ur: "پروڈکٹ کا جائزہ" },
  buyOptionTitle: { en: "Who are you buying for?", ur: "آپ کس کے لیے خرید رہے ہیں؟" },
  buyForSelf: { en: "For Myself", ur: "اپنے لیے" },
  buyForCustomer: { en: "For Customer (Resell)", ur: "کسٹمر کے لیے (ری سیل)" },
  paymentDetails: { en: "Payment Details", ur: "ادائیگی کی تفصیلات" },
  bankName: { en: "Bank / Wallet Name", ur: "بینک / والٹ کا نام" },
  accountTitle: { en: "Account Title", ur: "اکاؤنٹ ٹائٹل" },
  accountNumber: { en: "Account Number", ur: "اکاؤنٹ نمبر" },
  saveDetails: { en: "Save Details", ur: "تفصیلات محفوظ کریں" },
  profitAccountDesc: { en: "Add account to receive your profits", ur: "اپنا منافع حاصل کرنے کے لیے اکاؤنٹ شامل کریں" },
  
  // Order Tabs
  myOrders: { en: "My Orders", ur: "میرے آرڈرز" },
  tabAll: { en: "All", ur: "تمام" },
  tabPersonal: { en: "Personal", ur: "ذاتی خریداری" },
  tabResell: { en: "Reselling", ur: "ری سیلنگ" },
  tabDelivered: { en: "Delivered", ur: "ڈیلیور ہو چکے" },
  statusPending: { en: "Pending", ur: "زیر التواء" },
  statusDelivered: { en: "Delivered", ur: "مکمل" },
  markDelivered: { en: "Mark as Delivered", ur: "ڈیلیور مارک کریں" },
  noOrders: { en: "No orders found", ur: "کوئی آرڈر نہیں ملا" },
  
  // Profit Dashboard
  availableProfit: { en: "Available Profit", ur: "قابل حصول منافع" },
  pendingProfit: { en: "Pending Profit", ur: "زیر التواء منافع" },
  payoutInfo: { en: "Profit is transferred automatically every Thursday.", ur: "منافع ہر جمعرات کو خود بخود منتقل کیا جاتا ہے۔" },
  
  // League
  league: { en: "Performance", ur: "کارکردگی" },
  topResellers: { en: "Your Stats", ur: "آپ کے اعدادوشمار" },
  rank: { en: "Rank", ur: "درجہ" },
  totalOrders: { en: "Orders", ur: "آرڈرز" },
  uploadImage: { en: "Upload Image", ur: "تصویر اپ لوڈ کریں" }
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Ajwa Dates (500g)',
    price: 3500,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=1000&auto=format&fit=crop',
    description: 'Authentic Ajwa dates from Madinah. Known for their healing properties and sweet taste. Freshly imported.',
    rating: 4.8,
    reviews: 124,
    sold: 530
  },
  {
    id: '2',
    name: 'Oud Al-Layl Perfume',
    price: 4500,
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1594035910387-fea477942698?q=80&w=1000&auto=format&fit=crop',
    description: 'Long-lasting alcohol-free attar with woody and floral notes. Perfect for daily use and special occasions.',
    rating: 4.5,
    reviews: 89,
    sold: 210
  },
  {
    id: '3',
    name: 'Turkish Velvet Prayer Mat',
    price: 1800,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1629822372433-281b37f401f3?q=80&w=1000&auto=format&fit=crop',
    description: 'Soft velvet prayer mat with traditional Turkish design. Thick foam padding for knee comfort.',
    rating: 4.9,
    reviews: 256,
    sold: 1200
  },
  {
    id: '4',
    name: 'Organic Sidr Honey',
    price: 2500,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop',
    description: 'Pure Sidr honey sourced from the valleys of KPK. Lab tested and 100% organic.',
    rating: 4.7,
    reviews: 67,
    sold: 340
  },
  {
    id: '5',
    name: 'Men\'s Cotton Kurta',
    price: 2200,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=1000&auto=format&fit=crop',
    description: 'Comfortable premium cotton kurta suitable for summer. Available in all sizes.',
    rating: 4.6,
    reviews: 45,
    sold: 180
  }
];
