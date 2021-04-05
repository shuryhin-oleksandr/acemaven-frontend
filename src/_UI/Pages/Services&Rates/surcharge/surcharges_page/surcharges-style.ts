import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Outer = styled.div`
  width: 100%;
  position: relative;
  animation: ${skelet_appear} ease-in-out .4s;
`
export const CellWrap = styled.div`
  width: 100%;
  display: flex;
  height: 77px;
 
`

let change_img_animation = keyframes`
 0% {
    opacity:1;
  }
  45% {
    opacity:1;
  }
  55% {
    opacity:0;
  }
  100% {
   opacity:0;
  }
`

export const ModeIcon = styled.img`
  position: absolute;
  left: 0;
  //top: 10px;
  //animation: ${change_img_animation} ease-in-out infinite 4s alternate;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
`
export const ModeIconBlue = styled.img`
  position: absolute;
  left: 0;
   //top: 10px;
  animation: ${change_img_animation} ease-in-out infinite 1s alternate;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
`

export const SpanMode = styled.div``