import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    id: string,
    error: string
}

const initialState: FormState = {
    id: '',
    error: ''
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormValue: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        setFormError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
});

export const { setFormValue, setFormError } = formSlice.actions;
export default formSlice.reducer;
