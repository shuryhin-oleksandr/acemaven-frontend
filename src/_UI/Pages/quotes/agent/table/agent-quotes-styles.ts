import styled, {keyframes} from 'styled-components'
import done_icon from '../../../../../_UI/assets/icons/ant-design_check-circle-outlined.svg'
import {RateQuoteType} from "../../../../../_BLL/types/quotes/quotesTypes";

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

type PropsStyle = {
    no_rates?: RateQuoteType | null
}

export const SubmittedWrapper = styled.div`
  position: relative;
`
export const DoneIcon = styled.div`
  background: url(${done_icon});
  height: 19px;
  width: 19px;
  position: absolute;
  left: 30px;
`
export const SubmitQuoteButton = styled.button<{disabled?: boolean}>`
  width: 187px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: ${({disabled}) => disabled ? 'rgba(0, 0, 0, .6)' : 'black'};
  border: none;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-left: 20px;
  
  &:hover {
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    
  }
`
export const QuoteCardWrapperForm= styled.form`
  width: 100%;
  height: 100%;
  padding: 50px 80px 50px 30px;
  animation: ${skelet_appear} ease-in-out .2s;
`
export const QuoteCardInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
`
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 28px;
`
export const CardTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  line-height: 57.26px;
  color: black;
`
export const ActionsAgentWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`
export const QuoteOpenStatus = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 18px;
  color: #115b86;
  line-height: 19.86px;
  margin-right: 20px;
`
export const RejectButton = styled.button`
  width: 165px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: white;
  border: 1px solid #1b1b25;
  color: #1b1b25;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-left: 15px;
  transition: .3s;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
`
export const QuoteInfo = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  padding-top: 13.72px;
  padding-bottom: 33.28px;
`
export const GeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
`
export const GeneralTitle = styled.div<{margin_bottom?: string}>`
  font-family: "Helvetica Bold", sans-serif;
  color: #1ab8e5;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: ${({margin_bottom}) => margin_bottom ? margin_bottom : '29px'};
`
export const GeneralInfoContent = styled.div`
  display: flex;
`
export const ShipmentType = styled.div<{margin_right?: string}>`
  width: 99px;
  height: 99px;
  margin-right: ${({margin_right}) => margin_right ? margin_right : '50px'};
  img{
    width: 100%;
    height: 100%;
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
`
export const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10.8px;
`
export const RowTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  line-height: 16.72px;
  color: #115b86;
  margin-bottom: 4.2px;
`
export const RowValue = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16.72px;
  color: #1b1b25;
`
export const ShipmentInfo = styled(GeneralInfo)`
margin-left: 297px;
`
export const ShipmentRow = styled.div`
  display: flex;
  flex-direction: column;
`
export const ShipmentRowTitle = styled(RowTitle)`
margin-bottom: 12px;
`
export const ShipmentRowWeek = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 22px;
  line-height: 26px;
  text-transform: capitalize;
  color: black;
  margin-bottom: 13px;
`

export const CargoInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 28px;
  padding-bottom: 30px;
  border-bottom: 1px solid #bdbdbd;
`
export const CargoShippingModeWrap = styled.div`
   font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: black;
  margin-bottom: 14px;
`
export const CargoContentWrapper = styled.div`
  display: flex;
`

export const CarrierInfo = styled.div`
  display: flex;
  padding-top: 28px;
  padding-bottom: 30px;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-between;
`
export const CarrierWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

export const SurchargesInfo = styled.div<PropsStyle>`
  display: flex;
  padding-top: ${({no_rates}) => no_rates ? '30px' : '0'};
  justify-content: ${({no_rates}) => no_rates ? 'center' : 'space-between'};
`
export const AgentSurchargesTableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`