import styled, { keyframes } from "styled-components";

type PropsStyle = {
  marginBottom?: string;
  button_display: boolean;
};
const show_table = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //padding: 50px 80px 50px 30px;
`;

export const CardsAbsoluteWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
z-index: 70;
padding: 100px 0;
`

export const CardContainer = styled.div<{bookingPopupVisible?: boolean}>`
  max-width: 950px;
  min-width: 500px;
  width: 100%;
  border: 1px solid #7c7c89;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  background-color: white;
  display: ${({bookingPopupVisible}) => bookingPopupVisible ? 'none' : 'block'};
`;

export const CardInner = styled.div`
  width: 100%;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const UpperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;
export const InfoPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
export const GeneralPart = styled.div`
  display: flex;
  flex-direction: column;
`;
export const GeneralWrap = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
export const ShippingType = styled.div`
  margin-right: 10px;
`;
export const DirectionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Direction = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  color: black;
  margin-bottom: 6px;
`;
export const Carrier = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  color: #7c7c89;
`;

export const AdditionalWrap = styled.div``;
export const DateLine = styled.div`
  display: flex;
  margin-bottom: 3px;
`;
export const DateName = styled.div`
  color: #115b86;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  margin-right: 5px;
`;
export const DateValue = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
`;

//export const CommentsPart = styled.div`display: flex;flex-direction: column;`
export const RatingPart = styled.div`
  margin-top: 38px;
`;
export const CompanyName = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 8px;
`;
export const RatingWrap = styled.div`
  img {
    margin-right: 7.75px;
  }
`;
export const NoRatingUpperText = styled.div<{margin_bottom?: string}>`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 13px;
  color: #7C7C89;
  margin-bottom: ${({margin_bottom}) => margin_bottom ? margin_bottom : '0px'};
`
export const NoRatingUnderText = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 12px;
  color: #7C7C89;
`

export const TotalPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 50%;
`;
export const CalculationWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20px;
`;
export const CalculationLine = styled.div<{ marginBottom?: string }>`
  display: flex;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "5px")};
`;
export const CalcName = styled.div`
  color: #115b86;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-right: 5px;
`;
export const CalcValue = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
`;
export const BookButton = styled.div<PropsStyle>`
  display: ${({ button_display }) => (button_display ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 120px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica ExtraReg", sans-serif;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

export const HiddenWrapper = styled.div<{margin_top?: string}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({margin_top}) => margin_top ? margin_top : '30px'};
  animation: ${show_table} ease-in-out .3s;
`
export const HiddenTitle = styled.div`
  color: #1ab8e5;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 20px;
  line-height: 23px;
  width: 100%;
  margin-bottom: 14px;
`;
export const HiddenTable = styled.div`
  width: 100%;
`;
export const TableTotal = styled.div`
  width: 100%;
  padding-top: 8px;
`;
export const TotalLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7px;
`;
export const TotalName = styled.div<{font_family?: string}>`
  color: #333333;
  font-family: ${({font_family}) => font_family ? font_family : 'Helvetica ExtraReg, sans-serif'} ;
  font-size: 14px;
  line-height: 16.5px;
  margin-right: 10px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;
export const TotalValue = styled.div<{font_family?: string}>`
  color: #333333;
  font-family: ${({font_family}) => font_family ? font_family : 'Helvetica Reg, sans-serif'} ;
  font-size: 14px;
  line-height: 16.5px;
  width: 25%;
  display: flex;
  justify-content: flex-end;
`;
