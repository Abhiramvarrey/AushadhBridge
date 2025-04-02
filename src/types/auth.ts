export interface User {
  _id: string;
  email: string;
  ownerName: string;
  role: 'Hospital' | 'Clinic' | 'Supplier' | 'Distributor';
  shopName: string;
  mobile: string;
  subscription: {
    plan: 'Free' | 'Basic' | 'Premium' | 'Enterprise';
    validUntil: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  ownerName: string;
  email: string;
  password: string;
  confirmPassword: string;
  shopName: string;
  mobile: string;
  role: string;
  shopLocation:string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateProfileData {
  _id: string
  name: string;
  shopName: string;
}

export interface Requirement {
  id: string;
  shopName: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  deadlineDate: string;
  status: 'open' | 'closed';
  createdAt: string;
}

export interface Quote {
  id: string;
  requirementId: string;
  fromShop: string;
  toShop: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
    price: number;
  }>;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  role: string;
  location: string;
  specialties: string[];
  isConnected: boolean;
}

export interface ConnectionRequest {
  id: string;
  fromShop: string;
  toShop: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'quote' | 'connection' | 'requirement' | 'subscription';
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended: boolean;
}