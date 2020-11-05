import styled from 'styled-components'

export const OneFieldWrapper = styled.div`
  width: 100%;
`
export const OneFieldContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
`
export const TotalPart = styled.div`
  width: 130px;
  height: 30px;
  background-color: #ececec;
  border-radius: 4px;
  color: #1b1b25;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-right: 10px;
`
export const TotalDescriptions = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: black;
  padding-top: 5px;
`
export const CalculateButton = styled.button`
  height: 30px;
  width: 130px;
  background: none;
  outline: none;
  border: 1px solid #1b1b25;
  color: #1b1b25;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 13px;
  transition: .3s;
  
  &:hover {
    cursor:pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
  
`