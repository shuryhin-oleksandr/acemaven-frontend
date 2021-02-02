import {AppStateType} from "../../store";

export const getOperationMessagesHistorySelector = (state: AppStateType) => state.chat_operation.message_history
export const getTypingUserSelector = (state: AppStateType) => state.chat_operation.typing_user
export const getStopTypingValueSelector = (state: AppStateType) => state.chat_operation.stop_typing