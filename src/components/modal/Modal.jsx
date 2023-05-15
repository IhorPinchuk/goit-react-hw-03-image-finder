import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeClose);
  }

  handleEscapeClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClose}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
