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


type PropsType = {
  setIsCancelByClient: (value: boolean) => void;
  id?: number;
};

const CancelPendingBilling: React.FC<PropsType> = ({
  setIsCancelByClient,
  id,
}) => {
  const dispatch = useDispatch();
  return (
    <CancelOperationByClientWrapper>
      <CancelOperationByClientInner>
        <IconButton
          onClick={() => setIsCancelByClient(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <Question>Are you sure you want to cancel booking?</Question>
        <ButtonsWrapper>
          <YesButton
            onClick={() => {
              id && dispatch(cancelClientPendingBooking(id, setIsCancelByClient));

            }}
          >
            Yes
          </YesButton>
          <CancelButton
            onClick={() => {
              setIsCancelByClient(false);
            }}
          >
            No
          </CancelButton>
        </ButtonsWrapper>
      </CancelOperationByClientInner>
    </CancelOperationByClientWrapper>
  );
};

export default CancelPendingBilling;
