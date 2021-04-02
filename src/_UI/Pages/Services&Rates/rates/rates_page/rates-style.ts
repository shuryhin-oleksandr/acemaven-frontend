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
  height: 100%;
  animation: ${skelet_appear} ease-in-out .4s;
`
export const CellWrap = styled.div`
  width: 100%;
  display: flex;
  height: 77px;
  
`