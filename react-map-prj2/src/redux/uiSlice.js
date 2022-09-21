import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenSidebar: false,
  selectedPark: null
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    reset: (state) => {
      state.isOpenSidebar = false;
      state.selectedPark = null;
    },
    openSidebar: (state) => {
      state.isOpenSidebar = true;
    },
    closeSidebar: (state) => {
      state.isOpenSidebar = false;
    },
    toggleSidebar: (state) => {
      state.isOpenSidebar = !state.isOpenSidebar;
    },
    selectPark: (state, action) => {
      state.isOpenSidebar = true;
      state.selectedPark = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { openSidebar, closeSidebar, reset, selectPark, toggleSidebar } = uiSlice.actions;

export default uiSlice.reducer;
