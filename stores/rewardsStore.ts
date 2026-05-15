import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Roastery Rewards
 *
 * - Every drink purchased = +1 stamp
 * - 5 stamps = +1 free drink, stamps reset to 0
 * - Free drinks persist across app launches via AsyncStorage
 */

export const STAMPS_PER_FREE_DRINK = 5;

type RewardsState = {
  stamps: number;
  freeDrinks: number;
  // Add stamps based on the number of drink items in an order
  addStampsFromOrder: (drinkQuantity: number) => void;
  // Redeem one free drink (called at checkout when user toggles it on)
  redeemFreeDrink: () => boolean;
  // Reset everything (for demo/debug)
  reset: () => void;
};

export const useRewardsStore = create<RewardsState>()(
  persist(
    (set, get) => ({
      stamps: 0,
      freeDrinks: 0,

      addStampsFromOrder: (drinkQuantity) => {
        if (drinkQuantity <= 0) return;
        set((state) => {
          const totalStamps = state.stamps + drinkQuantity;
          const earnedFreeDrinks = Math.floor(totalStamps / STAMPS_PER_FREE_DRINK);
          const remainingStamps = totalStamps % STAMPS_PER_FREE_DRINK;
          return {
            stamps: remainingStamps,
            freeDrinks: state.freeDrinks + earnedFreeDrinks,
          };
        });
      },

      redeemFreeDrink: () => {
        const { freeDrinks } = get();
        if (freeDrinks <= 0) return false;
        set((state) => ({ freeDrinks: state.freeDrinks - 1 }));
        return true;
      },

      reset: () => set({ stamps: 0, freeDrinks: 0 }),
    }),
    {
      name: 'roastery-rewards',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
