import { useEffect } from "react";
//метод из ReactDOM для создания портала разметки модалки
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

//портал для разметки модалки
const modalRoot = document.getElementById("modal-root");

function Modal({ onClick, children }) {
  useEffect(() => {
    //метод для закрытия модалки по кнопке Escape
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick]);

  //метод для закрытия модалки по backdrop
  const handleBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackDropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Modal;

// /////////////классовый Компонент
// import React, { Component } from "react";
// //метод из ReactDOM для создания портала разметки модалки
// import { createPortal } from "react-dom";

// //портал для разметки модалки
// const modalRoot = document.getElementById("modal-root");

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   //метод для очистки слушателя событий
//   componentWillUnmount = (e) => {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   };

//   //метод для закрытия модалки по кнопке Escape
//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClick();
//     }
//   };

//   //метод для закрытия модалки по backdrop
//   handleBackDropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClick();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackDropClick}>
//         <div className="Modal">{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
// export default Modal;
