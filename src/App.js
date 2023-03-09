import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartCotextProveder from './store/CartCotextProveder';

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartCotextProveder>
      {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartCotextProveder>
  );
}

export default App;
