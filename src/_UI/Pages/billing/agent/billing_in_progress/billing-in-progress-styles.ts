import styled, {keyframes} from 'styled-components'

let show_skeleton = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const BillingProgressWrapper = styled.div`
   width: 100%;
   height: 100%;
   animation: ${show_skeleton} ease-in-out .4s;
`
export const BillingProgressInner = styled.div`
   width: 100%;
   height: 100%;
   padding: 50px 70px 50px 30px;
   position: relative;
`
export const BillingProgressContent = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
`

export const BookingNumberWrapper = styled.div<{border_bottom?: string, padding_bottom?: string}>`
  display: flex;
  margin-bottom: 13px;
  padding-bottom: ${({padding_bottom}) => padding_bottom ? padding_bottom : 0};
  border-bottom: ${({border_bottom}) => border_bottom ? border_bottom : 'none'};
`
export const BookingSpan = styled.div`
  font-family: "Helvetica Thin", sans-serif;
  font-size: 24px;
  color: #828282;
  text-transform: uppercase;
  margin-right: 10px;
`
export const NumberSpan = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 24px;
  color: #333333;
`
export const StatusSpan = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 18px;
  color: #00c5ff;
  margin-right: 5px;
`
export const StatusDescriptionSpan = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  color: #1b1b25;
`