import styled, {keyframes} from 'styled-components'

const openPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  } 
`

export const PopupOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${openPopup} ease-in-out .3s;
  padding: 100px 0;
`

export const PopupContent = styled.div`
  max-width: 800px;
  width: 100%;
  align-items: center;
  background-color: white;
  display: flex;
  justify-content: center;
  position: relative;
`

export const Inner = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 145px 0 65px;
`
export const TextWrap = styled.div`
  text-align: center;
  width: 100%;
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  margin-bottom: 10px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 305px;
  width: 100%;
  margin-top: 100px;
`
export const CloseButton = styled.div`
  outline: none;
  background: none;
  border: none;
  position: absolute;
  top: 5%;
  right: 3%;
  
  &:hover {
    cursor: pointer;
  }
`