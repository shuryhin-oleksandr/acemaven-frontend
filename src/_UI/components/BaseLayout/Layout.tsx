import * as React from "react";
import { Content, LayoutContainer } from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import {Scrollbars} from "react-custom-scrollbars";
import NavBarSmall from "../NavBar/NavbarSmall";

type PropsType = {
    isSmallBar?: boolean,
    setSmallBar?: (value: boolean) => void
}


const Layout: React.FC<PropsType> = ({ children, isSmallBar, setSmallBar}) => {


  return (
    <LayoutContainer>
      <Header />
      <Content >
          {isSmallBar
              ? <NavBarSmall setSmallBar={setSmallBar} isSmallBar={isSmallBar}/>
              : <NavBar setSmallBar={setSmallBar} isSmallBar={isSmallBar}/>
          }

        <Scrollbars {...{style: { height: "calc(100vh - 60px)"}}}>
          {children}
        </Scrollbars>
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
