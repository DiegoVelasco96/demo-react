import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    ACTION_MODAL,
    DELETE_PRODUCT,
    REPLACE_PRODUCTS,
    SAVE_PRODUCT,
    SAVE_CATEGORY,
    REPLACE_CATEGORIES
} from './const';


const initialStateProducts = {
    productsCategory: [],
    visible: false,
    product: {},
    title: '',
    display: '',
    operation: ''
}

const initialStateCategories = {
    categories: []
}

const products = (state = initialStateProducts, action) => {
    switch (action.type) {
        case REPLACE_PRODUCTS:
        case DELETE_PRODUCT:
            return {
                ...state,
                productsCategory: action.productsCategory,
            }
            break;
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
        case SAVE_PRODUCT:
            return {
                ...state,
                productsCategory: action.productsCategory,
                visible: action.visible,
            }
            break;
        default:
            return state;
            break;
    }
}

const categories = (state = initialStateCategories, action) => {
    switch (action.type) {
        case SAVE_CATEGORY:
            return {
                ...state,
            }
            break;
             case REPLACE_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            }
            break;
        default:
            return state;
            break;
    }
}

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());

    return result;
}

export default createStore(combineReducers({products, categories}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger, thunk));