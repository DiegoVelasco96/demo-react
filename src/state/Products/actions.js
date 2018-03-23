import Petitions from '../../api/Petitions';
import {
    ACTION_MODAL,
    REPLACE_PRODUCTS,
    SAVE_PRODUCT,
    DELETE_PRODUCT,
} from './const';

const loadProducts = () => {
  return dispatch => {
      const objProducts = new Petitions();
      const response = objProducts.listDocuments("products");
      const productsCategories = [];

      response.then(response => {
          if (response.data.documents.length > 0) {
              response.data.documents.forEach(function (element) {
                  const contains = productsCategories.find(item => item.category === element.category);

                  if (!contains) {

                      productsCategories.push({
                          category: element.category,
                          products: [],
                      });
                  }
              });

              productsCategories.forEach(function (element) {
                  const filtrado = response.data.filter(item => item.category === element.category);
                  element.products = filtrado;
              });
          }

          dispatch({
              type: REPLACE_PRODUCTS,
              productsCategory: productsCategories
          })
      })
  }
}

const saveProduct = (visible, productsCategory) => {
  return {
      type: SAVE_PRODUCT,
      productsCategory,
      visible
  }
}

const deleteProduct = (productsCategory) => {
  return {
      type: DELETE_PRODUCT,
      productsCategory
  }
}

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

export { loadProducts, saveProduct, deleteProduct, openModal, hideModal };