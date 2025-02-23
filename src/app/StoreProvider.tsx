"use client";

import { AppStore, makeStore } from "app/_redux/store";

import LoadingDots from "components/atom/Loading";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
// import { persistStore } from 'redux-persist';
import { useRef } from "react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(initializeCount(count));
  }

  // const persistor = persistStore(makeStore());

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        persistor={storeRef.current.__persistor}
        loading={<LoadingDots />}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
