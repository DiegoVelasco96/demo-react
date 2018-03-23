import Petitions from '../../api/Petitions';
import {
  SAVE_CATEGORY,
  REPLACE_CATEGORIES,
  LOAD_CATEGORY,
} from './const';
import { message } from 'antd';

const saveCategorySuccess = data => ({
  type: SAVE_CATEGORY,
  data,
});

const saveCategory = document => (dispatch, getActualState) => {
  const petitions = new Petitions();
  const documentAux = [];
  const newDocument = () => {
    const keys = Object.keys(document);
    const newDocument = {};

    keys.forEach(function (key) {
      newDocument[key] = {
        value: document[key],
        type: typeof document[key]
      }
    })
    return newDocument
  }

  documentAux.push(newDocument())

  const datos = {
    data: {
      registros: documentAux,
    }
  }

  const response = petitions.saveDocument(datos);

  response.then(response => {
    if (response.data.error === "") {
      let categories = [...getActualState().categories.categories];
      categories.push(response.data.category);
      dispatch(saveCategorySuccess(categories));

      message.success('The document has been saved successfully');
    } else {
      message.error('¡ERROR! ', response.error);
    }
  })
}

const loadCategories = () => {
  return dispatch => {
    const objCategories = new Petitions();
    const response = objCategories.listDocuments("categories");

    response.then(response => {
      dispatch({
        type: REPLACE_CATEGORIES,
        categories: response.data.documents
      })
    })
  }
}

export { saveCategory, loadCategories };