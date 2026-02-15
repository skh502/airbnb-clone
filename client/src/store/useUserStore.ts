import { create } from "zustand";
import { UserType } from "@/types/general";

type State = {
  user: UserType | null;
  isUserLoading: boolean;
};

type Actions = {
  setUser: (user: UserType | null) => void;
  setUserLoading: (loading: boolean) => void;
  resetUser: () => void;
};

const initialState: State = {
  user: null,
  isUserLoading: true,
};

export const useUserStore = create<State & Actions>((set) => ({
  ...initialState,

  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
      isUserLoading: false,
    })),

  setUserLoading: (loading) =>
    set((state) => ({
      ...state,
      isUserLoading: loading,
    })),

  resetUser: () => set(initialState),
}));
