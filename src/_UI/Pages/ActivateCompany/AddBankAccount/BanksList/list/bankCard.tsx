import React from 'react'
import {IBankAccountData} from "../../../../../../_BLL/types/addNewUserTypes";
import {CardContent, CardWrap, Data, DefaultIcon, DefaultText, DefaultWrap, DeleteButton, Label, LineWrap} from "../bank-list-styles";
import deleteIcon from '../../../../../assets/icons/delete.svg'
import defaultIcon from '../../../../../assets/icons/defaultBank.svg'

type PropsType = {
    b?: IBankAccountData
}

const BankCard:React.FC<PropsType> = () => {
    return (
        <CardWrap>
            <CardContent>
                <DeleteButton><img src={deleteIcon} alt=""/></DeleteButton>
                <LineWrap>
                    <Label>Tax Id No.</Label>
                    <Data>00.00.00./00</Data>
                </LineWrap>
                <LineWrap>
                    <Label>Bank Name</Label>
                    <Data>Great Bank</Data>
                </LineWrap>
                <LineWrap>
                    <Label>Branch No.</Label>
                    <Data>0000-00</Data>
                </LineWrap>
                <LineWrap>
                    <Label>Account No.</Label>
                    <Data>123456789</Data>
                </LineWrap>
                <DefaultWrap>
                    <DefaultIcon><img src={defaultIcon} alt=""/></DefaultIcon>
                    <DefaultText>Default Bank</DefaultText>
                </DefaultWrap>
            </CardContent>
        </CardWrap>
    )
}

export default BankCard