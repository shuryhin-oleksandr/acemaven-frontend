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
    return async (dispatch: Dispatch<commonAgentBillingActions>) => {
        try {
            dispatch(agentBillingActions.setIsFetching(true))
            let res = await agentBillingAPI.addNewExchangeRate(exchange_data);
            dispatch(agentBillingActions.setNewExchangeRateToList(res.data));
            dispatch(agentBillingActions.setIsFetching(false))
        } catch (e) {
            console.log(e);
            dispatch(agentBillingActions.setIsFetching(false))
        }
    };
};