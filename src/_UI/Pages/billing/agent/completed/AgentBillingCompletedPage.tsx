import React, {useState} from 'react'
import {
    BillingProgressContent,
    BillingProgressInner,
    BillingProgressWrapper
} from "../billing_in_progress/billing-in-progress-styles";
import {BillingTitle} from "../exchange/agent-billing-styles";
import OptionsDeliveryButtons
    from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import BillingInProgressTable from "../billing_in_progress/table/BillingInProgressTable";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import {BillingOperationType} from "../../../../../_BLL/types/billing/billingTypes";

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
    billing_status: string
}

const AgentBillingCompletedPage:React.FC<PropsType> = ({...props}) => {

    const [month, setMonth] = useState(0)

    let month_options = [
        {id: 1, title: 'april'},
        {id: 2, title: 'may'},
        {id: 3, title: 'june'},
    ]


    return (
        <BillingProgressWrapper>
            <BillingProgressInner>
                <BillingProgressContent>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline'
                    }}>
                        <BillingTitle>Billing Completed</BillingTitle>
                        <div style={{display: 'flex', width: '450px', justifyContent: 'space-between'}}>
                            <SurchargeRateSelect placeholder='Time range'
                                                 maxW='173px'
                                                 hideLabel={true}
                                                 options={month_options}
                                                 callback={setMonth}

                            />
                            <OptionsDeliveryButtons directory=''
                                                    searchColumn={props.search_column}
                                                    searchValue={props.searchValue}
                                                    mode={props.mode}
                                                    setMode={props.setMode}
                                                    thunkName={props.thunkName}
                                                    operation_status={props.billing_status}
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
                    />
                </BillingProgressContent>
            </BillingProgressInner>
        </BillingProgressWrapper>
    )
}

export default AgentBillingCompletedPage