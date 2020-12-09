import { Dispatch } from "redux";
import { operationsClientAPI } from "../../../../_DAL/API/operations/operationsClientAPI";
import {
  agentOperationsActions,
  commonAgentOperationsActions,
} from "../../../reducers/operations/agent/agentOperationsReducer";
import {
  commonClientOperationsActions,
  clientOperationsActions,
} from "../../../reducers/operations/client/clientOperationsReducer";
import { AppStateType } from "../../../store";
import {operationsAgentAPI} from "../../../../_DAL/API/operations/OperationsAgentAPI";

export const getClientOperationsThunk = (
  type: string,
  is_mine: boolean | string,
  field_name: string,
  search_column: string,
  search_value: string,
  status?: string
) => {
  return async (dispatch: Dispatch<commonClientOperationsActions>) => {
    try {
      let res = await operationsClientAPI.getClientOperations(
        type,
        is_mine,
        field_name,
        search_column,
        search_value,
        status
      );
      dispatch(clientOperationsActions.setClientOperationsList(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const editOperationByClientThunk = (data: any) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsClientAPI.editOperationByClient(data);
    } catch (e) {
      console.log(e);
    }
  };
};

export const getPackageTypesChoices = () => {
  return async (dispatch: Dispatch<commonClientOperationsActions>) => {
    try {
      let res = await operationsClientAPI.getPackageChoices();
      dispatch(
        clientOperationsActions.setContainerTypeAir(res.data.container_type_air)
      );
      dispatch(
        clientOperationsActions.setPackagingType(res.data.packaging_type)
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const calculateAdditionalCargoGroup = (
  data: any,
  shipping_mode: number,
  reCalcOnGroupsAmountChange: any
) => {
  return async (
    dispatch: Dispatch<commonClientOperationsActions>,
    getState: () => AppStateType
  ) => {
    try {
      const packaging_types = getState().client_operations.packaging_types;
      const container_types_air = getState().client_operations
        .container_types_air;
      let res = await operationsClientAPI.calculateWM(data);
      if (shipping_mode === 2) {
        const c = container_types_air.find(
          (cont) => cont.id === data.container_type
        );
        const newCargoData = {
          ...data,
          total_wm: res.data.total,
          container_type: c,
        };
        dispatch(clientOperationsActions.addNewCargoGroup(newCargoData));
        const groups = getState().client_operations.operationCargoGroups;

        reCalcOnGroupsAmountChange(groups);
      } else {
        const p = packaging_types.find(
          (pack) => pack.id === data.packaging_type
        );
        const newCargoData = {
          ...data,
          total_wm: res.data.total,
          packaging_type: p,
        };
        dispatch(clientOperationsActions.addNewCargoGroup(newCargoData));
        const groups = getState().client_operations.operationCargoGroups;
        reCalcOnGroupsAmountChange(groups);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const cancelClientOperation = (id: number, history: any) => {
  return async (dispatch: Dispatch<commonClientOperationsActions>) => {
    try {
      let res = await operationsClientAPI.cancelOperation(id);
      history.push("/operations_cancelled");
    } catch (e) {
      console.log(e);
    }
  };
};

export const recalculateCharges = (id: number, data: any) => {
  return async (
    dispatch: Dispatch<commonClientOperationsActions>,
    getState: () => AppStateType
  ) => {
    try {
      let res = await operationsClientAPI.recalculateCharges(id, data);
      dispatch(clientOperationsActions.setRecalculatedCharges(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getClientExactOperationThunk = (id: number) => {
  return async (dispatch: Dispatch<commonClientOperationsActions>) => {
    try {
      dispatch(clientOperationsActions.setIsFetching(true));
      let res = await operationsAgentAPI.getAgentExactOperation(id);
      dispatch(clientOperationsActions.setAgentExactOperationInfo(res.data));
      dispatch(clientOperationsActions.setIsFetching(false));
    } catch (e) {
      console.log(e);
      dispatch(clientOperationsActions.setIsFetching(false));
    }
  };
};
