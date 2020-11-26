import React, {useEffect} from "react";
import {BanksContainer, BanksInner} from "./bank-accounts-styles";
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
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

    const dispatch = useDispatch()
    const banksList = useSelector((state: AppStateType) => state.profile.banksList)
    const addedBankSuccess = useSelector((state: AppStateType) => state.profile.addedBankSuccess)

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

    useEffect(() => {
        if(addedBankSuccess) {
            setIsAdd(false)
            dispatch(profileActions.setAddedBankSuccess(''))
        }
    }, [addedBankSuccess])

    return (
        <ScrollbarStyled {...{style: {height: "100%"}}}>
            <BanksContainer>
                <BanksInner>
                    {!isAdd
                    ?  <AddNewButton setIsAdd={setIsAdd}/>
                    : <Form dispatch={dispatchHandler} setIsAdd={setIsAdd}/>
                    }
                    {banksList?.map(b => <BankCard b={b}
                                                            key={b.id}
                                                            deleteBank={deleteBankCallback}
                                                            defaultBank={defaultBankCallback}
                                                            max_width='611px'
                                                            w='60%'/> )}
                </BanksInner>
            </BanksContainer>
        </ScrollbarStyled>
    )
}

export default BankAccountsContainer

