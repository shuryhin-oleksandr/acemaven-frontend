import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Container = styled.div`
padding: 50px 80px 30px 30px;
min-height: 100% ;
width: 100%;
animation: ${skelet_appear} ease-in-out .4s;
`

export const MainTitle  = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
 
`
export const HeaderOuter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;
`
export const ActionsWrapper = styled.div`
  display: flex;
  max-width: 600px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
export const RegisterButton = styled.button`
  height: 40px;
  min-width: 184px;
  max-width: 184px;
  width: 100%;
  background-color: black;
  outline: none;
  border: none;
  color: white;
  text-transform: uppercase;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
    
  &:hover {
    cursor: pointer;
  }
`
export const RatesWrapper = styled.div`
  width: 100%;
  position: relative;
  animation: ${skelet_appear} ease-in-out .4s;
`