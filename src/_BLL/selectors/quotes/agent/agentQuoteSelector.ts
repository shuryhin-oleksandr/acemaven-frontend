import {AppStateType} from "../../../store";

export const getAgentQuotesLIstSelector = (state: AppStateType) => state.agent_quotes.agentsQuoteList
export const getExactQuoteInfoSelector = (state: AppStateType) => state.agent_quotes.exactQuoteInfo
export const getExistingRateForQuoteSelector = (state:AppStateType) => state.agent_quotes.existing_rate
export const getExistingSurchargeForQuoteSelector = (state:AppStateType) => state.agent_quotes.existing_surcharge_for_quote
export const getCheckSurchargeResult = (state: AppStateType) => state.agent_quotes.checkedSurchargeResult
export const saveRateResultSelector = (state: AppStateType) => state.agent_quotes.saveRateResult
export const getBadSavingMessageSelector = (state: AppStateType) => state.agent_quotes.badSavingMessage
export const getFindedFirst = (state: AppStateType) => state.agent_quotes.finded_first
