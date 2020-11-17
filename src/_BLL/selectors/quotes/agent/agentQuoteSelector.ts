import {AppStateType} from "../../../store";

export const getAgentQuotesLIstSelector = (state: AppStateType) => state.agent_quotes.agentsQuoteList
export const getExactQuoteInfoSelector = (state: AppStateType) => state.agent_quotes.exactQuoteInfo