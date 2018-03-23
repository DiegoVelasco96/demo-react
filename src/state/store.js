import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import categories from './Categories/reducers';
import products from './Products/reducers';

const middleware = composeWithDevTools(applyMiddleware(thunk));

const app = combineReducers({
  categories,
  products
});

export default createStore(app, middleware);