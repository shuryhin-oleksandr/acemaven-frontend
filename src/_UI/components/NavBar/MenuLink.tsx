import * as React from 'react'
import {LinkWrap, IconWrap, Name, Outer, NestedWrap, NestedName, NestedOuter} from './nav-styles'
import { nestedLink } from 'src/_BLL/helpers/nestedMenu/menuLinnks';
import {NavLink, useHistory} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import {commonActions} from "../../../_BLL/reducers/commonReducer";


type IProps = {
    name?: string,
    icon: string,
    activeIcon?: string,
    path?: string,
    nestedLinks?: nestedLink[],
    setChecked?: (value: string) => void,
    checkedLink?: string
}

const MenuLink:React.FC<IProps> = ({   name, icon, activeIcon,  nestedLinks,
                                       setChecked, checkedLink, path}) => {

    let currentPath = useSelector((state: AppStateType) => state.common.currentNavPath)
    let [fullMenu, setFullMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    let clickHandler = () => {
        setChecked && setChecked(String(name))
        !fullMenu ? setFullMenu(true) : setFullMenu(false)
        !nestedLinks && history.push(String(path))
    }

    return (
        <LinkWrap>
            <Outer onClick={clickHandler}>
                <IconWrap><img src={(checkedLink !== name) ? icon : activeIcon} alt=""/></IconWrap>
                <Name checked={checkedLink === name}>{name}</Name>
            </Outer>
            {fullMenu && <NestedOuter>
                {nestedLinks && nestedLinks.map(l => <NestedWrap key={l.name}>
                    <NavLink onClick={() => dispatch(commonActions.setCurrentNavPath(l.path))} to={l.path}><NestedName active={currentPath === l.path}>{l.name}</NestedName></NavLink>
                </NestedWrap>)}
            </NestedOuter>}



        </LinkWrap>
    )
}

export default MenuLink