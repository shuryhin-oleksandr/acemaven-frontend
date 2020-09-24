import React from 'react'
import {IAddNewBank} from "../../../../../../_BLL/types/addNewUserTypes";
import {CardContent, CardWrap, Data, DefaultIcon, DefaultText, DefaultWrap, DeleteButton, Label, LineWrap, SetDefaultButton, Wrapper} from "../bank-list-styles";
import deleteIcon from '../../../../../assets/icons/delete.svg'
import defaultIcon from '../../../../../assets/icons/defaultBank.svg'
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";

type PropsType = {
    b?: IAddNewBank,
    max_width?:string,
    w?: string,
    deleteBank?: VoidFunctionType,
    defaultBank?: VoidFunctionType
}

const BankCard:React.FC<PropsType> = ({max_width, w, b, deleteBank, defaultBank}) => {

    return (
        <CardWrap max_width={max_width}>
            <CardContent>
                <DeleteButton onClick={() => deleteBank && deleteBank(b?.id as number)}><img src={deleteIcon} alt=""/></DeleteButton>
                <Wrapper>
                    <LineWrap w={w}>
                        <Label>Bank Name</Label>
                        <Data>{b?.bank_name}</Data>
                    </LineWrap>
                    <LineWrap w={w}>
                        <Label>Branch No.</Label>
                        <Data>{b?.branch}</Data>
                    </LineWrap>
                    <LineWrap w={w}>
                        <Label>Account No.</Label>
                        <Data>{b?.number}</Data>
                    </LineWrap>
                    <LineWrap w={w}>
                        <Label>Account Type</Label>
                        <Data>{b?.account_type}</Data>
                    </LineWrap>
                </Wrapper>
                <DefaultWrap>
                    {b?.is_default && <DefaultIcon><img src={defaultIcon} alt=""/></DefaultIcon>}
                    {b?.is_default
                        ?  <DefaultText>Default Bank</DefaultText>
                        : <SetDefaultButton onClick={() => defaultBank && defaultBank(b?.id as number)}>Set as default</SetDefaultButton>
                    }
                </DefaultWrap>
            </CardContent>
        </CardWrap>
    )
}

export default BankCard