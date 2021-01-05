import styled, {keyframes} from 'styled-components'

let show_skeleton = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const BillingWrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${show_skeleton} ease-in-out .4s;
`
export const BillingInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 80px 50px 30px;
`
export const BillingContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
`
export const BillingTitle = styled.div<{ margin_bottom?: string }>`
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${({margin_bottom}) => margin_bottom ? margin_bottom : '45px'};
`

export const Canvas = styled.canvas`
   width: 100%!important;
   height: 650px!important;
   margin-bottom: 40px !important;

  @media (max-width: 1792px) {
     width: 100%!important;
    height: 600px!important;
  }

  @media (max-width: 1440px) {
    width: 97%!important;
    height: 570px!important;
  }

  @media (max-width: 1280px) {
    width: 90%!important;
    height: 570px!important;
  }
   
`

export const ExchangeSpanWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 25px;
`
export const Round = styled.div<{ background?: string }>`
  border-radius: 100px;
  width: 9px;
  height: 9px;
  background-color: ${({background}) => background ? background : '#1ab8e6'};
  margin-right: 6px;
`
export const ExchangeSpan = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  color: #485465;
`