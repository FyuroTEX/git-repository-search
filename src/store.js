import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import seviceMiddleware from './middleware/seviceMiddleware';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnchancer = devTools ? devTools : compose;

const middleware = [thunk, seviceMiddleware];

export const store = createStore(
  rootReducer,
  composeEnchancer(applyMiddleware(...middleware))
);

export default store;
