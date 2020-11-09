import styled from "styled-components";

type PropsStyle = {
  widgetsVisible: boolean;
};

export const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30px 2fr 1fr 30px;
  grid-template-rows: 30px 1fr 40px 30px;
  align-items: flex-start;
  & > * {
    z-index: 1;
  }
`;

export const MapWrapper = styled.div`
  grid-area: 1/1/-1/-1;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

export const SearchBox = styled.div`
  grid-area: 2/2/3/3;
  margin-right: 69px;
`;
export const MultiWidgetBox = styled.div<PropsStyle>`
  display: ${({ widgetsVisible }) => (widgetsVisible ? "block" : "none")};
  grid-area: 2/3/3/-2;
`;

export const ButtonBox = styled.div`
  grid-area: -3/2/-2/-2;
  justify-self: flex-start;
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
