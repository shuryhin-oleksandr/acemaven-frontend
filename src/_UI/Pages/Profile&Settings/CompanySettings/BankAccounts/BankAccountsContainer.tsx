import React from "react";
import {BanksContainer, BanksInner} from "./bank-accounts-styles";
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import BankCard from "../../../ActivateCompany/AddBankAccount/BanksList/list/bankCard";
import { useState } from "react";
import Form from "./addBankForm/Form";

const BankAccountsContainer:React.FC = () => {
    const [isAdd, setIsAdd] = useState(false)

    return (
        <BanksContainer>
            <BanksInner>
                {!isAdd
                ?  <AddNewButton setIsAdd={setIsAdd}/>
                : <Form setIsAdd={setIsAdd}/>
                }
                <BankCard max_width='611px' w='60%'/>
            </BanksInner>
        </BanksContainer>
    )
}

export default BankAccountsContainer

