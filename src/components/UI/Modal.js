import './Modal.css';
import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return (
    <div onClick={props.onHideCart} className="backdrop">
      {' '}
    </div>
  );
};

const ModalWindow = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalWindow>{props.children}</ModalWindow>,
        portalElement
      )}
    </React.Fragment>
  );
};
export default Modal;
