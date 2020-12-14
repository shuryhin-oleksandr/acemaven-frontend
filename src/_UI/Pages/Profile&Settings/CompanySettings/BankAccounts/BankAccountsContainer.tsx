import React, {useEffect} from "react";
import {BanksContainer, BanksInner} from "./bank-accounts-styles";
import AddNewButton from "../../../../components/_commonComponents/buttons/addNewItemButton/addNewButton";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import BankCard from "../../../ActivateCompany/AddBankAccount/BanksList/list/bankCard";
import {useState} from "react";
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
import SpinnerForAuthorizedPages from "../../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";

type PropsType = {
    current_user_role?: string[],
    isFetching: boolean
}

const BankAccountsContainer: React.FC<PropsType> = ({current_user_role, isFetching}) => {
    const [isAdd, setIsAdd] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBankAccounts())
    }, [])

    const banksList = useSelector((state: AppStateType) => state.profile.banksList)
    const addedBankSuccess = useSelector((state: AppStateType) => state.profile.addedBankSuccess)

    const dispatchHandler = (someFn: VoidFunctionType) => {
        dispatch(someFn)
    }


    const deleteBankCallback = (bankId: number) => {
        dispatch(deleteBank(bankId))
    }
    const defaultBankCallback = (bankId: number) => {
        dispatch(makeBankDefault(bankId, {is_default: true}))
    }

    useEffect(() => {
        if (addedBankSuccess) {
            setIsAdd(false)
            dispatch(profileActions.setAddedBankSuccess(''))
        }
    }, [addedBankSuccess])

    return (
        <>
            {isFetching
                ? <SpinnerForAuthorizedPages min_height='100%'/>
                : <ScrollbarStyled {...{style: {height: "100%"}}}>
                    <BanksContainer>
                        <BanksInner>
                            {!current_user_role?.includes('agent') &&
                            (!isAdd
                                    ? <AddNewButton setIsAdd={setIsAdd}/>
                                    : <Form dispatch={dispatchHandler} setIsAdd={setIsAdd}/>
                            )
                            }
                            {banksList?.map(b => <BankCard b={b}
                                                           key={b.id}
                                                           deleteBank={deleteBankCallback}
                                                           defaultBank={defaultBankCallback}
                                                           max_width='611px'
                                                           flex_direction='row'
                                                           w='60%'/>)}
                        </BanksInner>
                    </BanksContainer>
                </ScrollbarStyled>
            }
        </>
    )
}

export default BankAccountsContainer

