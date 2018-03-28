import {
  SET_CATEGORY,
  MODIDY_CATEGORY,
} from './const';

const initialState = {
  categories: [],
  name: '',
  id: '',
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        categories: action.data,
        name: '',
        id: '',
      };
    case MODIDY_CATEGORY:
      return {
        ...state,
        name: action.name,
        id: action.id,
      }
    default:
      return state;
  }
}

export default categories;