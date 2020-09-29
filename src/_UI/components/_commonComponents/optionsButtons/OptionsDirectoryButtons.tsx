import React from 'react';
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import styled from "styled-components";


type PropsType = {
    setDirectory?: VoidFunctionType,
    directory?: string
}

const OptionsDirectoryButtons:React.FC<PropsType> = ({directory, setDirectory}) => {
    return (
        <OptionsButtonsWrap>
            <OptionButtonImport onClick={() => setDirectory && setDirectory('Import')} directory={directory}>
                Import
            </OptionButtonImport>
            <OptionButtonExport onClick={() => setDirectory && setDirectory('Export')} directory={directory}>
                Export
            </OptionButtonExport>

        </OptionsButtonsWrap>
    )
}

export default OptionsDirectoryButtons

type PropsStyle = {
    directory?: string
}

const OptionsButtonsWrap = styled.div`
  min-width: 199px;
  max-width: 199px;
  height: 40px;
  width: 100%;
  background-color: #ECECEC;
  border-radius: 2px;
  border: 1px solid #ECECEC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-bottom: 25px;
`
const OptionButtonImport = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  max-width: 95px;
  height: 32px;
  background-color: ${({directory}) => directory ===  'Import' ? '#1AB8E5' : 'transparent'};
  border-radius: 2px;
  color: ${({directory}) => directory === 'Import' ? 'white' : 'black'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  box-shadow: ${({directory}) => directory ===  'Import' && '1px 1px 4px rgba(0, 0, 0, 0.25)'};
  transition: .3s;
  
  &:hover {
    cursor: pointer;
  }
`
const OptionButtonExport = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  max-width: 95px;
  height: 32px;
  background-color: ${({directory}) => directory === 'Export' ?  '#1AB8E5' : 'transparent'};
  border-radius: 2px;
   color: ${({directory}) => directory === 'Export' ? 'white' : 'black'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  box-shadow: ${({directory}) => (directory === 'Export') && '1px 1px 4px rgba(0, 0, 0, 0.25)'};
  transition: .3s;
  
  &:hover {
    cursor: pointer;
  }
`