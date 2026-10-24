import { create } from "zustand";
import {
  DEFAULT_BUYER_TAB,
  DEFAULT_FARMER_TAB,
  DEFAULT_LANGUAGE,
  DEFAULT_ROLE,
  type BuyerTab,
  type FarmerTab,
  type Language,
  type Role,
} from "@kisaansahyog/shared";

interface AppState {
  language: Language;
  role: Role;
  is2GMode: boolean;
  farmerTab: FarmerTab;
  buyerTab: BuyerTab;
  isVoiceOpen: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setRole: (role: Role) => void;
  toggleRole: () => void;
  setIs2GMode: (enabled: boolean) => void;
  toggle2GMode: () => void;
  setFarmerTab: (tab: FarmerTab) => void;
  setBuyerTab: (tab: BuyerTab) => void;
  setVoiceOpen: (open: boolean) => void;
  toggleVoice: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  language: DEFAULT_LANGUAGE,
  role: DEFAULT_ROLE,
  is2GMode: false,
  farmerTab: DEFAULT_FARMER_TAB,
  buyerTab: DEFAULT_BUYER_TAB,
  isVoiceOpen: false,

  setLanguage: (language) => set({ language }),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "hi" ? "en" : "hi" })),

  setRole: (role) => set({ role }),
  toggleRole: () =>
    set((state) => ({ role: state.role === "farmer" ? "buyer" : "farmer" })),

  setIs2GMode: (is2GMode) => set({ is2GMode }),
  toggle2GMode: () => set((state) => ({ is2GMode: !state.is2GMode })),

  setFarmerTab: (farmerTab) => set({ farmerTab }),
  setBuyerTab: (buyerTab) => set({ buyerTab }),

  setVoiceOpen: (isVoiceOpen) => set({ isVoiceOpen }),
  toggleVoice: () => set((state) => ({ isVoiceOpen: !state.isVoiceOpen })),
}));
