import styled from "styled-components";

export const DashWrapper = styled.div`
  flex: 1;
  background-color: lightblue;
`;
export const InnerWrapper = styled.div`
  padding: 30px 40px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const WidgetsContainer = styled.div`
  display: flex;
`;

export const WidgetButton = styled.button`
  background: #115b86;
  border-radius: 4px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  line-height: 16px;
  padding: 12px 40px;
  font-family: "Helvetica Bold", sans-serif;
  outline: none;
  cursor: pointer;
`;
