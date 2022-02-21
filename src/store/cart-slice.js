import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification(false));

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-movie-890b6-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Failed");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Hooray!",
          message: "Cart updated!",
        })
      );

      const timer = setTimeout(() => {
        dispatch(uiActions.showNotification(false));
        clearTimeout(timer);
      }, 3800);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Oops!",
          message: "Cart updated failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
