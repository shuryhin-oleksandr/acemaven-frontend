import React from "react";
import {Content, LayoutContainer} from "./layout-styles";
import HeaderWithoutActions from "../Header/HaederWithoutActions";


const LayoutWithoutNav:React.FC = ({children}) => {

    return(
        <LayoutContainer>
            <HeaderWithoutActions />
                <Content>
                    {children}
                </Content>
        </LayoutContainer>
    )
}

export default LayoutWithoutNav