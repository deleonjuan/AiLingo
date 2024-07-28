import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const REDUCER_NAME = "learningReducer";

interface LearningState {
  isLoading: boolean;
  initialTopics: string[];
  lessonsDone: string[];
  wordsLearned: string[];
}

const initialState: LearningState = {
  isLoading: false,
  initialTopics: [],
  lessonsDone: [],
  wordsLearned: [],
};

const slice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setInitialTopics: (state, { payload }) => {
      state.initialTopics = payload;
    },
    setLessonsDone: (state, { payload }) => {
      state.lessonsDone = payload;
    },
    addFinishedLesson: (state, { payload }) => {
      state.lessonsDone = [...state.lessonsDone, payload];
    },
    setWordsLearned: (
      state: any,
      { payload }: PayloadAction<Array<string>>
    ) => {
      state.wordsLearned = payload;
    },
  },
});

export const learningActions = {
  ...slice.actions,
};

export default slice.reducer;
