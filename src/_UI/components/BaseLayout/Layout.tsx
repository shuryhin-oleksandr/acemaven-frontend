import * as React from "react";
import { Content, LayoutContainer } from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import {Scrollbars} from "react-custom-scrollbars";
import NavBarSmall from "../NavBar/NavbarSmall";
import {useEffect, useState} from "react";
import {useRouteMatch} from "react-router-dom";

type PropsType = {
    setChatOpen?: (value: boolean) => void,
    isChatOpen?: boolean
}


const Layout: React.FC<PropsType> = ({ children, ...props}) => {
    const match = useRouteMatch('/operations/:id');
    const [isSmallBar, setSmallBar] = useState(!!match);

  return (
    <LayoutContainer>
      <Header />
      <Content >
          {isSmallBar
              ? <NavBarSmall setSmallBar={setSmallBar}
                             isSmallBar={isSmallBar}
                             setChatOpen={props.setChatOpen}
                             isChatOpen={props.isChatOpen}
              />
              : <NavBar setSmallBar={setSmallBar}
                        isSmallBar={isSmallBar}
              />
          }

        <Scrollbars {...{style: { height: "calc(100vh - 60px)"}}}>
          {children}
        </Scrollbars>
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
