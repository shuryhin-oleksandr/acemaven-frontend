import styled, {keyframes} from 'styled-components'

type PropsStyles = {
    checked?: any,
    active?: any
}

let shown = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const NavContainer = styled.div`
max-width: 230px;
width: 100%;
min-width: 210px;
background-color: black;
flex-grow: 1;
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 0px;
padding-top: 30px;
`

export const NavSmallContainer = styled.div`
min-width: 50px;
max-width: 50px;
width: 100%;
background-color: black;
min-height: 100vh;
height: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 5px;
padding-top: 30px;

`

export const LinkWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60px;
   &:hover {
     cursor:pointer;
   }
`
export const Outer = styled.div`
    width: 100%;
    height: 100%;
    text-decoration: none;
    display: flex;
    margin-bottom: 10px;
`

export const Name = styled.div<PropsStyles>`
 font-family: "Helvetica Reg", sans-serif;
  font-size: 15px;
  color: ${({checked}) => checked ? '#00C5FF' : 'white'};
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
`
export const IconWrap = styled.div`
  width: 18%;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
`
export const NestedOuter = styled.div`
  animation: ${shown} ease-in-out .3s;
   width: 100%;
`

export const NestedWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 50px;

  a {
    width: 100%;
    display: flex;
    height: 100%;
    text-decoration: none;
  
  }
   &:hover {
     cursor:pointer;
   }
`
export const NestedName = styled.div<PropsStyles>`
  width: 100%;
  padding: 0 10px 0 38px;
  color: ${({active}) => active ? '#00C5FF' : 'white'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 15px;
  transition: .2s;
  
  &:hover {
      color: #00C5FF;
      transition: .2s;
    }
`