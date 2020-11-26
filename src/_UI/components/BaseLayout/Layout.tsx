import * as React from "react";
import { Content, LayoutContainer } from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import {Scrollbars} from "react-custom-scrollbars";

const Layout: React.FC = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        <NavBar />
        <Scrollbars {...{style: { height: "calc(100vh - 60px)" }}}>
          {children}
        </Scrollbars>
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
