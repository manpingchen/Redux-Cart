import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { name, price, description, id } = props;

  const addItemToCart = () => {
    const newItem = { name: name, id: id, price: price, quantity: 1 };
    dispatch(cartActions.addItemToCart(newItem));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
