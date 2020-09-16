import React from 'react'
import { ListInner } from '../../CreateNewUser/UsersList/users-list-styles';
import {ListWrap} from "./bank-list-styles";
import {IBankAccountData} from "../../../../../../_BLL/types/addNewUserTypes";
import EmptyList from "../../CreateNewUser/UsersList/emptyList/EmptyList";
import BankCard from "./list/bankCard";

type PropsType = {
    banksList?: Array<IBankAccountData>
}

const BankListContainer:React.FC<PropsType> = ({banksList}) => {
    return (
        <ListWrap>
            <ListInner>
                {!banksList
                    ? <EmptyList text='bank account'/>
                    : <BankCard/>
                }
            </ListInner>

        </ListWrap>
    )
}

export default BankListContainer