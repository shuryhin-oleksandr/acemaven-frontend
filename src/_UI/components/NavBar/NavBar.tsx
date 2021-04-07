import * as React from "react";
import {useState} from "react";
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import {getIsFetchingOperationSelector} from "../../../_BLL/selectors/operations/agentOperationsSelector";
//types
import {AppCompaniesTypes, AppUserRolesType} from "../../../_BLL/types/commonTypes";
//components
import ScrollbarStyled from "../_commonComponents/ScrollbarStyled/ScrollbarStyled";
import MenuLink from "./MenuLink";
import {
    billingLinks, billingWithoutExchangeLinks, clientBillingLinks,
    operationsLinks,
    profileLinks,
    ratesLinks,
    requestLinks
} from "../../../_BLL/helpers/nestedMenu/menuLinnks";
//styles
import {NavContainer} from "./nav-styles";
//icons
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
import active_support from '../../assets/icons/sidebar/active_support.svg';
import {useTranslation} from "react-i18next";


interface IProps {
    setSmallBar: (value: boolean) => void,
    isSmallBar: boolean
}

const NavBar: React.FC<IProps> = ({...props}) => {
    //local state
    let [checkedLink, setChecked] = useState('')

    //data from store
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies)
    let current_user_role = useSelector((state: AppStateType) => state.profile.authUserInfo?.roles)

    //roles options
    let billing_and_agent_option = current_user_role?.includes(AppUserRolesType.BILLING)
        && current_user_role?.includes(AppUserRolesType.AGENT);
    let billing_option = current_user_role?.includes(AppUserRolesType.BILLING);
    let agent_option = current_user_role?.includes(AppUserRolesType.AGENT);
    let master_option = current_user_role?.includes(AppUserRolesType.MASTER);

    //isFetching from store for different sections
    const operationsFetching = useSelector(getIsFetchingOperationSelector)

    const {t} = useTranslation();
    const menuLinks ={
        profileLinks: [
            {name: t("Dashboard Menu/My Profile"), path: '/settings/profile'},
            {name: t("Dashboard Menu/Company Settings"), path: '/settings/company'},
            {name: t("Dashboard Menu/USER MANAGEMENT"), path: '/settings/user/management'},
            {name: t("Dashboard Menu/SETTINGS"), path: '/settings/general'}
        ],
        operationsLinks: [
            {name: t("Dashboard Menu/ACTIVE"), path: '/operations_active'},
            {name: t("Dashboard Menu/COMPLETED"), path: '/operations_completed'},
            {name: t("Dashboard Menu/CANCELED"), path: '/operations_cancelled'},
        ],
        billingLinks: [
            {name: t("Dashboard Menu/Exchange Rate"), path: '/billing_exchange'},
            {name: t("Dashboard Menu/Billing In Progress"), path: '/billing_in_progress'},
            {name: t("Dashboard Menu/COMPLETED"), path: '/billing_completed'}
        ],
        billingWithoutExchangeLinks: [
            {name: t("Dashboard Menu/Billing In Progress"), path: '/billing_in_progress'},
            {name: t("Dashboard Menu/COMPLETED"), path: '/billing_completed'}
        ],
        clientBillingLinks: [
            {name: t("Dashboard Menu/FEE PENDING"), path: '/billing_pending'},
            {name: t("Dashboard Menu/Billing In Progress"), path: '/billing_in_progress_client'},
            {name: t("Dashboard Menu/COMPLETED"), path: '/billing_complete'}
        ],
        ratesLinks: [
            {name: t("Dashboard Menu/Rates"), path: '/services/rates'},
            {name: t("Dashboard Menu/Surcharges"), path: '/services/surcharges'}
        ],
        requestLinks: [
            {name: t("Dashboard Menu/BOOKINGS"), path:"/requests/booking/"},
            {name: t("Dashboard Menu/QUOTES"), path:"/quotes/"}
        ]
    }

    return (
        <ScrollbarStyled {...{
            style: {height: "auto", width: "230px", flex: "none", backgroundColor: "black"},
            autoHeightMin: "calc(100vh - 60px)",
            autoHeight: true,
            navBar: true
        }}>
            <NavContainer onMouseLeave={() => props.setSmallBar(true)}>
                {
                    company_type && company_type[0].type !== AppCompaniesTypes.AGENT
                        ? <MenuLink icon={requests}
                                    activeIcon={active_requests}
                                    path='/quotes'
                                    name={t("Dashboard Menu/QUOTES")}
                                    setChecked={setChecked}
                                    checkedLink={checkedLink}

                        />
                        : ((billing_and_agent_option || agent_option || master_option)
                            &&
                            <MenuLink icon={requests}
                                      activeIcon={active_requests}
                                      name={t("Dashboard Menu/REQUESTS")}
                                      setChecked={setChecked}
                                      checkedLink={checkedLink}
                                      nestedLinks={menuLinks.requestLinks}

                            />
                        )
                }
                {(billing_and_agent_option || agent_option || master_option)
                &&
                <MenuLink icon={operations}
                          activeIcon={active_operations}
                          name={t("Dashboard Menu/OPERATIONS")}
                          nestedLinks={menuLinks.operationsLinks}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          path='#'
                          disabled={operationsFetching}

                />
                }
                {
                    (company_type && company_type[0].type === AppCompaniesTypes.AGENT)
                    &&
                    (billing_and_agent_option || master_option || agent_option)
                    && <MenuLink icon={rates}
                                 nestedLinks={ratesLinks}
                                 name={t("Dashboard Menu/RATES & SERVICES")}
                                 setChecked={setChecked}
                                 checkedLink={checkedLink}
                                 activeIcon={activeRates}
                    />
                }
                {(company_type && company_type[0].type === AppCompaniesTypes.AGENT) &&
                <MenuLink icon={billing}
                          name={t("Dashboard Menu/BILLING")}
                          nestedLinks={
                              (billing_and_agent_option || billing_option || master_option)
                                  ? menuLinks.billingLinks
                                  : menuLinks.billingWithoutExchangeLinks
                          }
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_billing}
                />
                }
                {(company_type && company_type[0].type === AppCompaniesTypes.CLIENT)
                &&
                <MenuLink icon={billing}
                          name={t("Dashboard Menu/BILLING")}
                          nestedLinks={menuLinks.clientBillingLinks}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_billing}
                />
                }
                <MenuLink icon={settings}
                          activeIcon={activeSettings}
                          nestedLinks={menuLinks.profileLinks}
                          current_user_role={current_user_role}
                          name={t("Dashboard Menu/PROFILE & SETTINGS")}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                />
                <MenuLink icon={support}
                          path='/support'
                          name={t("Dashboard Menu/HELP & SUPPORT")}
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_support}
                />
            </NavContainer>
        </ScrollbarStyled>
    )
}

export default NavBar