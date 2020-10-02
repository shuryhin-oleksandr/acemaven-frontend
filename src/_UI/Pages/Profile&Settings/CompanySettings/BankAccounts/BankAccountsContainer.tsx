import React, {useEffect} from "react";
import {BanksContainer, BanksInner} from "./bank-accounts-styles";
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import BankCard from "../../../ActivateCompany/AddBankAccount/BanksList/list/bankCard";
import { useState } from "react";
import Form from "./addBankForm/Form";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteBank,
    getBankAccounts,
    makeBankDefault,
    profileActions
} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

const BankAccountsContainer:React.FC = () => {
    const [isAdd, setIsAdd] = useState(false)

    const openCallback = (value: boolean) => {
        setIsAdd(value)
        dispatch(profileActions.setOpenBankForm(value))
    }
    const dispatch = useDispatch()
    const banksList = useSelector((state: AppStateType) => state.profile.banksList)

    const dispatchHandler = (someFn: VoidFunctionType) => {
        dispatch(someFn)
    }

    useEffect(() => {
        dispatch(getBankAccounts())
    }, [dispatch])

    const deleteBankCallback = (bankId: number) => {
        dispatch(deleteBank(bankId))
    }
    const defaultBankCallback = (bankId: number) => {
        dispatch(makeBankDefault(bankId, {is_default: true}))
    }

    return (
        <BanksContainer>
            <BanksInner>
                {!isAdd
                ?  <AddNewButton setIsAdd={openCallback}/>
                : <Form dispatch={dispatchHandler} setIsAdd={openCallback}/>
                }
                {banksList?.map(b => <BankCard b={b}
                                                        deleteBank={deleteBankCallback}
                                                        defaultBank={defaultBankCallback}
                                                        max_width='611px'
                                                        w='60%'/> )}
            </BanksInner>
        </BanksContainer>
    )
}

export default BankAccountsContainer

