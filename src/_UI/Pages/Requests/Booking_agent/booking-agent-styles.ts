import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const BookingWrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${skelet_appear} ease-in-out .2s;
`
export const BookingContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 80px 50px 30px;
`
export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; 
  margin-bottom: 36px;
`
export const ContentTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  line-height: 57.26px;
  color: black;
`
export const ContentTable = styled.div`
  
`
