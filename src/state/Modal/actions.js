import {
  ACTION_MODAL,
} from './const';

const openModal = (category, product, title, display, operation) => {
  return {
      type: ACTION_MODAL,
      visible: true,
      title,
      display,
      product,
      operation
  }
};

const hideModal = (visible, display, product) => {
  return {
      type: ACTION_MODAL,
      visible,
      display,
      product
  }
}

export { openModal, hideModal };