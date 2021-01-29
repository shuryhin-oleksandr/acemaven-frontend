import {AppStateType} from "../../store";

export const getOperationMessagesHistorySelector = (state: AppStateType) => state.chat_operation.message_history
export const getTypingUserIdSelector = (state: AppStateType) => state.chat_operation.typing_user