
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum AppView {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  SHOP = 'SHOP',
  CART = 'CART',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  CHAT = 'CHAT'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  businessName?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  sold: number;
}

export interface CartItem extends Product {
  quantity: number;
  userProfit: number; 
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  profit: number; // 0 for personal
  date: string;
  status: 'Pending' | 'Delivered';
  type: 'personal' | 'resell';
  customerName?: string;
  customerPhone?: string;
  customerCity?: string;
}

export interface LanguageContent {
  [key: string]: {
    en: string;
    ur: string;
  }
}
