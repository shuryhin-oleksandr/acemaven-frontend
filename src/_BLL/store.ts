import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";
import {profileReducer} from "./reducers/profileReducer";

let reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleWare));
export type AppStateType = ReturnType<typeof reducers>;