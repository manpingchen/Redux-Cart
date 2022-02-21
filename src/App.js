import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.isCartShown);
  const cart = useSelector((state) => state.cart);
  const notificationObj = useSelector((state) => state.ui.isNotificationShown);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

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
