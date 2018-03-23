import {
  ACTION_MODAL,
} from './const';

const initialState = {
  productsCategory: [],
  visible: false,
  product: {},
  title: '',
  display: '',
  operation: ''
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_MODAL:
      return {
        ...state,
        visible: action.visible,
        product: action.product,
        title: action.title,
        display: action.display,
        operation: action.operation,
      }
      break;
    default:
      return state;
      break;
  }
}

export default modal;