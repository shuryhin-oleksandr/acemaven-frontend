import * as React from "react";
import {Content, LayoutContainer} from "./layout-styles";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";



interface IProps {
    isAuth: boolean
}

const Layout:React.FC<IProps> = ({children, isAuth}) => {



    return(
        <LayoutContainer>
            <Header isAuth={isAuth}/>
            {!isAuth
                ? <Content>
                   <NavBar />
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
