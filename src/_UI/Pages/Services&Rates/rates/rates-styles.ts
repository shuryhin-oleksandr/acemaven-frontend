import styled from 'styled-components'

export const Container = styled.div`
padding: 50px 80px 30px 30px;
height: 100% ;
width: 100%;
`

export const MainTitle  = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
  margin-bottom: 40px;
`
export const HeaderOuter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
export const ActionsWrapper = styled.div`
  display: flex;
  max-width: 569px;
  width: 100%;
  justify-content: space-between;
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