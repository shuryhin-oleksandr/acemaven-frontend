import * as React from "react";
import {useState} from "react";
//react-router-dom
import { useRouteMatch } from 'react-router-dom'
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
//types
import {AppCompaniesTypes, AppUserRolesType} from "../../../_BLL/types/commonTypes";
//components
import MenuLink from "./MenuLink";
import ScrollbarStyled from "../_commonComponents/ScrollbarStyled/ScrollbarStyled";
//styles
import { ChatExtension, ChatLinkWrap, NavButton, NavSmallContainer} from "./nav-styles";
//icons
import requests from '../../assets/icons/sidebar/requests.svg';
import active_requests from '../../assets/icons/sidebar/active_requests.svg';
import operations from '../../assets/icons/sidebar/operations(small).svg';
import rates from '../../assets/icons/sidebar/rates.svg';
import billing from '../../assets/icons/sidebar/billing.svg';
import active_billing from '../../assets/icons/sidebar/active_billing.svg';
import settings from '../../assets/icons/sidebar/settings.svg';
import support from '../../assets/icons/sidebar/support.svg';


interface IProps {
    setSmallBar: (value: boolean) => void,
    isSmallBar: boolean,
    setChatOpen?: (value: boolean) => void,
    isChatOpen?: boolean
}

const NavBarSmall: React.FC<IProps> = ({...props}) => {
    const match = useRouteMatch('/operations/:id');
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


    return (
        <ScrollbarStyled {...{
            style: {height: "auto", width: `${match?"250px":"50px"}`, flex: "none", backgroundColor: "black"},
            autoHeightMin: "calc(100vh - 60px)",
            autoHeight: true,
            navBar: true
        }}>
            <div style={{width: "100%", display: 'flex', minHeight: '100vh'}}>
                <NavSmallContainer>
                    {
                        company_type && company_type[0].type !== AppCompaniesTypes.AGENT
                            ?
                            <MenuLink icon={requests}
                                      path='#'
                                      setChecked={setChecked}
                                      checkedLink={checkedLink}
                                      setSmallBar={props.setSmallBar}
                                      name='QUOTES'
                            />
                            : ((billing_and_agent_option || agent_option || master_option)
                                &&
                                <MenuLink icon={requests}
                                          activeIcon={active_requests}
                                          setChecked={setChecked}
                                          checkedLink={checkedLink}
                                          setSmallBar={props.setSmallBar}
                                          name='REQUESTS'
                                />
                            )
                    }
                    {(billing_and_agent_option || agent_option || master_option)
                    &&
                    <MenuLink icon={operations}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                              setSmallBar={props.setSmallBar}
                              name='OPERATIONS'
                    />
                    }
                    {
                        company_type && company_type[0].type === AppCompaniesTypes.AGENT
                        &&
                        <MenuLink icon={rates}
                                  path='#'
                                  setChecked={setChecked}
                                  checkedLink={checkedLink}
                                  setSmallBar={props.setSmallBar}
                                  name='RATES & SERVICES'

                        />
                    }
                    {(company_type && company_type[0].type === AppCompaniesTypes.AGENT) &&
                    (billing_and_agent_option || billing_option || master_option)
                    &&
                    <MenuLink icon={billing}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                              setSmallBar={props.setSmallBar}
                              name='BILLING'

                    />
                    }
                    {(company_type && company_type[0].type === AppCompaniesTypes.CLIENT) &&
                    (billing_and_agent_option || billing_option || master_option)
                    &&
                    <MenuLink icon={billing}
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                              activeIcon={active_billing}
                              path='#'
                              setSmallBar={props.setSmallBar}
                              name='BILLING'

                    />
                    }
                    <MenuLink icon={settings}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                              setSmallBar={props.setSmallBar}
                              name='PROFILE & SETTINGS'

                    />
                    <MenuLink icon={support}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                              setSmallBar={props.setSmallBar}
                              name='HELP AND SUPPORT'

                    />
                </NavSmallContainer>
                {match && props.isSmallBar &&
                <ChatExtension>
                    <ChatLinkWrap>
                        <NavButton onClick={() => props.setChatOpen && props.setChatOpen(false)}
                                   add_color={!props.isChatOpen}
                        >
                            DETAILS
                        </NavButton>
                    </ChatLinkWrap>
                    <ChatLinkWrap>
                        <NavButton onClick={() => props.setChatOpen && props.setChatOpen(true)}
                                   add_color={props.isChatOpen}
                        >
                            GET ASSISTANCE
                        </NavButton>
                    </ChatLinkWrap>
                </ChatExtension>
                }

            </div>

        </ScrollbarStyled>
    )
}

export default NavBarSmall


/*
element.style {
    width: 200px;
    background-color: #3B3B41;
    color: white;
    padding-top: 45px;
    font-family: 'Helvetica Reg';
    font-size: 15px;
    line-height: 17.20px;
    padding-left: 20px;
    text-transform: uppercase;*/
