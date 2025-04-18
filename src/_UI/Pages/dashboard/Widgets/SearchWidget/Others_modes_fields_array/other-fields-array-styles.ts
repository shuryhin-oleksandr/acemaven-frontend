import styled from "styled-components";

export const OneFieldWrapper = styled.div`
  width: 100%;
`;
export const OneFieldContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 12px 0;

  &:hover {
    cursor: pointer;
  }
`;
export const TotalPart = styled.div`
  min-width: 130px;
  min-height: 30px;
  background-color: #ececec;
  border-radius: 4px;
  color: #1b1b25;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;
export const TotalDescriptions = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: black;
  grid-column-end: 4;
  grid-column-start: 3;
  display: flex;
  align-items: center;
`;
export const CalculateButton = styled.button`
  height: 30px;
  width: 130px;
  background: none;
  outline: none;
  border: 1px solid #1b1b25;
  color: #1b1b25;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 13px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.07);
  }
`;
