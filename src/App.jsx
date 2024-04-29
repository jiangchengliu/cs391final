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
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handleNextDrawing = () => {
        if (currentIndex < drawings.length - 1) {
            const nextIndex = currentIndex + 1;
            loadDrawing(nextIndex);
            console.log("next clicked");
        } else {
            canvasRef.current.clear();
            console.log("next clicked (new drawing)");
        }
    };

    const handlePrevDrawing = () => {
        const newIndex = currentIndex - 1;
        loadDrawing(newIndex);
    }

    const loadDrawing = (index) => {
        if (index >= 0 && index < drawings.length) {
            canvasRef.current.clear();
            const drawing = drawings[index];
            canvasRef.current.loadSaveData(drawing, true);
            setCurrentIndex(index);
        }
    }

    const handleSaveDrawing = () => {
        if (canvasRef.current) {
            setDrawings(prevDrawings => {
                const updatedDrawings = [...prevDrawings.slice(0, currentIndex + 1), canvasRef.current.getSaveData()];
                setCurrentIndex(updatedDrawings.length - 1);
                return updatedDrawings;
            });
        }
        console.log("Saved");
    }

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