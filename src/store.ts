import { configureStore } from "@reduxjs/toolkit";
import formReducer from './slices/formSlice';
import projectReducer from './slices/projectSlice';
import canvasSlice from "./slices/canvasSlice";

export const store = configureStore({
    reducer: {
        form: formReducer,
        project: projectReducer,
        canvas: canvasSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
