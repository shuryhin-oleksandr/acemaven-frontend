import React from 'react'
//types
import {BillingOperationType} from "../../../../../_BLL/types/billing/billingTypes";
//components
import OptionsDeliveryButtons
    from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import BillingInProgressTable from "../billing_in_progress/table/BillingInProgressTable";
import MonthPicker from "../../../../components/month_picker/MonthPicker";
//styles
import {
    BillingProgressContent,
    BillingProgressInner,
    BillingProgressWrapper
} from "../billing_in_progress/billing-in-progress-styles";
import {BillingTitle} from "../exchange/agent-billing-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    search_column: string,
    setSearchColumn: (value: string) => void,
    searchValue: string,
    setSearchValue: (value: string) => void,
    mode: string,
    setMode: (value: string) => void,
    isSearchMode: boolean,
    setSearchMode: (value: boolean) => void,
    billing_list: BillingOperationType[],
    thunkName: string,
    billing_status: string,
    setDates: (dates: any) => void,
    dates: string[]
}

const AgentBillingCompletedPage:React.FC<PropsType> = ({...props}) => {

    const {t} = useTranslation();
    return (
        <BillingProgressWrapper>
            <BillingProgressInner style={{padding:"50px 70px 50px 0"}}>
                <BillingProgressContent>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: "25px"
                    }}>
                        <BillingTitle margin_bottom="0" style={{ paddingLeft: 30 }}>{t("Billing/Billing Completed")}</BillingTitle>
                        <div style={{display: 'flex', width: '450px', justifyContent: 'space-between'}}>
                            <div style={{ marginRight: "15px" }}>
                                <MonthPicker
                                    setDates={props.setDates}
                                    dates={props.dates}
                                    width="240px"
                                    placeholder={t("Bookings/Choose month")}
                                />
                            </div>
                            <OptionsDeliveryButtons directory=''
                                                    searchColumn={props.search_column}
                                                    searchValue={props.searchValue}
                                                    mode={props.mode}
                                                    setMode={props.setMode}
                                                    thunkName={props.thunkName}
                                                    operation_status={props.billing_status}
                                                    dates={props.dates}
                            />
                        </div>
                    </div>
                    <BillingInProgressTable search_column={props.search_column}
                                            setSearchColumn={props.setSearchColumn}
                                            mode={props.mode}
                                            searchValue={props.searchValue}
                                            setSearchValue={props.setSearchValue}
                                            isSearchMode={props.isSearchMode}
                                            setSearchMode={props.setSearchMode}
                                            billing_list={props.billing_list}
                                            billing_status={props.billing_status}
                                            thunkName={props.thunkName}
                                            dates={props.dates}
                    />
                </BillingProgressContent>
            </BillingProgressInner>
        </BillingProgressWrapper>
    )
}

export default AgentBillingCompletedPage