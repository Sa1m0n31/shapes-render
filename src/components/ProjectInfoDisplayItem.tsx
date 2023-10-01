import React from 'react';

interface ProjectInfoDisplayItemProps {
    name: string,
    value: string
}

const ProjectInfoDisplayItem = ({name, value}: ProjectInfoDisplayItemProps) => {
    return <p className="projectInfo__item">
        <span className="projectInfo__item__key">
            {name}:
        </span>
        <span className="projectInfo__item__value">
            {value}
        </span>
    </p>
};

export default ProjectInfoDisplayItem;
