import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";

let reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleWare));
export type AppStateType = ReturnType<typeof reducers>;