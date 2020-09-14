import * as React from 'react'
import {LinkWrap, IconWrap, Name} from './nav-styles'
import {NavLink} from "react-router-dom";


interface IProps {
    name?: string,
    icon: string,
    path: string
}

const MenuLink:React.FC<IProps> = ({name, icon, path}) => {
    return (
        <LinkWrap>
            <NavLink to={path}>
                <IconWrap><img src={icon} alt=""/></IconWrap>
                <Name>{name}</Name>
            </NavLink>
        </LinkWrap>
    )
}

export default MenuLink