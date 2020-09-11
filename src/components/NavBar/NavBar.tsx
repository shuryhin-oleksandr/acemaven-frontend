import * as React from "react";
import { NavContainer } from "./nav-styles";
import MenuLink from "./MenuLink";
const requests = require('../../assets/icons/sidebar/requests.svg') as string;
const operations = require('../../assets/icons/sidebar/operations.svg') as string;
const rates = require('../../assets/icons/sidebar/rates.svg') as string;
const billing = require('../../assets/icons/sidebar/billing.svg') as string;
const settings = require('../../assets/icons/sidebar/settings.svg') as string;
const support = require('../../assets/icons/sidebar/support.svg') as string;

interface IProps {
    setFull: (value: boolean) => void
}

const NavBar:React.FC<IProps> = ({setFull}) => {
    return (
        <NavContainer onClick={() => setFull(false)}>
            <MenuLink icon={requests} path='#' name='REQUESTS'/>
            <MenuLink icon={operations} path='#' name='OPERATIONS'/>
            <MenuLink icon={rates} path='#' name='RATES & SERVICES'/>
            <MenuLink icon={billing} path='#' name='BILLING'/>
            <MenuLink icon={settings} path='#' name='PROFILE & SETTINGS'/>
            <MenuLink icon={support} path='#' name='HELP AND SUPPORT'/>
        </NavContainer>
    )
}

export default NavBar