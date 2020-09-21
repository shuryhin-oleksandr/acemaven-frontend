import * as React from 'react'
import {LinkWrap, IconWrap, Name, Outer, NestedWrap, NestedName, NestedOuter} from './nav-styles'
import { nestedLink } from 'src/_BLL/helpers/nestedMenu/menuLinnks';
import {NavLink} from "react-router-dom";
import {VoidFunctionType} from "../../../_BLL/types/commonTypes";
import {useState} from "react";


interface IProps {
    name?: string,
    icon: string,
    activeIcon?: string,
    path?: string,
    nestedLinks?: nestedLink[],
    setChecked?: VoidFunctionType,
    checkedLink?: string
}

const MenuLink:React.FC<IProps> = ({   name, icon, activeIcon,  nestedLinks,
                                       setChecked, checkedLink}) => {

    let [currentPath, setCurrentPath] = useState('/settings/profile')
    let [fullMenu, setFullMenu] = useState(false)
    let clickHandler = () => {
        setChecked && setChecked(name)
        !fullMenu ? setFullMenu(true) : setFullMenu(false)
    }

    return (
        <LinkWrap>
            <Outer onClick={clickHandler}>
                <IconWrap><img src={(checkedLink !== name) ? icon : activeIcon} alt=""/></IconWrap>
                <Name checked={checkedLink === name}>{name}</Name>
            </Outer>
            {fullMenu && <NestedOuter>
                {nestedLinks && nestedLinks.map(l => <NestedWrap key={l.name}>
                    <NavLink onClick={() => setCurrentPath(l.path)} to={l.path}><NestedName active={currentPath === l.path}>{l.name}</NestedName></NavLink>
                </NestedWrap>)}
            </NestedOuter>}



        </LinkWrap>
    )
}

export default MenuLink