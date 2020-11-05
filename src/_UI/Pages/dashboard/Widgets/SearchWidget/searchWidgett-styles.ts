import styled from "styled-components";

type PropsStyle = {
  right?: string;
  bottom?: string;
  scroll?: boolean;
  justify_content?: string
};

export const RelativeWrapper = styled.div`
  position: relative;
`;

export const Container = styled.div<PropsStyle>`
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 20px 30px 12px 30px;
  max-height: 500px;
  overflow: ${({ scroll }) => (scroll ? "scroll" : "visible")};
  max-width: 800px;
  width: 100%;
  margin-bottom: 15px;
`;

export const Heading = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 7px;
  font-size: 30px;
  line-height: 36px;
  font-family: "Helvetica Bold", sans-serif;
`;

export const FieldWrapper = styled.div`
  margin-right: 13px;
  width: 18%;
`;

export const ButtonGroup = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: ${({justify_content}) => justify_content ? justify_content : 'space-between'};
  position: sticky;
  bottom: ${({ bottom }) => (bottom ? bottom : "22px")};
  right: ${({ right }) => (right ? right : "30px")};
`;

export const AddImg = styled.img`
  margin-right: 10px;
  cursor: pointer;
`;

export const RemoveImg = styled.img`
  cursor: pointer;
  margin-left: 15px;
`;
