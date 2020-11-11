import {AppStateType} from "../../../store";

export const getClientQuotesList = (state: AppStateType) => state.client_quotes.quotes_list
