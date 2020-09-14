import * as React from "react";
import {Content, LayoutContainer} from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import NavBarSmall from "../NavBar/NavbarSmall";
import { useState } from "react";

interface IProps {

}

const Layout:React.FC<IProps> = ({children}) => {

    const [isFullMenuOpen, setFull] = useState(false)

    return(
        <LayoutContainer>
            <Header/>
            <Content>
                {isFullMenuOpen ? <NavBar setFull={setFull}/> : <NavBarSmall setFull={setFull} isFullMenuOpen={isFullMenuOpen}/>}
                {children}
            </Content>
        </LayoutContainer>
    )
}

export default Layout
