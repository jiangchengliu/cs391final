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