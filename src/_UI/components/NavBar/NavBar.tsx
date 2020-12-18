import * as React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import ScrollbarStyled from "../_commonComponents/ScrollbarStyled/ScrollbarStyled";
import MenuLink from "./MenuLink";
import {
    billingLinks, clientBillingLinks,
    operationsLinks,
    profileLinks,
    ratesLinks,
    requestLinks
} from "../../../_BLL/helpers/nestedMenu/menuLinnks";
import {AppStateType} from "../../../_BLL/store";
import activeSettings from '../../../_UI/assets/icons/sidebar/settingsActive.svg';
import requests from '../../assets/icons/sidebar/requests.svg';
import active_requests from '../../assets/icons/sidebar/active_requests.svg';
import operations from '../../assets/icons/sidebar/operations(small).svg';
import active_operations from '../../assets/icons/sidebar/operations_active.svg';
import rates from '../../assets/icons/sidebar/rates.svg';
import activeRates from '../../assets/icons/sidebar/rates-active.svg';
import billing from '../../assets/icons/sidebar/billing.svg';
import active_billing from '../../assets/icons/sidebar/active_billing.svg';
import settings from '../../assets/icons/sidebar/settings.svg';
import support from '../../assets/icons/sidebar/support.svg';
import {NavContainer} from "./nav-styles";
import {AppCompaniesTypes, AppUserRolesType} from "../../../_BLL/types/commonTypes";

interface IProps {
    setFull?: (value: boolean) => void
}

const NavBar: React.FC<IProps> = () => {
    let [checkedLink, setChecked] = useState('')
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies)
    let current_user_role = useSelector((state: AppStateType) => state.profile.authUserInfo?.roles)

    //roles options
    let billing_and_agent_option = current_user_role?.includes(AppUserRolesType.BILLING)
        && current_user_role?.includes(AppUserRolesType.AGENT);
    let billing_option = current_user_role?.includes(AppUserRolesType.BILLING);
    let agent_option = current_user_role?.includes(AppUserRolesType.AGENT);
    let master_option = current_user_role?.includes(AppUserRolesType.MASTER);


    return (
        <ScrollbarStyled {...{
            style: {height: "auto", width: "230px", flex: "none", backgroundColor: "black"},
            autoHeightMin: "calc(100vh - 60px)",
            autoHeight: true,
            navBar: true
        }}>
            <NavContainer>
                {
                    company_type && company_type[0].type !== AppCompaniesTypes.AGENT
                        ? <MenuLink icon={requests}
                                    activeIcon={active_requests}
                                    path='/quotes'
                                    name='QUOTES'
                                    setChecked={setChecked}
                                    checkedLink={checkedLink}
                        />
                        : ((billing_and_agent_option || agent_option || master_option)
                            &&
                            <MenuLink icon={requests}
                                      activeIcon={active_requests}
                                      name='REQUESTS'
                                      setChecked={setChecked}
                                      checkedLink={checkedLink}
                                      nestedLinks={requestLinks}
                            />
                        )
                }
                {(billing_and_agent_option || agent_option || master_option)
                &&
                <MenuLink icon={operations}
                          activeIcon={active_operations}
                          name='OPERATIONS'
                          nestedLinks={operationsLinks}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          path='#'
                />
                }
                {
                    company_type && company_type[0].type === AppCompaniesTypes.AGENT
                    && < MenuLink icon={rates}
                                  nestedLinks={ratesLinks}
                                  name='RATES & SERVICES'
                                  setChecked={setChecked}
                                  checkedLink={checkedLink}
                                  activeIcon={activeRates}
                    />
                }
                {(company_type && company_type[0].type === AppCompaniesTypes.AGENT) &&
                (billing_and_agent_option || billing_option || master_option)
                &&
                <MenuLink icon={billing}
                          name='BILLING'
                          nestedLinks={billingLinks}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_billing}
                />
                }
                {(company_type && company_type[0].type === AppCompaniesTypes.CLIENT) &&
                (billing_and_agent_option || billing_option || master_option)
                &&
                <MenuLink icon={billing}
                          name='BILLING'
                          nestedLinks={clientBillingLinks}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_billing}
                />
                }
                <MenuLink icon={settings}
                          activeIcon={activeSettings}
                          nestedLinks={profileLinks}
                          current_user_role={current_user_role}
                          name='PROFILE & SETTINGS'
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                />
                <MenuLink icon={support} path='#' name='HELP AND SUPPORT'/>
            </NavContainer>
        </ScrollbarStyled>
    )
}

export default NavBar