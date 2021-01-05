import styled, {keyframes} from 'styled-components'

const shownPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


export const BillingPopupContainer = styled.div`
display: flex;
height: 100%;
width: 100%;
align-items: center;
justify-content: center;
z-index: 600;
position: absolute;
animation: ${shownPopup} ease-in-out .3s;
`

export const BillingPopupContent = styled.div`
background-color: white;
max-width: 800px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 100px 70px 90px;
position: relative;
`

export const BillingExchangeTitle = styled.div`
color: rgba(27, 27, 37, 1);
font-family: "Helvetica Light", sans-serif;
font-size: 18px;
margin-bottom: 40px;
`
export const BillingExchangeWrap = styled.div`
width: 100%;  
display: flex;
justify-content: center;
margin-bottom: 51px;
`
export const ExchangeWrap = styled.div`
display: flex;
align-items: center;
margin-right: 39px;
`
export const ExchangeCurrency = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 18px;
  color: rgba(17, 91, 134, 1);
  margin-right: 6px;
`
export const ExchangeRate = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: #000000;
`
export const BillingButtonsWrap = styled.div`
width: 100%;  
display: flex;
justify-content: center;
`
export const BillingProceedButton = styled.button`
height: 40px;
max-width: 146px;
width: 100%;
border: none;
background-color: black;
color: white;
transition: .3s;
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
margin: 0 20px 0 0;
outline: none;
text-transform: uppercase;

&:hover {
  cursor: pointer;
}
`
export const BillingCancelButton = styled.button`
height: 40px;
max-width: 146px;
width: 100%;
border: 1px solid #3B3B41;
background-color: transparent;
color: #3B3B41;
transition: .3s;
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
outline: none;
text-transform: uppercase;

&:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, .07);
  transition: .3s;
}
`