import React from "react";
import { ListInner } from "../../CreateNewUser/UsersList/users-list-styles";
import { ListWrap } from "./bank-list-styles";
import { IAddNewBank } from "../../../../../_BLL/types/addNewUserTypes";
import EmptyList from "../../CreateNewUser/UsersList/emptyList/EmptyList";
import BankCard from "./list/bankCard";
import { useDispatch } from "react-redux";
import {
  deleteBankAccount,
  makeDefaultBank,
} from "../../../../../_BLL/reducers/employeesAndBanksReducer";

type PropsType = {
  banksList?: Array<IAddNewBank>;
};

const BankListContainer: React.FC<PropsType> = ({ banksList }) => {
  const dispatch = useDispatch();

  const deleteBankCallback = (bankId: number) => {
    dispatch(deleteBankAccount(bankId));
  };
  const defaultBankCallback = (bankId: number) => {
    dispatch(makeDefaultBank(bankId, { is_default: true }));
  };

  return (
    <ListWrap>
      <ListInner>
        {banksList?.length === 0 ? (
          <EmptyList text="bank account" />
        ) : (
          banksList?.map((b) => (
            <BankCard
              key={b?.id}
              b={b}
              deleteBank={deleteBankCallback}
              defaultBank={defaultBankCallback}
            />
          ))
        )}
      </ListInner>
    </ListWrap>
  );
};

export default BankListContainer;
