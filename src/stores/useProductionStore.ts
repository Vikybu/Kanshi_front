import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductionState {
  activeProductionId: string | null;
  setActiveProduction: (id: string | null) => void;
  clearActiveProduction: () => void;
}

export const useProductionStore = create<ProductionState>()(
  persist(
    (set) => ({
      activeProductionId: null,
      setActiveProduction: (id) => set({ activeProductionId: id }),
      clearActiveProduction: () => set({ activeProductionId: null }),
    }),
    {
      name: 'production-storage',
    }
  )
);