import styled, {keyframes} from 'styled-components'

export const Outer = styled.div`
  width: 100%;
  position: relative;
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
  top: 22%;
  //animation: ${change_img_animation} ease-in-out infinite 4s alternate;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
`
export const ModeIconBlue = styled.img`
  position: absolute;
  left: 30px;
  top: 22%;
  //animation: ${change_img_animation} ease-in-out infinite 4s alternate;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
`

export const SpanMode = styled.div`
transition: .3s;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    transition: .3s;
  }
`