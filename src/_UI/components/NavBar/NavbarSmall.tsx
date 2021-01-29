import * as React from "react";
import MenuLink from "./MenuLink";
import {Arrow, ArrowWrap, ChatExtension, ChatLinkWrap, NavButton, NavContainer, NavSmallContainer} from "./nav-styles";
import {IconButton} from "@material-ui/core";
import {useState} from "react";
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
import ScrollbarStyled from "../_commonComponents/ScrollbarStyled/ScrollbarStyled";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import {AppCompaniesTypes, AppUserRolesType} from "../../../_BLL/types/commonTypes";



interface IProps {
    setSmallBar?: (value: boolean) => void,
    isSmallBar?: boolean
}

const NavBarSmall: React.FC<IProps> = ({...props}) => {
    //local state
    const [isHover, setIsHover] = useState(false)
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
            style: {height: "auto", width: "250px", flex: "none", backgroundColor: "black"},
            autoHeightMin: "calc(100vh - 60px)",
            autoHeight: true,
            navBar: true
        }}>
            <div style={{width: "100%", display: 'flex', minHeight: '100vh'}}>
                <NavSmallContainer>
                    <IconButton
                        onClick={() => props.isSmallBar ? props.setSmallBar && props.setSmallBar(false) : props.setSmallBar && props.setSmallBar(true)}
                        style={{position: 'absolute', bottom: '20px', right: '5px'}}
                        onMouseOver={() => setIsHover(true)}
                        onMouseOut={() => setIsHover(false)}

                    >
                        <ArrowWrap>
                            <Arrow isSmallBar={props.isSmallBar} isHover={isHover}/>
                        </ArrowWrap>
                    </IconButton>
                    {
                        company_type && company_type[0].type !== AppCompaniesTypes.AGENT
                            ?
                            <MenuLink icon={requests}
                                      path='#'
                                      setChecked={setChecked}
                                      checkedLink={checkedLink}
                            />
                            : ((billing_and_agent_option || agent_option || master_option)
                                &&
                                <MenuLink icon={requests}
                                          activeIcon={active_requests}
                                          setChecked={setChecked}
                                          checkedLink={checkedLink}
                                />
                            )
                    }
                    {(billing_and_agent_option || agent_option || master_option)
                    &&
                    <MenuLink icon={operations}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                    />
                    }
                    {
                        company_type && company_type[0].type === AppCompaniesTypes.AGENT
                        &&
                        <MenuLink icon={rates}
                                  path='#'
                                  setChecked={setChecked}
                                  checkedLink={checkedLink}
                        />
                    }
                    {(company_type && company_type[0].type === AppCompaniesTypes.AGENT) &&
                    (billing_and_agent_option || billing_option || master_option)
                    &&
                    <MenuLink icon={billing}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                    />
                    }
                    {(company_type && company_type[0].type === AppCompaniesTypes.CLIENT) &&
                    (billing_and_agent_option || billing_option || master_option)
                    &&
                    <MenuLink icon={billing}
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                              activeIcon={active_billing}
                    />
                    }
                    <MenuLink icon={settings}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                    />
                    <MenuLink icon={support}
                              path='#'
                              setChecked={setChecked}
                              checkedLink={checkedLink}
                    />
                </NavSmallContainer>
                <ChatExtension>
                    <ChatLinkWrap>
                        <NavButton >DETAILS</NavButton>
                    </ChatLinkWrap>
                    <ChatLinkWrap>
                        <NavButton >GET ASSISTANCE</NavButton>
                    </ChatLinkWrap>
                </ChatExtension>
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
