import {useState} from 'react';
import styled from 'styled-components';
import {Toolbox, Inputs, Buttons, Button} from './Styling.jsx'
import './../App.css';

import { HexColorPicker } from "react-colorful";
import {Slider} from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const StyledSlider = styled(Slider)`
    margin: 5px;
    width: 80%;
    :first-child{
        background-color: ${(props) => props.color};
    }
    &:hover{
        :first-child{
            transition: all 0.3s ease;
            border: 1.3px solid white;
            background-color: ${(props) => props.color};
        }
    }
`





export default function ToolBox(props){


    const handlePenClick = () => {
        props.setErase(false);
    };
    const handleEraserClick = () => {
        props.setErase(true);
    };
    const handleUndoClick = () => {
        props.canvasRef.current.undo();
    };
    const handleClearClick = () => {
        props.canvasRef.current.clear();
    };

    const lighten = `color-mix(in srgb, ${props.color}, white 50%)`;


    return(
        <Toolbox color={props.color}>
            <HexColorPicker color={props.color} onChange={props.setColor}/>

            <Inputs>
                <Buttons>
                    {props.erase ? <Button onClick={handlePenClick} color={props.color}>Pen</Button>
                        : <Button onClick={handlePenClick} style={{backgroundColor: lighten}}>Pen</Button>
                    }
                    {props.erase ? <Button onClick={handleEraserClick} style={{backgroundColor: lighten}}>Eraser</Button>
                        : <Button onClick={handleEraserClick} color={props.color}>Eraser</Button>
                    }
                    <Button onClick={handleUndoClick} color={props.color}>Undo</Button>
                    <Button onClick={handleClearClick} color={props.color}>Clear</Button>
                </Buttons>

                <p>Stroke width</p>
                <StyledSlider
                    defaultValue={20}
                    min={1}
                    max={60}
                    onChange={props.setStrokeWidth}
                    color={props.color}
                />
            </Inputs>
        </Toolbox>
    )
}