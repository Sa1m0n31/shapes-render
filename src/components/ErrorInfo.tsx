import React from 'react';

interface ErrorInfoProps {
    children: string
}

const ErrorInfo = ({children}: ErrorInfoProps) => {
    return <p className="errorInfo">
        {children}
    </p>
};

export default ErrorInfo;
