import React, {ChangeEvent} from 'react';
import {setFormError, setFormValue} from "../slices/formSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getProjectById, getProjectInfo} from "../services/api";
import {changeProjectName, changeProjectId} from "../slices/projectSlice";
import {changeCanvasHeight, changeCanvasItems, changeCanvasWidth} from "../slices/canvasSlice";

const ProjectForm = () => {
    const inputValue = useSelector((state: RootState) => (state.form.id));
    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormValue(e.target.value));
    }

    const handleSubmit = async () => {
        try {
            dispatch(setFormError(''));

            if(inputValue) {
                setProjectData(inputValue);
            }
            else {
                const projectInfo = await getProjectInfo();
                setProjectData(projectInfo.data.id);
            }
        }
        catch(e: any) {
            dispatch(setFormError(e.message));
        }
    }

    const validateProjectData = (projectData: any) => {
        const { project } = projectData.data;
        const { name, width, height, items } = project;

        if(!name) {
            return 'Data error - no project name';
        }
        if(!width || width <= 0) {
            return 'Data error - invalid width value';
        }
        if(!height || height <= 0) {
            return 'Data error - invalid height value';
        }

        for(const item of items) {
            const { x, y, width, height, rotation } = item;

            if(x < 0) {
                return 'Data error - invalid item x value';
            }
            if(y < 0) {
                return 'Data error - invalid item y value';
            }
            if(width <= 0) {
                return 'Data error - invalid width value';
            }
            if(height <= 0) {
                return 'Data error - invalid height value';
            }
            if(isNaN(rotation)) {
                return 'Data error - invalid rotation value';
            }
        }

        return '';
    }

    const setProjectData = async (projectId: string) => {
        try {
            const projectData = await getProjectById(projectId);
            const projectValidationError = validateProjectData(projectData);

            if(!projectValidationError) {
                const { id, project } = projectData.data;
                const { name, width, height, items } = project;

                dispatch(changeProjectName(name));
                dispatch(changeProjectId(id));
                dispatch(changeCanvasWidth(width));
                dispatch(changeCanvasHeight(height));
                dispatch(changeCanvasItems(items));
            }
            else {
                dispatch(setFormError(projectValidationError));
            }
        }
        catch(e: any) {
            dispatch(setFormError(e.message));
        }
    }

    return <div className="form">
        <label>
            Project id:
            <input className="input"
                   value={inputValue}
                   onChange={handleChange} />

            <button className="btn"
                    onClick={handleSubmit}>
                Find
            </button>
        </label>
    </div>
};

export default ProjectForm;
