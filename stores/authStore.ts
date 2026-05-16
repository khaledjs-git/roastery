import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = {
  phone: string;
  name?: string;
  signedInAt: number;
};

type AuthState = {
  user: AuthUser | null;
  isSignedIn: () => boolean;
  signIn: (data: { phone: string; name?: string }) => void;
  signOut: () => void;
};

// Persist the auth state so user stays signed in across app launches.
// This is demo-grade: no real verification, just remembers the phone number.
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      isSignedIn: () => get().user !== null,

      signIn: ({ phone, name }) => {
        set({
          user: {
            phone,
            name,
            signedInAt: Date.now(),
          },
        });
      },

      signOut: () => {
        set({ user: null });
      },
    }),
    {
      name: 'flat-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
