import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 403px;
  max-height: 403px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  z-index: 35;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`

export const TextWrap = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  color: black;
  font-size: 18px;
  margin-bottom: 30px;
 text-align: center;
  width: 100%;
`
export const ButtonWrap = styled.button`
  height: 40px;
  width: 150px;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  
  &:hover {
    cursor: pointer;
  }
`