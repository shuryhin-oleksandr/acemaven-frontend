import styled from 'styled-components'
import fonts from '../../theming/fonts'


export const NavContainer = styled.div`
max-width: 210px;
min-width: 210px;
background-color: black;
min-height: 100vh;
height: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 15px;
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
  align-items: center;
  justify-content: center;
  min-height: 60px;
  height: 100%;
   a {
    width: 100%;
    height: 100%;
    text-decoration: none;
    display: flex;
   }
   
   &:hover {
     cursor:pointer;
   }
`

export const Name = styled.div`
  ${fonts.asap(15, 17, 0, 500)};
  color: white;
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