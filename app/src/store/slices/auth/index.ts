import { createSlice } from "@reduxjs/toolkit";

export const REDUCER_NAME = "authReducer";

interface authState {
  isLoading: boolean;
  username: string | null;
  apiKey: string;
}

const initialState: authState = {
  isLoading: false,
  username: null,
  apiKey: "",
};

const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setUserName: (state, { payload }) => {
      state.username = payload;
    },
    setApiKey: (state, { payload }) => {
      state.apiKey = payload;
    },
  },
});

export const authActions = {
  ...slice.actions,
};

export default slice.reducer;
