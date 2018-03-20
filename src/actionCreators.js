import Petitions from './api/Petitions';
import {
    ACTION_MODAL,
    REPLACE_PRODUCTS,
    SAVE_PRODUCT,
    DELETE_PRODUCT,
    SAVE_CATEGORY,
    REPLACE_CATEGORIES
} from './const';
import { message } from 'antd';

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

const saveDocument = (document, form) =>
    dispatch => {
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
                form: form
            }
        }

        const response = petitions.saveDocument(datos);

        response.then(response => {
            if (response.data.error === "") {
                dispatch({
                    type: SAVE_CATEGORY
                })

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


export { loadProducts, openModal, hideModal, saveProduct, deleteProduct, saveDocument, loadCategories };