import styled from "styled-components";

export const NoSearchContainer = styled.div`
  display: flex;
  max-width: 950px;
  width: 100%;
  border: 1px solid #bdbdbd;
  background-color: white;
  margin-top: 15px;
`;
export const NoSearchInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  align-items: center;
`;
export const NoSearchText = styled.div`
  max-width: 752px;
  width: 100%;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 17px;
  line-height: 20.63px;
  color: #4f4f4f;
  margin-bottom: 25px;
  text-align: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const QuoteButton = styled.div`
  background-color: black;
  outline: none;
  border: none;
  color: white;
  height: 40px;
  width: 204px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
  }
`;
export const NewSearchButton = styled.div`
  background-color: white;
  outline: none;
  border: 1px solid #4f4f4f;
  color: #4f4f4f;
  height: 40px;
  width: 190px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  text-transform: capitalize;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

export const ErrorMes = styled.div`
  margin-bottom: 15px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: #e76767;
`;
