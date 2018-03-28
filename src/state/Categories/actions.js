import Petitions from '../../api/Petitions';
import {
  SET_CATEGORY,
  MODIDY_CATEGORY
} from './const';
import { message } from 'antd';

const saveCategorySuccess = data => ({
  type: SET_CATEGORY,
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
      const category = categories.find(item => item.id === response.data.category.id);
      if (category) {
        category.name = response.data.category.name
      }else{
        categories.push(response.data.category);
      }
      dispatch(saveCategorySuccess(categories));

      message.success('The document has been saved successfully');
    } else {
      message.error('¡ERROR! ', response.error);
    }
  })
}

const loadCategories = () => dispatch => {
  const objCategories = new Petitions();
  const response = objCategories.listDocuments("categories");

  response.then(response => {
    dispatch(saveCategorySuccess(response.data.documents));
  })
}

const deleteDocument = (id) => (dispatch, getActualState) => {
  const objCategories = new Petitions();
  const response = objCategories.deleteDocument(id);

  response.then(response => {
    const categories = [...getActualState().categories.categories];

    if (response.data.error === "") {
      const categoryRemove = categories.findIndex(item => item.id === id);
      if (categoryRemove > 0) {
        categories.splice(categoryRemove, 1);
        dispatch(saveCategorySuccess(categories));
      }
    }
  });
}

const modifyCategory = (category) => dispatch => {
  dispatch({
    type: MODIDY_CATEGORY,
    name: category.name,
    id: category.id,
  });
}

export { saveCategory, loadCategories, deleteDocument, modifyCategory };