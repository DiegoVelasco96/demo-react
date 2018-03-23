import {
  SAVE_CATEGORY,
  REPLACE_CATEGORIES,
  LOAD_CATEGORY,
} from './const';

const initialState = {
  categories: []
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CATEGORY:
      return {
        ...state,
        categories: action.data,
      }
      break;
    case REPLACE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      }
      break;
    default:
      return state;
      break;
  }
}

export default categories;