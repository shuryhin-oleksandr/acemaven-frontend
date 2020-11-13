import React from "react";
//styles
import {
    CardContent, CardWrap, Data, DefaultIcon, DefaultText, DefaultWrap,
    DeleteButton, Label,
    LineWrap, SetDefaultButton,
    Wrapper
} from "../../../ActivateCompany/AddBankAccount/BanksList/bank-list-styles";
//icons
import deleteIcon from "../../../../assets/icons/delete.svg";
import defaultIcon from "../../../../assets/icons/defaultBank.svg";

type PropsType = {
    card: any
}

const CreditCardCard:React.FC<PropsType> = ({}) => {
    return (
        <CardWrap /*max_width={max_width}*/>
            <CardContent>
                <LineWrap flex_direction='row'>
                    <Label>Name on Card</Label>
                    <Data>-</Data>
                </LineWrap>
                <DeleteButton ><img src={deleteIcon} alt=""/></DeleteButton>
                <div style={{width: '100%', display: 'flex'}}>
                    <Wrapper>
                        <LineWrap>
                            <Label>CPF/CNPJ</Label>
                            <Data>-</Data>
                        </LineWrap>
                        <LineWrap>
                            <Label>CVV</Label>
                            <Data>-</Data>
                        </LineWrap>
                        <LineWrap>
                            <Label>City</Label>
                            <Data>-</Data>
                        </LineWrap>
                        <LineWrap>
                            <Label>Address</Label>
                            <Data>-</Data>
                        </LineWrap>
                    </Wrapper>
                    <Wrapper>
                        <LineWrap>
                            <Label>Card Number</Label>
                            <Data>-</Data>
                        </LineWrap>
                        <LineWrap>
                            <Label>Card Expiration</Label>
                            <Data>-</Data>
                        </LineWrap>
                        <LineWrap>
                            <Label>State</Label>
                            <Data>-</Data>
                        </LineWrap>
                        <LineWrap>
                            <Label>ZIP</Label>
                            <Data>-</Data>
                        </LineWrap>
                    </Wrapper>
                </div>
                <DefaultWrap>
                   <DefaultIcon><img src={defaultIcon} alt=""/></DefaultIcon>
                    <DefaultText>Default Card</DefaultText>
                    <SetDefaultButton>Set as default</SetDefaultButton>
                </DefaultWrap>
            </CardContent>
        </CardWrap>
    )
}

export default CreditCardCard