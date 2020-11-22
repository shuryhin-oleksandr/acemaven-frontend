import styled from 'styled-components'

export const TemporaryWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`
export const TemporaryInner = styled.div`
  background-color: white;
  max-width: 800px;
  width: 100%;
  position: relative;
`
export const TemporaryContent = styled.div`
  padding: 160px 170px 120px;
`
export const Question = styled.div`
  font-family: 'Helvetica Light', sans-serif;
  font-size: 18px;
  color: black;
  margin-bottom: 56px;
`
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export const SaveButton = styled.button`
  background-color: black;
  color: white;
  outline: none;
  border: none;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 80px;
  margin-right: 15px;
  
  &:hover {
    cursor: pointer;
  }
`
export const CancelButton = styled.button`
  background-color: white;
  color: #3b3b41;
  outline: none;
  border: 1px solid #3b3b41;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
  height: 40px;
  width: 80px;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`

