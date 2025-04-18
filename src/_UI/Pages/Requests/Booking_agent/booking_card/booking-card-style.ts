import styled, {keyframes} from 'styled-components'

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${skelet_appear} ease-in-out .2s;
`
export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 55px 50px 30px;
  position: relative;
`
export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #bdbdbd;
  position: relative;
`
export const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const BookingNumber = styled.div`
  margin-bottom: 17px;
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  line-height: 57.26px;
`
export const BookingStatus = styled.span`
  font-family: "Helvetica Reg", sans-serif;
  color: #1b1b25;
  font-size: 18px;
  line-height: 21px;
  text-transform: capitalize;
`
export const ActionsButtons = styled.div`
  display: flex;
  @media (max-width: 1280px) {
    //flex-direction: row-reverse;
    flex-wrap: wrap;
  }
`
export const AcceptButton = styled.button`
  height: 40px;
  width: 134px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica ExtraReg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1280px) {
    margin-bottom: 15px;
    font-size: 12px;
  }
`
export const ConfirmButton = styled.button`
  height: 40px;
  width: 200px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica ExtraReg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: rgba(0, 0, 0, .6);
    cursor: not-allowed;
    pointer-events: none;
  }
`
export const AssignButton = styled(AcceptButton)``
export const RejectButton = styled.button <{margin?: string}>`
  height: 40px;
  padding: 0 39px;
  outline: none;
  border: 1px solid #3b3b41;
  background: none;
  color: #3b3b41;
  font-family: "Helvetica ExtraReg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: rgba(0, 0, 0, .07);
  }
  
   @media (max-width: 1280px) {
    //width: 205px;
    font-size: 12px;
    margin-right: 15px;
  }
`
export const GeneralBookingInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px 0 28px;
  border-bottom: 1px solid #bdbdbd;
`
export const GeneralBookingContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`
export const GeneralBookingContentForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`
export const EditButtonsWrapper = styled.div<{top?: string, right?: string}>`
display: flex;
// position: absolute;
// right: ${({right}) => right ? right : '0px'};
// top: ${({top}) => top ? top : '18px'};
animation: ${skelet_appear} ease-in-out .2s;
`
export const FormOperationButton = styled.button`
  outline: none;
  border: none;
  background: none;
  &:hover {
    cursor: pointer
  }
`
export const GeneralShipType = styled.div<{margin_top?: string}>`
  //width: 99px;
  //height: 99px;
  margin-right: 30px;
  margin-top: ${({margin_top}) => margin_top ? margin_top : '-5px' };
  img {
    //width: 100%;
    //height: 100%;
  }
`
export const InfoRow = styled.div<{margin_right?: string, margin_bottom?: string}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({margin_bottom}) => margin_bottom ? margin_bottom : '15px'};
  margin-right: ${({margin_right}) => margin_right ? margin_right : '0px'};
`

export const InfoRowLabel = styled.div<{font_size?: string, font_color?: string, font_family?: string }>`
  font-family: ${({font_family}) => font_family ? font_family : 'Helvetica Bold, sans-serif'};
  color: ${({font_color}) => font_color ? font_color : '#115b86'};
  font-size: ${({font_size}) => font_size ? font_size : '14px'};
  margin-bottom: 4.2px;
  text-transform: uppercase;
`
export const InfoRowValue = styled.div<{font_size?: string}>`
  font-family: "Helvetica Reg", sans-serif;
  color: #1b1b25;
  font-size: ${({font_size}) => font_size ? font_size : '14px'};
  line-height: 16.49px;
`
export const ValuesShipmentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
export const ShipmentInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px 0 28px;
  border-bottom: 1px solid #bdbdbd;
`
export const CalendarIcon = styled(GeneralShipType)`
`
export const AgentBankWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  position: relative;
`
export const AgentBankColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 0 0;
`
export const AgentBankLabel = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: #115b86;
  font-size: 14px;
  text-transform: uppercase;
`
export const AgentBankValue = styled.div`
  font-family: "Helvetica Light", sans-serif;
  color: black;
  font-size: 14px;
  text-transform: capitalize;
`
export const RouteName = styled.div`
  font-family: "Helvetica Thin", sans-serif;
  font-size: 38px;
  color: #000000;
  line-height: 1;
`;