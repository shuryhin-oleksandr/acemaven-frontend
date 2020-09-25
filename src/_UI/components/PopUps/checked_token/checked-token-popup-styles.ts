import styled from 'styled-components'

export const Container  = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: white;
  
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 260px;
  align-items: center;
`

export const Message = styled.div`
font-family: "Helvetica Reg", sans-serif;
font-size: 18px;
color : #828282;
margin-bottom: 50px;
`

export const ButtonWrap = styled.button`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
color : white;
width: 130px;
height: 40px;
background-color: black;

  &:hover {
  cursor: pointer;
  }
`