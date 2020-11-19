import styled from 'styled-components'

export const OperationsPopupOuter = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .3);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 150px;
`
export const OperationsPopupInner = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  position: relative;
  
`
export const OperationsPopupContent = styled.div`
  padding: 145px 200px 70px;
 display: flex;
 flex-direction: column;
 align-items: center;
`
export const OperationsPopupMessage = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  line-height: 21px;
  color: black;
  margin-bottom: 93px;
  text-align: center;
`

export const OperationsPopupButton = styled.button`
  height: 40px;
  width: 128px;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`