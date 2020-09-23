import React from 'react'
import { ListInner } from '../../CreateNewUser/UsersList/users-list-styles';
import {ListWrap} from "./bank-list-styles";
import {IAddNewBank} from "../../../../../_BLL/types/addNewUserTypes";
import EmptyList from "../../CreateNewUser/UsersList/emptyList/EmptyList";
import BankCard from "./list/bankCard";

type PropsType = {
    banksList?: Array<IAddNewBank>
}

const BankListContainer:React.FC<PropsType> = ({banksList}) => {
    return (
        <ListWrap>
            <ListInner>
                {!banksList
                    ? <EmptyList text='bank account'/>
                    : banksList?.map(b => <BankCard b={b}/>)
                }
            </ListInner>

        </ListWrap>
    )
}

export default BankListContainer