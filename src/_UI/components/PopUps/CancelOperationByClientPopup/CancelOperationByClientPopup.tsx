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
  return (
    <CancelOperationByClientWrapper>
      <CancelOperationByClientInner>
        <IconButton
          onClick={() => setIsCancelByClient(false)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <Question>Are you sure you want to cancel operation?</Question>
        <ButtonsWrapper>
          <YesButton
            onClick={() => {
              id && dispatch(cancelClientOperation(id, history));
              setIsCancelByClient(false);
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

export default CancelOperationByClientPopup;
