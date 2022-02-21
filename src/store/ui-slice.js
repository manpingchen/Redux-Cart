import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isCartShown: false,
    isNotificationShown: false,
    isCartLoading: true,
  },
  reducers: {
    toggle(state) {
      state.isCartShown = !state.isCartShown;
    },
    showNotification(state, action) {
      if (action.payload) {
        state.isNotificationShown = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      } else {
        state.isNotificationShown = false;
      }
    },
    showCartLoading(state) {
      state.isCartLoading = true;
    },
    stopCartLoading(state) {
      state.isCartLoading = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
