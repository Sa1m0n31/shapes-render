import {createSlice} from "@reduxjs/toolkit";

interface ProjectState {
    name: string,
    id: string
}

const initialState: ProjectState = {
    name: '',
    id: ''
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        changeProjectName: (state, action) => {
            state.name = action.payload
        },
        changeProjectId: (state, action) => {
            state.id = action.payload
        }
    }
});

export const { changeProjectName, changeProjectId } = projectSlice.actions;
export default projectSlice.reducer;
