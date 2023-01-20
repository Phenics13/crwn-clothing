import { compose, legacy_createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk'; //async state managment library
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';


import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares =
  [process.env.NODE_ENV === 'development' &&
    logger, sagaMiddleware].filter(Boolean); //change to custom loggerMiddleware

const composeEnhancer =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);