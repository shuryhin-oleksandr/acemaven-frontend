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
                          disabled={operationsFetching}

                />
                }
                {
                    (company_type && company_type[0].type === AppCompaniesTypes.AGENT)
                    &&
                    (billing_and_agent_option || master_option || agent_option)
                    && <MenuLink icon={rates}
                                 nestedLinks={ratesLinks}
                                 name='RATES & SERVICES'
                                 setChecked={setChecked}
                                 checkedLink={checkedLink}
                                 activeIcon={activeRates}
                    />
                }
                {(company_type && company_type[0].type === AppCompaniesTypes.AGENT) &&
                <MenuLink icon={billing}
                          name='BILLING'
                          nestedLinks={
                              (billing_and_agent_option || billing_option || master_option)
                                  ? billingLinks
                                  : billingWithoutExchangeLinks
                          }
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_billing}
                />
                }
                {(company_type && company_type[0].type === AppCompaniesTypes.CLIENT)
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
                <MenuLink icon={support}
                          path='/support'
                          name='HELP AND SUPPORT'
                          setChecked={setChecked}
                          checkedLink={checkedLink}
                          activeIcon={active_support}
                />
            </NavContainer>
        </ScrollbarStyled>
    )
}

export default NavBar