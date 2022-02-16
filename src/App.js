import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.isCartShown);

  return (
    <Layout>
      <Products />
      {showCart && <Cart />}
    </Layout>
  );
}

export default App;
