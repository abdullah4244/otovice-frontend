import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlanStore = create(
  persist(
    (set) => ({
      selectedPlan: null,
      user: null,
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setUser: (user) => set({ user: user }),
    }),
    {
      name: "plan-storage",
      getStorage: () => localStorage,
    }
  )
);

export default usePlanStore;
