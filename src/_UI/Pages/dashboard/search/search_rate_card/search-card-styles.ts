import styled, {keyframes} from 'styled-components'

type PropsStyle = {
    marginBottom?: string,
    button_display: boolean
}
const show_table = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const SearchWrapper = styled.div`
    width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding: 50px 80px 50px 30px;
`

export const CardContainer = styled.div`
  max-width: 800px;
  min-width: 500px;
  width: 100%;
 border: 1px solid #7c7c89;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

export const CardInner = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
 
`
export const UpperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  
  &:hover {
    cursor:pointer;
  }
`
export const InfoPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`
export const GeneralPart = styled.div`
  display: flex;
  flex-direction: column;
`
export const GeneralWrap = styled.div`
display: flex;
margin-bottom: 15px;
`
export const ShippingType = styled.div`
  margin-right: 10px;
`
export const DirectionWrap = styled.div`
  display: flex;
  flex-direction: column;
`
export const Direction = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  color: black;
  margin-bottom: 6px;
`
export const Carrier = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  color: #7c7c89;
`


export const AdditionalWrap = styled.div``
export const DateLine = styled.div`
  display: flex;
  margin-bottom: 3px;
`
export const DateName = styled.div`
  color: #115b86;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  margin-right: 5px;
`
export const DateValue = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
`


//export const CommentsPart = styled.div`display: flex;flex-direction: column;`
export const RatingPart = styled.div`
margin-top: 38px;
`
export const CompanyName = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 8px;
`
export const RatingWrap = styled.div`
  img {
    margin-right: 7.75px;
  }
`


export const TotalPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 50%;
`
export const CalculationWrap = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
`
export const CalculationLine = styled.div<{marginBottom?: string}>`
display: flex;
margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : '5px'};
`
export const CalcName = styled.div`
  color: #115b86;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-right: 5px;
`
export const CalcValue = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
`
export const BookButton = styled.div<PropsStyle>`
  display: ${({button_display}) => button_display ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 120px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
   &:hover {
      cursor: pointer;
   }
`

export const HiddenWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: ${show_table} ease-in-out .3s;
`
export const HiddenTitle = styled.div`
  color: #1ab8e5;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 20px;
  line-height: 23px;
  width: 100%;
  margin-bottom: 14px;
`
export const HiddenTable = styled.div`
  width: 100%
`
export const TableTotal = styled.div`
  width: 100%;
  padding-top: 8px;
`
export const TotalLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7px;
`
export const TotalName = styled.div`
  color: #333333;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16.5px;
  margin-right: 120px;
  text-align: right;
  width: 90%;
  display: flex;
    justify-content: flex-end;
`
export const TotalValue = styled.div`
  color: #333333;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16.5px;
  width: 10%;
  display: flex;
    justify-content: flex-end;
`




