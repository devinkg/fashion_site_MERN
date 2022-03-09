import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
}

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer }); // when you want persist more than one reducers (lesson 2)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const persistedReducer = persistReducer(persistConfig, userReducer); // only persisting userReducer (lesson 1)

/* REFER (ISSUE: store.dispatch is not a function)
    https://stackoverflow.com/a/70164070/9516745 
*/

export const store = configureStore({
    /*  lesson 1 (only 1 reducer persisting)
        reducer: {
          cart: cartReducer,
          user: persistedReducer, // Only persisting this reducer 
      },
    */
    reducer: persistedReducer, // (lesson 2)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store);