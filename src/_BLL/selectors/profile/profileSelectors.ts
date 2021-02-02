import {AppStateType} from "../../store";

export const getProfileIsFetching = (state: AppStateType) => state.profile.isFetching
export const getMySettingsSelector = (state: AppStateType) => state.profile.my_settings
export const getMyInfoSelector = (state: AppStateType) => state.profile.authUserInfo