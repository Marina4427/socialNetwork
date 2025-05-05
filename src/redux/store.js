import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {user} from './reducers/userSlice';
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers ({
    user
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),    
})

export default store;