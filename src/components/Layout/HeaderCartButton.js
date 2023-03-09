import CartIcon from '../Cart/CartIcon';
import './HeaderCartButton.css';
import { useContext, useEffect, useState } from 'react';
import CartCotext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  const cartContext = useContext(CartCotext);

  const cartItemNumbers = cartContext.items?.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  useEffect(() => {
    if (cartContext.items.length === 0) return;
    setIsButtonAnimated(true);
    const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  const buttonClasses = `${'button'} ${isButtonAnimated ? 'bump' : ''}`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className="badge"> {cartItemNumbers} </span>
    </button>
  );
};
export default HeaderCartButton;
