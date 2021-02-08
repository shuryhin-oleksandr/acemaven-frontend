import * as React from 'react'
import {useState} from "react";
//react-router-dom
import {NavLink, useHistory} from "react-router-dom";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//components
import {nestedLink} from 'src/_BLL/helpers/nestedMenu/menuLinnks';
//BLL
import {AppStateType} from "../../../_BLL/store";
import {commonActions} from "../../../_BLL/reducers/commonReducer";
//types
import {AppUserRolesType} from "../../../_BLL/types/commonTypes";
//styles
import {LinkWrap, IconWrap, Name, Outer, NestedWrap, NestedName, NestedOuter} from './nav-styles'


type IProps = {
    name?: string,
    icon: string,
    activeIcon?: string,
    path?: string,
    nestedLinks?: nestedLink[],
    setChecked?: (value: string) => void,
    checkedLink?: string,
    current_user_role?: string[],
    disabled?: boolean,
    setSmallBar?: (value: boolean) => void
}

const MenuLink: React.FC<IProps> = ({
                                        name, icon, activeIcon, nestedLinks, setSmallBar,
                                        setChecked, checkedLink, path, current_user_role, disabled
                                    }) => {

    let currentPath = useSelector((state: AppStateType) => state.common.currentNavPath)
    let [fullMenu, setFullMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    let clickHandler = () => {
        setChecked && setChecked(String(name))
        !fullMenu ? setFullMenu(true) : setFullMenu(false)
        !nestedLinks && history.push(String(path))
    }

    let handleClick = (e: any, path: string) => {
        if(disabled) e.preventDefault()
        dispatch(commonActions.setCurrentNavPath(path))
    }

    return (
        <LinkWrap >
            <Outer onClick={clickHandler}>
                <IconWrap onMouseEnter={() => setSmallBar && setSmallBar(false)}>
                    <img src={(checkedLink !== name) ? icon : activeIcon} alt=""/>
                </IconWrap>
                <Name checked={checkedLink === name}>{name}</Name>
            </Outer>
            {fullMenu && <NestedOuter>
                {nestedLinks && nestedLinks.map(l => {
                        if (l.name === 'USER MANAGEMENT') {
                            if (current_user_role?.includes(AppUserRolesType.MASTER)) {
                                return (
                                    <NestedWrap key={l.name}>
                                        <NavLink onClick={() => dispatch(commonActions.setCurrentNavPath(l.path))}
                                                 to={l.path}>
                                            <NestedName active={currentPath === l.path}>{l.name}</NestedName>
                                        </NavLink>
                                    </NestedWrap>
                                )
                            } else return null
                        } else return <NestedWrap key={l.name}>
                            <NavLink onClick={(e) => handleClick(e, l.path)} to={l.path} >
                                <NestedName active={currentPath === l.path}>{l.name}</NestedName>
                            </NavLink>
                        </NestedWrap>

                    }
                )}
            </NestedOuter>}
        </LinkWrap>
    )
}

export default MenuLink