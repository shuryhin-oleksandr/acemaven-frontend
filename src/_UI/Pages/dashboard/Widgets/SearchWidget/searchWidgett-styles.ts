import styled from "styled-components";

type PropsStyle = {
  right?: string;
  bottom?: string;
  scroll?: boolean;
  justify_content?: string;
  fields_amount?: number;
  shipping_value?: number;
};

export const RelativeWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

export const Container = styled.div<PropsStyle>`
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 20px 30px 15px 30px;
  max-height: 500px;
  overflow: ${({ scroll }) => (scroll ? "scroll" : "visible")};
  max-width: 950px;
  width: 100%;
`;

export const Heading = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 7px;
  font-size: 30px;
  line-height: 36px;
  font-family: "Helvetica Bold", sans-serif;
  color: black;
`;

export const FieldWrapper = styled.div`
  margin-right: 13px;
  width: 18%;
`;

export const ButtonGroup = styled.div<PropsStyle>`
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: ${({ justify_content }) =>
    justify_content ? justify_content : "space-between"};
  position: ${({ shipping_value }) =>
    shipping_value && shipping_value === 3 ? "absolute" : "relative"};
  bottom: ${({ shipping_value }) => (shipping_value === 3 ? "17px" : "0px")};
  right: ${({ shipping_value }) => (shipping_value === 3 ? "30px" : "0px")};
`;

export const AddImg = styled.img`
  margin-right: 10px;
  cursor: pointer;
`;

export const RemoveImg = styled.img`
  cursor: pointer;
  margin-left: 15px;
`;

export const ErrorMessage = styled.div<{ duplicatedCargoError: string }>`
  color: #e76767;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 12px;
  grid-column-start: ${({ duplicatedCargoError }) =>
    duplicatedCargoError.startsWith("Please") ? 5 : 1};
`;
