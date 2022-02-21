import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(uiActions.showCartLoading());

    const fetchDataRequest = async () => {
      const response = await fetch(
        "https://react-movie-890b6-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetching Cart Data Failed!");
      }

      const cartData = await response.json();
      return cartData;
    };

    try {
      const cartData = await fetchDataRequest();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Oops!",
          message: "Cart fetched failed!",
        })
      );
    }

    dispatch(uiActions.stopCartLoading());
  };
};

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
