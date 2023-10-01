import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CanvasItem {
    id: string,
    type: string,
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number,
    color: string
}

interface CanvasState {
    width: number,
    height: number,
    items: CanvasItem[]
}

const initialState: CanvasState = {
    width: 0,
    height: 0,
    items: []
}

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        changeCanvasWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload
        },
        changeCanvasHeight: (state, action: PayloadAction<number>) => {
            state.height = action.payload
        },
        changeCanvasItems: (state, action: PayloadAction<CanvasItem[]>) => {
            state.items = action.payload
        }
    }
});

export const { changeCanvasWidth, changeCanvasHeight, changeCanvasItems } = canvasSlice.actions;
export default canvasSlice.reducer;
