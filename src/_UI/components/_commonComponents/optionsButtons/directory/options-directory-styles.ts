import styled from 'styled-components'

type PropsStyle = {
    directory?: string,
    margin_bottom?: string
}

export const OptionsButtonsWrap = styled.div<PropsStyle>`
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
  margin-bottom: ${({margin_bottom}) =>  margin_bottom ? margin_bottom : '25px'};
`
export const OptionButtonImport = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  max-width: 95px;
  height: 32px;
  background-color: ${({directory}) => directory ===  'import' ? '#1AB8E5' : 'transparent'};
  border-radius: 2px;
  color: ${({directory}) => directory === 'import' ? 'white' : 'black'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  box-shadow: ${({directory}) => directory ===  'import' && '1px 1px 4px rgba(0, 0, 0, 0.25)'};
  transition: .3s;
  
  &:hover {
    cursor: pointer;
  }
`
export const OptionButtonExport = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 95px;
  max-width: 95px;
  height: 32px;
  background-color: ${({directory}) => directory === 'export' ?  '#1AB8E5' : 'transparent'};
  border-radius: 2px;
   color: ${({directory}) => directory === 'export' ? 'white' : 'black'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  box-shadow: ${({directory}) => (directory === 'export') && '1px 1px 4px rgba(0, 0, 0, 0.25)'};
  transition: .3s;
  
  &:hover {
    cursor: pointer;
  }
`