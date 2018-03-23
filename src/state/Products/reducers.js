import {
    ACTION_MODAL,
    DELETE_PRODUCT,
    REPLACE_PRODUCTS,
    SAVE_PRODUCT,
} from './const';

const initialState = {
    productsCategory: [],
    visible: false,
    product: {},
    title: '',
    display: '',
    operation: ''
}

const products = (state = initialState, action) => {
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

export default products;