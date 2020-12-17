import styled from 'styled-components'


export const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 80px 10px 50px;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0,0,0,0.1);
  z-index: 300;
`

export const LogoWrap = styled.div`
font-family: "Helvetica Bold", sans-serif;
font-size: 18px;
color: black;

  &:hover {
    cursor: pointer;
  }
`

export const InfoWrap = styled.div`
display: flex;
justify-content: space-between;
`

export const ButtonWrap = styled.button`
outline: none;
background: none;
border: none;
padding: 0;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 22px;
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
   border-radius: 100%;
   }
   
   &:hover {
    cursor: pointer;
   }
`