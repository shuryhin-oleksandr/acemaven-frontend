import * as React from "react";
import { NavContainer } from "./nav-styles";
import MenuLink from "./MenuLink";
import {operationsLinks, profileLinks, ratesLinks} from "../../../_BLL/helpers/nestedMenu/menuLinnks";
import { useState } from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import requests from '../../assets/icons/sidebar/requests.svg';
import active_requests from '../../assets/icons/sidebar/active_requests.svg';
import operations from '../../assets/icons/sidebar/operations(small).svg';
import active_operations from '../../assets/icons/sidebar/operations_active.svg';
import rates from '../../assets/icons/sidebar/rates.svg';
import activeRates from '../../assets/icons/sidebar/rates-active.svg';
import billing from '../../assets/icons/sidebar/billing.svg';
import settings from '../../assets/icons/sidebar/settings.svg';
import activeSettings from '../../../_UI/assets/icons/sidebar/settingsActive.svg';
import support from '../../assets/icons/sidebar/support.svg';


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
                                activeIcon={active_requests}
                                path='/quotes'
                                name='QUOTES'
                                setChecked={setChecked}
                                checkedLink={checkedLink}
                    />
                    : <MenuLink icon={requests}
                                activeIcon={active_requests}
                                path='/requests'
                                name='REQUESTS'
                                setChecked={setChecked}
                                checkedLink={checkedLink}
                    />
            }
            <MenuLink icon={operations}
                      activeIcon={active_operations}
                      name='OPERATIONS'
                      nestedLinks={operationsLinks}
                      setChecked={setChecked}
                      checkedLink={checkedLink}
                      path='#'
            />
            {
                company_type && company_type[0].type === 'agent'
                    && < MenuLink icon={rates}
                                nestedLinks={ratesLinks}
                                name='RATES & SERVICES'
                                setChecked={setChecked}
                                checkedLink={checkedLink}
                                activeIcon={activeRates}
                     />
            }
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