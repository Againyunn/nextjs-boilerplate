import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
// import { authSlices } from "features/authSlices";
// import { categorySlices } from "features/categorySlices";
import { testSlice } from "features/testSlices";

const rootReducer = combineReducers({
  // categories: categorySlices.reducer,
  // auth: authSlices.reducer,
  test: testSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeConfiguredStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// export const persistedStore = () => persistStore(makeStore());
export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store: any = makeConfiguredStore();
    store.__persistor = persistStore(store);
    return store;
  }
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
