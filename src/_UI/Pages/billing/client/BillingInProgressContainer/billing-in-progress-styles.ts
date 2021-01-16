import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Heading = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  line-height: 57px;
  color: #000000;
  margin-bottom: 20px;
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px 10px 0 0;
  box-shadow: 4px 0 0 rgba(0, 0, 0, 0.1);
`;
export const Content = styled.div<{ isHide?: boolean }>`
  width: 100%;
  height: ${({ isHide }) => (!isHide ? "490px" : "100%")};
  padding: 10px 80px 50px 30px;
  display: flex;
  flex-direction: column;
`;

export const BillingCardContainer = styled.div`
  border: 1px solid #ececec;
  box-sizing: border-box;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
  padding: 28px 40px 20px 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;
`;

export const Route = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const RouteText = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #1b1b25;
  margin-bottom: 4px;
`;

export const InfoTitle = styled.span`
  font-family: "Helvetica bold", sans-serif;
  font-size: 15px;
  line-height: 18px;
  text-transform: uppercase;
  color: #115b86;
  margin-right: 10px;
`;

export const InfoText = styled.span`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #1b1b25;
`;

export const MainInfo = styled.div`
min-width: 270px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

export const ChargesBlock = styled.div`
  display: flex;
  width: 100%;
  max-width: 240px;
  min-width: 200px;
  justify-content: center;
  position: relative;
`;

export const ChargeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding: 7px 0;
`;
export const ChargeTitle = styled.span`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-transform: capitalize;
  color: #1b1b25;
`;
export const ChargeValue = styled.span`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  text-transform: uppercase;
  color: #1b1b25;
`;

export const DueToText = styled.div`
  position: absolute;
  top: -17px;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
  text-transform: lowercase;
  color: #eb5757;
`;

export const CardsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;
