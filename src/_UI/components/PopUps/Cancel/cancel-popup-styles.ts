import styled, {keyframes} from 'styled-components'

const shownPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


export const PopupContainer = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: rgba(0, 0, 0, .3);
display: flex;
align-items: center;
justify-content: center;
z-index: 600;
animation: ${shownPopup} ease-in-out .3s;
`

export const PopupContent = styled.div`
background-color: white;
max-width: 800px;
max-height: 400px;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 50px;
position: relative;
`

export const CloseBtn = styled.div`
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

export const CancelTitle = styled.div`
color: black;
font-family: "Helvetica Bold", sans-serif;
font-size: 16px;
margin-bottom: 100px;
`
export const ButtonsWrap = styled.div`
width: 100%;  
display: flex;
justify-content: space-between;
max-width: 500px;
`
export const CancelButton = styled.button`
height: 40px;
max-width: 231px;
width: 100%;
border: 1px solid #3B3B41;
background-color: transparent;
color: #3B3B41;
transition: .2s;
font-family: "Helvetica Bold", sans-serif;
font-size: 14px;
margin: 0 15px;

&:hover {
  cursor: pointer;
  background-color: black;
  color: white;
  transition: .2s;
}
`