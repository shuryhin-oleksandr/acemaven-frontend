import React from "react";
import styled from "styled-components";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

type PropsType = {
    setIsAdd: VoidFunctionType
}

const AddNewButton:React.FC<PropsType> = ({setIsAdd}) => {
    return (
        <AddButton onClick={() => setIsAdd(true)}>
            + Add new
        </AddButton>
    )
}

export default AddNewButton

const AddButton = styled.div`
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
`