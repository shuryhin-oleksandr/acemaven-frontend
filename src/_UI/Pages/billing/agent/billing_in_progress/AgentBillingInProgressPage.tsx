import React from 'react'
//components
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import BillingInProgressTable from "./table/BillingInProgressTable";
//styles
import {BillingProgressContent, BillingProgressInner, BillingProgressWrapper} from "./billing-in-progress-styles";
import {BillingTitle} from "../exchange/agent-billing-styles";
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


const AgentBillingInProgressPage: React.FC<PropsType> = ({...props}) => {

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
                        <BillingTitle>Billing in Progress</BillingTitle>
                        <OptionsDeliveryButtons directory=''
                                                searchColumn={props.search_column}
                                                searchValue={props.searchValue}
                                                mode={props.mode}
                                                setMode={props.setMode}
                                                thunkName={props.thunkName}
                        />
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

export default AgentBillingInProgressPage