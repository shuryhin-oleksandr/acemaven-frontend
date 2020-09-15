import React from 'react'
import {IBankAccountData} from "../../../../../../../_BLL/types/addNewUserTypes";
import {CardContent, CardWrap, Data, Label, LineWrap} from "../bank-list-styles";

type PropsType = {
    b?: IBankAccountData
}

const BankCard:React.FC<PropsType> = () => {
    return (
        <CardWrap>
            <CardContent>
                <LineWrap>
                    <Label>Tax Id No.</Label>
                    <Data>00.00.00./00</Data>
                </LineWrap>
            </CardContent>
        </CardWrap>
    )
}

export default BankCard