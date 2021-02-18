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


export const Info = styled.div`
  max-width: 115px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledTooltipItem = styled.li`
  font-family: "Helvetica Reg", sans-serif;
  cursor: pointer;
  font-size: 18px;
  line-height: 21px;
  color: #1b1b25;
  margin-bottom: 15px;
  :last-child {
    margin-bottom: 0;
  }
`;

export const ExchangeRateTooltipContainer = styled.div`
 display: flex;
  flex-direction: column;
  width: 100%;
`

export const TodayHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 13px;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 13px;
`
export const TodayHeaderTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: #000000;
  font-size: 14px;
`
export const TodayHeaderDate = styled.div`
 font-family: "Helvetica Reg", sans-serif;
 color: #115B86;
 font-size: 12px;
`
export const TodayExchange = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`