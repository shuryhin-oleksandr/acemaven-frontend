import React from 'react'
import styled from "styled-components";

type PropsType = {
    setIsOpen?: (value: boolean) => void,
    text?: string,

}

const CancelButton:React.FC<PropsType> = ({text, setIsOpen}) => {
    return (
        <CancelButtonWrap onClick={() => setIsOpen && setIsOpen(true) }>{text}</CancelButtonWrap>
    )
}

export default CancelButton

const CancelButtonWrap = styled.button`
font-family: "Helvetica Bold", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
min-height: 40px;
max-width: 115px;
width: 100%;
color: #3B3B41;

&:hover {
cursor: pointer
}
`