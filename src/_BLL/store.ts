import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";
import { commonReducer } from "./reducers/commonReducer";
import {profileReducer} from "./reducers/profileReducer";
import {employeesAndBanksReducer} from "./reducers/employeesAndBanksReducer";


let reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    common: commonReducer,
    company: employeesAndBanksReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleWare));
export type AppStateType = ReturnType<typeof reducers>;