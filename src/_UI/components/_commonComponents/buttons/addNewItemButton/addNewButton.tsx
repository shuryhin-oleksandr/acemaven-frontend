import React from "react";
import styled from "styled-components";


type PropsType = {
    setIsAdd: (value: boolean) => void,
    disabled?: boolean
}

const AddNewButton:React.FC<PropsType> = ({setIsAdd, disabled}) => {
    return (
        <AddButton onClick={() => setIsAdd(true)} disabled={!!disabled}>
            + Add new
        </AddButton>
    )
}

export default AddNewButton

const AddButton = styled.button`
  width: 100%;
  height: 94px;
  border: 1px dashed #828282;
  background: none;
  outline: none;
  color: #828282;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  &:hover {
    cursor: pointer
  }
  
   &:disabled {
    cursor: not-allowed;
  }
`