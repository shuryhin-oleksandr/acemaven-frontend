import styled, {keyframes} from 'styled-components'

let show_skelet = keyframes`
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
`

export const BanksContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 8px;
  padding-right: 12px;
  animation: ${show_skelet} ease-in-out .2s;
`
export const BanksInner = styled.div`
  max-width: 611px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`