import { create } from "zustand";
import { PropertyType } from "@/types/general";

type State = {
  propertyList: PropertyType[] | null;
  isPropertyListLoading: boolean;
};

type Actions = {
  setPropertyList: (properties: PropertyType[] | null) => void;
  setPropertyListLoading: (loading: boolean) => void;
  resetPropertyList: () => void;
};

const initialState: State = {
  propertyList: null,
  isPropertyListLoading: true,
};

export const usePropertyListStore = create<State & Actions>((set) => ({
  ...initialState,

  setPropertyList: (properties) =>
    set({
      propertyList: properties,
      isPropertyListLoading: false,
    }),

  setPropertyListLoading: (loading) =>
    set({
      isPropertyListLoading: loading,
    }),

  resetPropertyList: () => set(initialState),
}));
