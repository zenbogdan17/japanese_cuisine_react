import './Header.css';
import React from 'react';
import sushiImage from '../../assets/sushi.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className="header">
        <h1>Япона кухня</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className="main-image ">
        <img src={sushiImage} alt="Блюда японской кухни" />
      </div>
    </React.Fragment>
  );
};

export default Header;
