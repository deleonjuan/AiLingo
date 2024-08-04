import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import learningReducer, { REDUCER_NAME as LEARNING } from "./slices/learning";
import authReducer, { REDUCER_NAME as AUTH } from "./slices/auth";

export const appReducer = combineReducers({
  learningReducer,
  authReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [LEARNING, AUTH],
};

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET") {
    return appReducer(undefined, action as never);
  }

  return appReducer(state, action as never);
};

const reducers = persistReducer(persistConfig, rootReducer);
export default reducers;
