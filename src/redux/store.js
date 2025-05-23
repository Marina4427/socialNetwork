import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import notifications from "./reducers/notificationSlice"
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import findUsersReducer from "./reducers/findUsersSlice"; 
import { requestsSlice } from "./reducers/requestSlice";


const rootReducer = combineReducers({
  user: userReducer,
  findUsers: findUsersReducer,
  notifications,
  [requestsSlice.reducerPath]: requestsSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(requestsSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
