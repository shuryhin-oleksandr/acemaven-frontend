import styled, { keyframes } from "styled-components";

type PropsStyle = {
  c?: string;
  bc?: string;
  w?: string;
};

const openPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  } 
`;

export const PopupOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${openPopup} ease-in-out 0.3s;
  padding: 100px 0;
`;

export const PopupContent = styled.form`
  max-width: 1180px;
  width: 100%;
 
  background-color: white;
  position: relative;
  padding: 50px 50px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const FormTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  margin-bottom: 35px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
`;
export const RegisterButton = styled.button`
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  height: 40px;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const Inner = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 145px 0 65px;
`;

export const CloseButton = styled.div`
  outline: none;
  background: none;
  border: none;
  position: absolute;
  top: 26px;
  right: 24px;

  &:hover {
    cursor: pointer;
  }
`;

export const InfoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 10px;
  border-bottom: 1px solid #4f4f4f;
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

export const FieldsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 50px;
`;
export const FieldOuter = styled.div`
  width: 100%;
  min-width: 110px;
  max-width: 195px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;
export const Label = styled.div`
  text-transform: uppercase;
  color: #115b86;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  margin-bottom: 6px;
`;
export const Content = styled.div<PropsStyle>`
  color: ${({ c }) => (c ? c : "black")};
  font-family: "Helvetica Light", sans-serif;
  font-size: 18px;
  text-transform: capitalize;
`;
export const Cancel = styled.button<PropsStyle>`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
background: white;
outline: none;
border: 1px solid #3B3B41;
height: 40px;
max-width: 115px;
width: 100%;
color: #3B3B41;
transition: .3s;

&:hover {
 transition: .3s;
 background-color: #E0E0E0;
cursor: pointer
}
`
