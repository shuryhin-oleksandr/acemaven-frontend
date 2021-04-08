import React, {useState} from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//types
import {AgentBankAccountType} from "../../../../../../_BLL/types/operations/operationsTypes";
//styles
import {
    AgentBankColumn, AgentBankLabel, AgentBankValue,
    AgentBankWrapper,
    InfoRowLabel, InfoRowValue
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";
//icons
import down_arrow from "../../../../../assets/icons/rates&services/show_arrow.svg";
import up_arrow from "../../../../../assets/icons/rates&services/hide_arrow.svg";
import {useTranslation} from "react-i18next";


type PropsType = {
    payment_due_by: string,
    agent_bank_account: AgentBankAccountType | undefined,
    agent_name: string | null
}

const PaymentDueByForClient: React.FC<PropsType> = ({payment_due_by, agent_bank_account, agent_name}) => {

    const [isHidden, setIsHidden] = useState(false)

    function isEmpty(obj: any) {
        for (let key in obj) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }
    const {t} = useTranslation();
    return (
        <>
            <div style={{display: 'flex',}}>
                <InfoRowLabel style={{marginRight: '10px'}}>{t("Operations/PAYMENT DUE BY")}:</InfoRowLabel>
                <InfoRowValue>{payment_due_by ? payment_due_by : ''}</InfoRowValue>
            </div>
            {payment_due_by &&
            <div style={{display: 'flex',}}>
                <InfoRowLabel style={{marginRight: '10px'}}>{t("Billing/PAY TO")}:</InfoRowLabel>
                <InfoRowValue>{agent_name}</InfoRowValue>
            </div>
            }
            <AgentBankWrapper>
                {!isEmpty(agent_bank_account) &&
                <IconButton style={{position: 'absolute', right: 0, padding: '13px 10px'}}
                            onClick={() => isHidden ? setIsHidden(false) : setIsHidden(true)}
                >
                    <img src={isHidden ? down_arrow : up_arrow} alt="" style={{width: '14px'}}/>
                </IconButton>
                }
                {agent_bank_account && payment_due_by && !isHidden &&
                (
                    agent_bank_account && Object.keys(agent_bank_account).map((k, i) => {
                        if (i > 0) {
                            return (
                                <AgentBankColumn key={i}>
                                    <AgentBankLabel>
                                        {k.replace('_', ' ')}
                                    </AgentBankLabel>
                                    <AgentBankValue>
                                        {agent_bank_account[k]}
                                    </AgentBankValue>
                                </AgentBankColumn>
                            )
                        } else return ''
                    })
                )
                }
            </AgentBankWrapper>
        </>
    )
}

export default PaymentDueByForClient