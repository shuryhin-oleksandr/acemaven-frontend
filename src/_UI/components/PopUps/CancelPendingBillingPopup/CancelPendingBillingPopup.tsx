import React from "react";

import { IconButton } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";

import { useDispatch } from "react-redux";
import {
  ButtonsWrapper,
  CancelButton,
  CancelOperationByClientInner,
  CancelOperationByClientWrapper,
  Question,
  YesButton,
} from "./cancel-pending-billing-styles";
import {cancelClientPendingBooking} from "../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import {useTranslation} from "react-i18next";


type PropsType = {
  setIsCancelByClient: (value: boolean) => void;
  id?: number;
};

const CancelPendingBilling: React.FC<PropsType> = ({
  setIsCancelByClient,
  id,
}) => {
  const dispatch = useDispatch();
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
        <Question>{t("Billing/Are you sure you want to cancel booking")}?</Question>
        <ButtonsWrapper>
          <YesButton
            onClick={() => {
              id && dispatch(cancelClientPendingBooking(id, setIsCancelByClient));

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

export default CancelPendingBilling;
