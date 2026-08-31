export type ScreenType = 'onboarding' | 'home' | 'split' | 'income' | 'calendar' | 'menu';

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  username: string;
  selected: boolean;
  color?: string;
  phone?: string;
}

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  assignedTo?: string[]; // friend IDs
}

export interface Bill {
  id: string;
  title: string;
  location?: string;
  category: string;
  date: string;
  amount: number;
  currency: string;
  items: ReceiptItem[];
  paidBy: string; // 'You' or Friend name
  splitWithIds: string[];
  splitType: 'equal' | 'exact' | 'percentage';
  status: 'pending' | 'settled';
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  readTime: string;
  tag: string;
  url?: string;
}

export interface ScheduledPayment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  avatar: string;
  membersCount: number;
  category: string;
}
