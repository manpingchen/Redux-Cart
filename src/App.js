import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.isCartShown);
  const cart = useSelector((state) => state.cart);
  const notificationObj = useSelector((state) => state.ui.isNotificationShown);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification(false));
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

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Hooray!",
          message: "Cart updated!",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Oops!",
          message: "Cart updated failed!",
        })
      );
    });
  }, [cart]);

  useEffect(() => {
    if (notificationObj && !isInitial) {
      const timer = setTimeout(() => {
        dispatch(uiActions.showNotification(false));
        clearTimeout(timer);
      }, 3800);
    }
  }, [notificationObj]);

  return (
    <Layout>
      {notificationObj && (
        <Notification
          title={notificationObj.title}
          status={notificationObj.status}
          message={notificationObj.message}
        />
      )}
      <Products />
      {showCart && <Cart />}
    </Layout>
  );
}

export default App;
