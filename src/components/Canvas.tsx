import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {CanvasItem} from "../slices/canvasSlice";
import calculateMinimalBoundingBox from "../services/calculateMinimalBoundingBox";

const Canvas = () => {
    const canvasWidth = useSelector((state: RootState) => (state.canvas.width));
    const canvasHeight = useSelector((state: RootState) => (state.canvas.height));
    const canvasItems = useSelector((state: RootState) => (state.canvas.items));

    const canvasRef = useRef<HTMLDivElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);

    const setRealCanvasSize = () => {
        if(canvasRef?.current && canvasWrapperRef.current) {
            const wrapperHeight = canvasWrapperRef.current.clientHeight;

            canvasRef.current.style.height = `${canvasHeight}px`;
            canvasRef.current.style.width = `100%`;

            let newWidth = canvasRef.current.clientWidth;
            let newHeight = (canvasHeight / canvasWidth) * newWidth;

            if(newHeight <= wrapperHeight) {
                // Set 100% width and height proportionally
                canvasRef.current.style.height = `${newHeight}px`;
            }
            else {
                // Set 100% height and width proportionally
                canvasRef.current.style.height = `100%`;

                newHeight = canvasRef.current.clientHeight;
                newWidth = (canvasWidth / canvasHeight) * newHeight;

                canvasRef.current.style.width = `${newWidth}px`;
            }
        }
    }

    const clearCanvas = () => {
        Array.from(document.querySelectorAll('.canvas__element, .canvas__boundingBox'))
            .forEach((item) => {
                item.remove();
            });
    }

    const drawCanvasElements = (canvasItems: CanvasItem[]) => {
        if(canvasRef.current) {
            for(const item of canvasItems) {
                const { x, y, width, height, rotation, type, color } = item;

                const newElement = document.createElement('div');
                newElement.classList.add('canvas__element');

                drawElementByType(type, newElement);

                const percentageWidth = width / canvasWidth * 100;
                const percentageHeight = height / canvasHeight * 100;
                const percentageY = y / canvasHeight * 100;
                const percentageX = x / canvasWidth * 100;

                newElement.style.width = `${percentageWidth}%`;
                newElement.style.height = `${percentageHeight}%`;
                newElement.style.top = `${percentageY}%`;
                newElement.style.left = `${percentageX}%`;
                newElement.style.background = color;
                newElement.style.transform = `rotate(${rotation}deg) translate(-50%, -50%)`;

                canvasRef.current.appendChild(newElement);

                const centerPoint = document.createElement('span');
                centerPoint.classList.add('canvas__element__center');

                centerPoint.style.transform = `translate(-50%, -50%) rotate(-${rotation}deg)`;

                newElement.appendChild(centerPoint);

                const rotationInfoElement = document.createElement('span');
                rotationInfoElement.classList.add('canvas__element__center__rotationInfo');

                rotationInfoElement.innerHTML = `${rotation}&deg;`;

                centerPoint.appendChild(rotationInfoElement);

                drawBoundingBox(x, y, width, height, rotation);
            }
        }
    }

    const drawElementByType = (type: string, newElement: HTMLElement) => {
        if(type === 'ellipse') {
            newElement.style.borderRadius = '50%';
        }
    }

    const drawBoundingBox = (elementX: number, elementY: number, elementWidth: number,
                             elementHeight: number, elementRotation: number) => {
        if(canvasRef.current) {
            const { top, left, width, height }
                = calculateMinimalBoundingBox(elementX, elementY, elementWidth, elementHeight, elementRotation);
            const boundingBox = document.createElement('div');

            boundingBox.classList.add('canvas__boundingBox');

            const topPercentage = top / canvasHeight * 100;
            const leftPercentage = left / canvasWidth * 100;
            const widthPercentage = width / canvasWidth * 100;
            const heightPercentage = height / canvasHeight * 100;

            boundingBox.style.top = `${topPercentage}%`;
            boundingBox.style.left = `${leftPercentage}%`;
            boundingBox.style.width = `${widthPercentage}%`;
            boundingBox.style.height = `${heightPercentage}%`;

            canvasRef.current.appendChild(boundingBox);
        }
    }

    useEffect(() => {
        if(canvasWidth && canvasHeight) {
            setRealCanvasSize();
        }
    }, [canvasWidth, canvasHeight]);

    useEffect(() => {
        if(canvasItems?.length) {
            clearCanvas();
            drawCanvasElements(canvasItems);
        }
    }, [canvasItems]);

    useEffect(() => {
        const handleResize = () => {
            if(canvasRef.current) {
                setRealCanvasSize();
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [canvasWidth, canvasHeight]);

    return <div className="canvasWrapper"
                ref={canvasWrapperRef}>
        <div className="canvas"
             ref={canvasRef}>

        </div>
    </div>
};

export default Canvas;
