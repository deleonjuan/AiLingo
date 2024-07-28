import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import reducers from "./reducers";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
export default store;
