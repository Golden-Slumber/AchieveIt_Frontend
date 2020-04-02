import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import rootReducer from "./reducers";
import { sessionService } from 'redux-react-session';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const myPersistReducer = persistReducer(persistConfig, rootReducer)

let enhancer = applyMiddleware(thunk);
let store = createStore(myPersistReducer, enhancer);

export const persistor = persistStore(store);
export default store;