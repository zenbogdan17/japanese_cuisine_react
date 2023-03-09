import './MealItem.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartContext = useContext(CartContext);

  const formattedPrice = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
