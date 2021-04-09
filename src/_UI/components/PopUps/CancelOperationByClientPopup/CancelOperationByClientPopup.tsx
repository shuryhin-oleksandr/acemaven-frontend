import React, { useEffect } from "react";

import { IconButton } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  ButtonsWrapper,
  CancelButton,
  CancelOperationByClientInner,
  CancelOperationByClientWrapper,
  Question,
  YesButton,
} from "./cancel-operation-by-client-styles";
import { cancelClientOperation } from "../../../../_BLL/thunks/operations/client/OperationsClientThunk";
import { useHistory } from "react-router";
import {useTranslation} from "react-i18next";

type PropsType = {
  setIsCancelByClient: (value: boolean) => void;
  id?: number;
};

const CancelOperationByClientPopup: React.FC<PropsType> = ({
  setIsCancelByClient,
  id,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {t} = useTranslation();
  return (
    <CancelOperationByClientWrapper>
      <CancelOperationByClientInner>
        <IconButton
          onClick={() => setIsCancelByClient(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <Question>{t("Confirm Operation/Do you want to cancel the operation?")}</Question>
        <ButtonsWrapper>
          <YesButton
            onClick={() => {
              id && dispatch(cancelClientOperation(id, history));
              setIsCancelByClient(false);
            }}
          >
            {t("Surcharges/YES")}
          </YesButton>
          <CancelButton
            onClick={() => {
              setIsCancelByClient(false);
            }}
          >
            {t("Surcharges/NO")}
          </CancelButton>
        </ButtonsWrapper>
      </CancelOperationByClientInner>
    </CancelOperationByClientWrapper>
  );
};

export default CancelOperationByClientPopup;
