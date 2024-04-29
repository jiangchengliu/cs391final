import {useRef, useState} from 'react';
import styled from 'styled-components';
import {Page, Toolbox, Inputs, Buttons, Button} from './components/Styling.jsx'
import './App.css';

import CanvasDraw from "react-canvas-draw";
import { HexColorPicker } from "react-colorful";
import {Slider} from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const Canvas = styled(CanvasDraw)`
    border: 0.0625rem solid #9c9c9c
`

const StyledSlider = styled(Slider)`
    margin: 5px;
    width: 80%;
    :first-child{
        background-color: ${(props) => props.color};
    }
`

export default function App(){
    const canvasRef = useRef(null); // Using useRef to reference the canvas
    const [color, setColor] = useState("#1d88d9");
    const [erase, setErase] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(15);

    const [drawings, setDrawings] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextDrawing = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < drawings.length) {
            loadDrawing(nextIndex);
            setCurrentIndex(nextIndex);
            console.log(currentIndex);
        } else {
            canvasRef.current.clear();
            setCurrentIndex(nextIndex);
            console.log("next clicked (new drawing)");
            console.log(currentIndex);
        }
    };

    const handlePrevDrawing = () => {
        const newIndex = currentIndex - 1;
        if (newIndex >= 0) {
            loadDrawing(newIndex);
            setCurrentIndex(newIndex);
            console.log(currentIndex);
        }

    };

    const loadDrawing = (index) => {
        canvasRef.current.clear();
        const drawing = drawings[index];
        canvasRef.current.loadSaveData(drawing, true);
    };

    const handleSaveDrawing = () => {
        if (canvasRef.current) {
            const updatedDrawings = [
                ...drawings.slice(0, currentIndex), // Keep drawings before the current index
                canvasRef.current.getSaveData(),   // Save the edited drawing
                ...drawings.slice(currentIndex + 1) // Keep drawings after the current index
            ];
            setDrawings(updatedDrawings);
            console.log("Saved");
        }
    };



    const handlePenClick = () => {
        setErase(false);
    };
    const handleEraserClick = () => {
        setErase(true);
    };
    const handleUndoClick = () => {
        canvasRef.current.undo();
    };
    const handleClearClick = () => {
        canvasRef.current.clear();
    };

    const printHistory = () => {
        console.log(drawings);
    }

    const lighten = `color-mix(in srgb, ${color}, white 50%)`;


    return(
        <Page>
            <Toolbox color={color}>
                <HexColorPicker color={color} onChange={setColor}/>
                <Inputs>
                    <Buttons>
                        {erase ? <Button onClick={handlePenClick} color={color}>Pen</Button>
                            : <Button onClick={handlePenClick} style={{backgroundColor: lighten}}>Pen</Button>
                        }
                        {erase ? <Button onClick={handleEraserClick} style={{backgroundColor: lighten}}>Eraser</Button>
                            : <Button onClick={handleEraserClick} color={color}>Eraser</Button>
                        }
                        <Button onClick={handleUndoClick} color={color}>Undo</Button>
                        <Button onClick={handleClearClick} color={color}>Clear</Button>
                        <Button onClick={handleNextDrawing}>Next</Button>
                        <Button onClick={handlePrevDrawing}>Prev</Button>
                        <Button onClick={handleSaveDrawing}>Save</Button>
                        <Button onClick={printHistory}>Print</Button>
                    </Buttons>

                    <p>Stroke width</p>
                    <StyledSlider
                        defaultValue={20}
                        min={1}
                        max={60}
                        onChange={setStrokeWidth}
                        color={color}
                    />
                </Inputs>
            </Toolbox>

            {
                erase ?
                    <Canvas
                        ref={canvasRef}
                        brushColor={"white"}
                        brushRadius={strokeWidth}
                        lazyRadius={0}
                        hideGrid={true}
                        canvasWidth={600}
                        canvasHeight={400}
                    />
                    :
                    <Canvas
                        ref={canvasRef}
                        brushColor={color}
                        brushRadius={strokeWidth}
                        lazyRadius={0}
                        hideGrid={true}
                        canvasWidth={600}
                        canvasHeight={400}
                    />
            }
        </Page>
    )
}