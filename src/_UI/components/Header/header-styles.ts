import styled from 'styled-components'


export const HeaderContainer = styled.div`
  height: 60px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0,0,0,0.1);
`

export const LogoWrap = styled.div`
font-family: "Helvetica Bold", sans-serif;
font-size: 18px;
color: black;
padding-left: 50px;
`

export const InfoWrap = styled.div`
width: 19%;
display: flex;
justify-content: space-between;
padding-right: 80px;
`

export const ButtonWrap = styled.button`
outline: none;
background: none;
border: none;
padding: 0;
  &:hover {
    cursor: pointer;
  }
`
export const PhotoWrap = styled.div`
border-radius: 100%;
display: flex;
align-items: center;
justify-content: center;
   img {
   width: 40px;
   height: 40px;
   }
   
   &:hover {
    cursor: pointer;
   }
`