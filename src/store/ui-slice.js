import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isCartShown: false,
    isNotificationShown: false,
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
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
