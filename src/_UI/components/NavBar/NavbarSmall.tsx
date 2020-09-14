import * as React from "react";
import MenuLink from "./MenuLink";
import {NavSmallContainer} from "./nav-styles";
const requests = require('../../assets/icons/sidebar/requests.svg') as string;
const operations = require('../../assets/icons/sidebar/operations.svg') as string;
const rates = require('../../assets/icons/sidebar/rates.svg') as string;
const billing = require('../../assets/icons/sidebar/billing.svg') as string;
const settings = require('../../assets/icons/sidebar/settings.svg') as string;
const support = require('../../assets/icons/sidebar/support.svg') as string;


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