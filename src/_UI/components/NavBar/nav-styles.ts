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
export const ArrowWrap = styled.div<{ isHover?: boolean }>`
width: 30px;
height: 30px;
border-radius: 50px;
background-color: ${({isHover}) => isHover ? 'rgba(255, 255, 255, .3)' : 'transparent'};
 transition: .3s;
 display: flex;
 align-items: center;
 justify-content: center;

&:hover {
  transition: .3s;
}
`
export const Arrow = styled.div<{ isHover?: boolean, isSmallBar?: boolean }>`
clip-path: polygon(57% 0, 100% 50%, 57% 100%, 40% 100%, 85% 50%, 40% 0);
background-color: ${({isHover}) => isHover ? '#00c5ff' : 'rgba(255, 255, 255, .3)'};
width: 18px;
height: 18px;
transition: .3s;
transform: ${({isSmallBar}) => !isSmallBar ? 'rotate(180deg)' : 'none'};
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
padding-left: 0;
padding-top: 30px;
animation: ${shown} ease-in-out .3s;
`

export const NavSmallContainer = styled.div`
width: 50px;
background-color: black;
height: 100%;
display: flex;
flex-grow: 1;
flex-direction: column;
align-items: flex-start;
padding-left: 5px;
padding-top: 30px;
animation: ${shown} ease-in-out .3s;
`
export const ChatExtension = styled.div`
width: 200px;
background-color: #3B3B41;
color: white;
padding-top: 45px;
font-family: 'Helvetica Reg', sans-serif;
font-size: 15px;
line-height: 17.20px;
padding-left: 20px;
text-transform: uppercase;
display: flex;
flex-direction: column;
align-items: flex-start;
&:hover {
  cursor: pointer;
}
`
export const ChatLinkWrap = styled.div`
width: 100%;
margin-bottom: 35px;

a {
  text-decoration: none;
  color: #ffffff;
  transition: .5s;
}
a:hover {
  text-decoration: none;
  color: #00C5FF;
  transition: .5s;
}
a:active {
  text-decoration: none;
  color: #00C5FF;
  transition: .5s;
}

`

export const NavButton = styled.button`
  outline: none;
  border: none;
  background: none;
  color: #ffffff;
  transition: .4s;
  
  &:hover {
    cursor: pointer;
    transition: .4s;
    color: #00C5FF;
  }
  
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