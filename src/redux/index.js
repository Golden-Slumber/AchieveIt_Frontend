import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import rootReducer from "./reducers";

let enhancer = applyMiddleware(thunk);
let store = createStore(rootReducer, enhancer);

export default store;