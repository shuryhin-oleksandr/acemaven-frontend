import {Dispatch} from "redux";
import {agentBillingActions, commonAgentBillingActions} from "src/_BLL/reducers/billing/agent/AgentBillingReducer";
import {agentBillingAPI} from "../../../../_DAL/API/billing/agent/agentBillingAPI";


export const getExchangeListThunk = () => {
    return async (dispatch: Dispatch<commonAgentBillingActions>) => {
        try {
            dispatch(agentBillingActions.setIsFetching(true))
            let res = await agentBillingAPI.getExchangeCompanyList();
            dispatch(agentBillingActions.setExchangeList(res.data));
            dispatch(agentBillingActions.setIsFetching(false))
        } catch (e) {
            console.log(e);
            dispatch(agentBillingActions.setIsFetching(false))
        }
    };
};

export const createNewExchangeRateThunk = (exchange_data: {rates: Array<{currency: number, rate: string, spread: string}>}) => {
    return async (dispatch: any) => {
        try {
            dispatch(agentBillingActions.setIsFetching(true))
            await agentBillingAPI.addNewExchangeRate(exchange_data);
            dispatch(agentBillingActions.setAddingExchangeSuccess(true))
            dispatch(getExchangeListThunk())
            dispatch(agentBillingActions.setIsFetching(false))
        } catch (e) {
            console.log(e);
            dispatch(agentBillingActions.setIsFetching(false))
        }
    };
};


export const getBillingOperationsListThunk = ( type: string, field_name: string, search_column: string, search_value: string,
                                               // @ts-ignore
                                               status?: string, date_from: string, date_to: string) => {
    return async (dispatch: Dispatch<commonAgentBillingActions>) => {
        try {
            dispatch(agentBillingActions.setIsFetching(true))
            let {data} = await agentBillingAPI.getBillingList(type, field_name, search_column, search_value, status, date_from, date_to)
            dispatch(agentBillingActions.setBillingOperationsList(data))
            dispatch(agentBillingActions.setIsFetching(false))
        } catch (e) {
            console.log(e)
            dispatch(agentBillingActions.setIsFetching(false))
        }
    }
}


export const getBillingInProgressDetailsThunk = (id: number) => {
    return async (dispatch: Dispatch<commonAgentBillingActions>) => {
        try {
            dispatch(agentBillingActions.setIsFetching(true))
            let {data} = await agentBillingAPI.getBillingOperationDetails(id)
            dispatch(agentBillingActions.setBillingOperationDetails(data))
            dispatch(agentBillingActions.setIsFetching(false))
        } catch (e) {
            console.log(e)
            dispatch(agentBillingActions.setIsFetching(false))
        }
    }
}

