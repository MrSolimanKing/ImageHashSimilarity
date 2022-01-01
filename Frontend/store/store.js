import { createStore, combineReducers, applyMiddleware } from 'redux';
import accountAuthReducer from './reducers/AuthReducers';


import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    accountAuthReducer: accountAuthReducer,
  })

const configureStore = () => createStore(
        rootReducer,
    );

export default configureStore;