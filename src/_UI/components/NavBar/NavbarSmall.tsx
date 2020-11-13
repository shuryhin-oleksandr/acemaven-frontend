import * as React from "react";
import MenuLink from "./MenuLink";
import {NavSmallContainer} from "./nav-styles";
const requests = require('../../../_UI/assets/icons/sidebar/requests.svg') as string;
const operations = require('../../../_UI/assets/icons/sidebar/operations(small).svg') as string;
const rates = require('../../../_UI/assets/icons/sidebar/rates.svg') as string;
const billing = require('../../../_UI/assets/icons/sidebar/billing.svg') as string;
const settings = require('../../../_UI/assets/icons/sidebar/settings.svg') as string;
const support = require('../../../_UI/assets/icons/sidebar/support.svg') as string;


interface IProps {
    isFullMenuOpen: boolean,
    setFull: (value: boolean) => void
}

const NavBarSmall:React.FC<IProps> = ({ setFull}) => {
    return (
        <NavSmallContainer onClick={() => setFull(true)}>
            <MenuLink icon={requests} path='#' />
            <MenuLink icon={operations} path='#' />
            <MenuLink icon={rates} path='#' />
            <MenuLink icon={billing} path='#' />
            <MenuLink icon={settings} path='#' />
            <MenuLink icon={support} path='#' />
        </NavSmallContainer>
    )
}

export default NavBarSmall