import { useRef, useState } from 'react';
import './SubmitOrder.css';

const isInputValid = (inputValue) => {
  return inputValue.trim() !== '';
};

const SubmitOrder = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    address: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();

  const conrirmOrderHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const isEnteredNameValid = isInputValid(enteredName);
    const isEnteredCityValid = isInputValid(enteredCity);
    const isEnteredAddressValid = isInputValid(enteredAddress);

    setFormValidity({
      name: isEnteredNameValid,
      city: isEnteredCityValid,
      address: isEnteredAddressValid,
    });
    const isFormValid =
      isEnteredAddressValid && isEnteredCityValid && isEnteredNameValid;
    if (!isFormValid) return;

    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
    });
  };

  return (
    <form className="form_modal" onSubmit={conrirmOrderHandler}>
      <div className={`${'control'} ${formValidity.name ? '' : 'invalid'} `}>
        <label htmlFor="name">Имя</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p className="isNotValid">Введите Имя!</p>}
      </div>
      <div className={`${'control'} ${formValidity.city ? '' : 'invalid'} `}>
        <label htmlFor="city">Названия Города</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && (
          <p className="isNotValid">Введите Названия Город!</p>
        )}
      </div>
      <div className={`${'control'} ${formValidity.address ? '' : 'invalid'} `}>
        <label htmlFor="address">Адрес</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formValidity.address && <p className="isNotValid">Введите Адресу!</p>}
      </div>
      <div className="actions">
        <button className="submit">Подтвердить заказ</button>
        <button type="button" onClick={props.onCancel}>
          Отменить
        </button>
      </div>
    </form>
  );
};

export default SubmitOrder;
