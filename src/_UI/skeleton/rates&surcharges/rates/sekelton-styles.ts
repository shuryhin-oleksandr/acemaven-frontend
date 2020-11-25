import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const SkeletonWrapper = styled.div`
  padding: 50px 80px 50px 30px;
  width: 100%;
  animation: ${skelet_appear} ease-in-out .2s;
`