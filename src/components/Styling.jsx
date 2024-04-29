import styled from 'styled-components';

export const Page= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Toolbox = styled.div`
    background-color: color-mix(in srgb, ${(props) => props.color}, white 75%);
    padding: 10px;
    margin: 10px 0;
    width: 500px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
`


export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    align-items: center;
`

export const Buttons = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    width: 90%;
    height: 70%;
    :last-of-type{
        width: 50%;
    }
    
`
export const Button = styled.button`
    background-color: #e5e5e5;
    margin: auto;

    &:hover {
        background-color: color-mix(in srgb, ${(props) => props.color}, white 50%);
        color: black;
        transition: all 0.3s ease;
        border: 2px solid white;
    }
`