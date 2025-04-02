import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import axios from '../lib/axios';
import { User, LoginCredentials, RegisterCredentials, AuthResponse, UpdateProfileData } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    _id: Object(1),
    email: 'test@medsupply.com',
    ownerName: 'Test User',
    role: 'Hospital',
    shopName: 'Test Hospital',
    mobile: '+1234567890',
    subscription: {
      plan: 'Basic',
      validUntil: '2025-12-31',
    },
  },
  {
    _id: Object(2),
    email: 'supplier@medsupply.com',
    ownerName: 'Supplier Demo',
    role: 'Supplier',
    shopName: 'Medical Supplies Inc.',
    mobile: '+1987654321',
    subscription: {
      plan: 'Premium',
      validUntil: '2025-12-31',
    },
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setToken: (token: string) => {
        set({ token });
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      clearError: () => {
        set({ error: null });
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.post(`/login`,credentials)
          
          if (response.status) {
            const token = response.data.token;
            const refreshToken = 'mock-refresh-token';
            
            set({ 
              user:response.data, 
              token, 
              refreshToken,
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });
            console.log(response.data)
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ 
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null,
            refreshToken: null
          });

          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.post(`/register`, credentials)
          console.log(response.data);
          const token = 'mock-jwt-token';
          const refreshToken = 'mock-refresh-token';
          
          set({ 
            user: response.data, 
            token,
            refreshToken,
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({ 
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null,
            refreshToken: null
          });
          throw error;
        }
      },

      updateProfile: async (data: UpdateProfileData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.put(`/updateProfile`, data, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          if (response){
          const updatedUser = response.data;
          set({
            user: updatedUser, 
            isLoading: false,
            error: null
          });}
          else{
            throw new Error('Profile update failed');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
          set({ 
            error: errorMessage,
            isLoading: false
          });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          refreshToken: null,
          isAuthenticated: false,
          error: null
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);