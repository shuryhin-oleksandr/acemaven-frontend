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
import {useTranslation} from "react-i18next";

type PropsType = {
  banksList?: Array<IAddNewBank> | null;
};

const BankListContainer: React.FC<PropsType> = ({ banksList }) => {
  const dispatch = useDispatch();

  const deleteBankCallback = (bankId: number) => {
    dispatch(deleteBankAccount(bankId));
  };
  const defaultBankCallback = (bankId: number) => {
    dispatch(makeDefaultBank(bankId, { is_default: true }));
  };
  const {t} = useTranslation();
  return (
    <ListWrap>
      <ListInner>
        {banksList?.length === 0 ? (
          <EmptyList text={t("Add bank account/Add bank account")} />
        ) : (
          banksList?.map((b) => (
            <BankCard
              key={b?.id}
              b={b}
              max_width='500px'
              deleteBank={deleteBankCallback}
              defaultBank={defaultBankCallback}
              flex_direction='row'
            />
          ))
        )}
      </ListInner>
    </ListWrap>
  );
};

export default BankListContainer;
