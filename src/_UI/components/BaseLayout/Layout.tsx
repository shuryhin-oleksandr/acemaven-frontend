import * as React from "react";
import {Content, LayoutContainer} from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import NavBarSmall from "../NavBar/NavbarSmall";
import { useState } from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";

interface IProps {

}

const Layout:React.FC<IProps> = ({children}) => {
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)
    const [isFullMenuOpen, setFull] = useState(false)

    return(
        <LayoutContainer>
            <Header/>
            {isAuth
                ? <Content>
                    {isFullMenuOpen ? <NavBar setFull={setFull}/> : <NavBarSmall setFull={setFull} isFullMenuOpen={isFullMenuOpen}/>}
                    {children}
                </Content>
                : <Content>
                    {children}
                </Content>
            }
        </LayoutContainer>
    )
}

export default Layout
