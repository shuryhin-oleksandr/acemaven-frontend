import * as React from "react";
import {Content, LayoutContainer} from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";


const Layout:React.FC = ({children, }) => {

    return(
        <LayoutContainer>
            <Header/>
                 <Content>
                   <NavBar />
                    {children}
                </Content>
        </LayoutContainer>
    )
}

export default Layout
