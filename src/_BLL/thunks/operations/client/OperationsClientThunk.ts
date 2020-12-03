import { Dispatch } from "redux";
import { operationsClientAPI } from "../../../../_DAL/API/operations/operationsClientAPI";
import {
  agentOperationsActions,
  commonAgentOperationsActions,
} from "../../../reducers/operations/agent/agentOperationsReducer";
import { operationsAgentAPI } from "../../../../_DAL/API/operations/OperationsAgentAPI";

export const getClientOperationsThunk = (
  type: string,
  is_mine: boolean | string,
  field_name: string,
  search_column: string,
  search_value: string
) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsClientAPI.getClientOperations(
        type,
        is_mine,
        field_name,
        search_column,
        search_value
      );
      dispatch(agentOperationsActions.setAgentOperationsList(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const editOperationByClientThunk = (data: any) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsClientAPI.editOperationByClient(data);
      console.log("RES", res);
      // dispatch(agentOperationsActions.setEditedShipmentDetails(res.data));
      // dispatch(agentOperationsActions.setEditSuccess("success"));
    } catch (e) {
      console.log(e);
    }
  };
};
