import styled from "styled-components";

export const OperationNumber = styled.div`
  margin-bottom: 17px;
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  line-height: 57.26px;
`;

export const BookingTitle = styled.span`
  font-family: "Helvetica Thin", sans-serif;
  text-transform: uppercase;
  color: #828282;
  font-size: 24px;
  margin-bottom: 13px;
  margin-right: 7px;
`;

export const NumberOfBooking = styled.div`
  text-transform: none;
  margin-left: 10px;
  color: #333333;
  font-family: "Helvetica Light", sans-serif;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: baseline;
  
`;

export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px 0 28px;
  border-bottom: 1px solid #bdbdbd;
  position: relative;
`;

export const SectionTitle = styled.div<{ margin_bottom?: string }>`
  font-family: "Helvetica Bold", sans-serif;
  color: #1ab8e5;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: ${({ margin_bottom }) =>
    margin_bottom ? margin_bottom : "17px"};
`;

export const ShipmentPartsRow = styled.div`
  display: flex;
  //width: 60%;
  //justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  margin-bottom: 25px;
`;
