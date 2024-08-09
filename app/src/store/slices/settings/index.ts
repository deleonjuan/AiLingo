import { createSlice } from "@reduxjs/toolkit";

export const REDUCER_NAME = "settingsReducer";

interface LearningState {
  isLoading: boolean;
  settings: {
    apiKey: string;
    excercisesPerLesson: string;
    language: string;
    languageLearning: string;
  };
}

export const initialState: LearningState = {
  isLoading: false,
  settings: {
    apiKey: "",
    excercisesPerLesson: "5",
    language: "spanish",
    languageLearning: "english",
  },
};

const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setSettings: (state, { payload }) => {
      state.settings = payload;
    },
    setApiKey: (state, { payload }) => {
      state.settings = {...state.settings, apiKey: payload};
    },
  },
});

export const settingsActions = {
  ...slice.actions,
};

export default slice.reducer;
