import styled from "styled-components";


type PropsStyle = {
  c?: string;
  bc?: string;
  w?: string;
};

export const RateContainer = styled.form`
  padding: 50px 80px 30px 30px;
  height: 100%;
  width: 100%;
`;

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const RateTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 48px;
  color: black;
`;

export const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const PauseImg = styled.img`
  height: 33px;
  width: 33px;
  margin-left: 20px;
  cursor: pointer;
`;
export const InfoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 30px;
  border-bottom: 1px solid #115b86;
  margin-bottom: 28px;
`;

export const ShippingMode = styled.div`
  width: 99px;
  height: 99px;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const PauseButton = styled.button`
 outline: none;
 background: none;
 border: none;
 &:hover {
  cursor: pointer;
 }
`

export const FieldsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 40px;
`;
export const FieldOuter = styled.div`
  width: 100%;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom:13px;
`;
export const Label = styled.div`
  text-transform: uppercase;
  color: #115b86;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const RouteName = styled.div`
  font-family: "Helvetica Thin", sans-serif;
  font-size: 38px;
  color: #000000;
  line-height: 1;
`;

export const Content = styled.div<PropsStyle>`
  color: ${({ c }) => (c ? c : "black")};
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  text-transform: capitalize;
  line-height: 1;
`;
