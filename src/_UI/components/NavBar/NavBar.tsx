import * as React from "react";
import { NavContainer } from "./nav-styles";
import MenuLink from "./MenuLink";
import {operationsLinks, profileLinks, ratesLinks} from "../../../_BLL/helpers/nestedMenu/menuLinnks";
import { useState } from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
const requests = require('../../assets/icons/sidebar/requests.svg') as string;
const operations = require('../../assets/icons/sidebar/operations(small).svg') as string;
const rates = require('../../assets/icons/sidebar/rates.svg') as string;
const activeRates = require('../../assets/icons/sidebar/rates-active.svg') as string;
const billing = require('../../assets/icons/sidebar/billing.svg') as string;
const settings = require('../../assets/icons/sidebar/settings.svg') as string;
const activeSettings = require('../../../_UI/assets/icons/sidebar/settingsActive.svg') as string;
const support = require('../../assets/icons/sidebar/support.svg') as string;


interface IProps {
    setFull?: (value: boolean) => void
}

const NavBar:React.FC<IProps> = () => {
    let [checkedLink, setChecked] = useState('')
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies)


    return (
        <NavContainer>
            {
                company_type && company_type[0].type !== 'agent'
                    ? <MenuLink icon={requests}
                                path='/quotes'
                                name='QUOTES'
                                setChecked={setChecked}
                                checkedLink={checkedLink}
                    />
                    : <MenuLink icon={requests}
                                path='/requests'
                                name='REQUESTS'
                                setChecked={setChecked}
                                checkedLink={checkedLink}
                    />
            }
            <MenuLink icon={operations}
                      name='OPERATIONS'
                      nestedLinks={operationsLinks}
                      setChecked={setChecked}
                      checkedLink={checkedLink}
            />
            <MenuLink icon={rates}
                      nestedLinks={ratesLinks}
                      name='RATES & SERVICES'
                      setChecked={setChecked}
                      checkedLink={checkedLink}
                      activeIcon={activeRates}
            />
            <MenuLink icon={billing} path='#' name='BILLING'/>
            <MenuLink icon={settings}
                      activeIcon={activeSettings}
                      nestedLinks={profileLinks}
                      name='PROFILE & SETTINGS'
                      setChecked={setChecked}
                      checkedLink={checkedLink}
            />
            <MenuLink icon={support} path='#' name='HELP AND SUPPORT'/>
        </NavContainer>
    )
}

export default NavBar