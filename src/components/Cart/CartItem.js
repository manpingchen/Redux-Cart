import { useDispatch } from "react-redux";

import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { item } = props;

  const addItemToCart = () => {
    dispatch(cartActions.addItemToCart(item));
  };

  const removeItemFromCart = () => {
    dispatch(cartActions.removeItemFromCart(item.id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{item.name}</h3>
        <div className={classes.price}>
          ${item.totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${item.price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCart}>-</button>
          <button onClick={addItemToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
