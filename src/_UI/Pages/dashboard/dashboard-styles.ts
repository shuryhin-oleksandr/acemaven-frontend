import styled from "styled-components";

type PropsStyle = {
  widgetsVisible: boolean;
};

export const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30px 5fr 2fr 30px;
  grid-template-rows: 30px 1fr 40px 30px;
  align-items: flex-start;
  & > * {
    z-index: 1;
  }
`;

export const Back = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  grid-area: 1/1/-1/-1;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

export const MapWrapper = styled.div`
  grid-area: 1/1/-1/-1;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

export const SearchBox = styled.div<PropsStyle>`
  grid-area: 2/2/3/3;
  display: ${({ widgetsVisible }) => (widgetsVisible ? "block" : "none")};
  margin-right: 69px;
  z-index: 6;
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
