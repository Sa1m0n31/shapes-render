import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import ProjectInfoDisplayItem from "./ProjectInfoDisplayItem";
import ErrorInfo from "./ErrorInfo";

const ProjectInfoDisplay = () => {
    const projectName = useSelector((state: RootState) => (state.project.name));
    const projectId = useSelector((state: RootState) => (state.project.id));
    const formError = useSelector((state: RootState) => (state.form.error));

    return <div className="projectInfo">
        {formError ? <ErrorInfo>
            {formError}
        </ErrorInfo> : <>
            <ProjectInfoDisplayItem name={'Project name'}
                                    value={projectName} />
            <ProjectInfoDisplayItem name={'Project id'}
                                    value={projectId} />
        </>}
    </div>
};

export default ProjectInfoDisplay;
