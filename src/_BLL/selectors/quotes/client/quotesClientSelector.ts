import {AppStateType} from "../../../store";

export const getClientQuotesListSelector = (state: AppStateType) => state.client_quotes.quotes_list
export const getClientQuotesIsFetching = (state: AppStateType) => state.client_quotes.isFetching
