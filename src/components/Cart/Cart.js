import Modal from '../UI/Modal';
import './Cart.css';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';

const Cart = (props) => {
  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);
  const [isDataSubmited, setIsDataSubmited] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
    useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsSubmitOrderAvailable(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsDataSubmited(true);
    await fetch(
      'https://react-app-78c26-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContext.items,
        }),
      }
    );
    setIsDataSubmited(false);
    setWasDataSendingSuccessful(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className="cart-items">
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className="actions">
      <button className="button--alt" onClick={props.onHideCart}>
        Закрыть
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Заказать
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className="total">
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitOrderAvailable && (
        <SubmitOrder
          onSubmit={submitOrderHandler}
          onCancel={props.onHideCart}
        />
      )}
      {!isSubmitOrderAvailable && modalButtons}
    </React.Fragment>
  );
  const dataSubmittingModalContent = <p>Отправка дата заказа...</p>;

  const dataWasSubmitedCartModalContent = (
    <React.Fragment>
      <p>Ваш заказ успешно отправлен!!!</p>
      <div className="actions">
        <button className="button--alt" onClick={props.onHideCart}>
          Закрыть
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isDataSubmited && !wasDataSendingSuccessful && cartModalContent}
      {isDataSubmited &&
        !wasDataSendingSuccessful &&
        dataSubmittingModalContent}
      {wasDataSendingSuccessful && dataWasSubmitedCartModalContent}
    </Modal>
  );
};

export default Cart;
