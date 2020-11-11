import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { commonReducer } from "./reducers/commonReducer";
import { profileReducer } from "./reducers/profileReducer";
import { employeesAndBanksReducer } from "./reducers/employeesAndBanksReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { surchargeReducer } from "./reducers/surcharge&rates/surchargeReducer";
import { rateReducer } from "./reducers/surcharge&rates/rateReducer";
import { bookingReducer } from "./reducers/bookingReducer";
import {searchClientReducer} from "./reducers/search_client/searchClientReducer";
import {quotesClientReducer} from "./reducers/quotes/quotesClientReducer";

let reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  common: commonReducer,
  company: employeesAndBanksReducer,
  surcharge: surchargeReducer,
  rate: rateReducer,
  booking: bookingReducer,
  search: searchClientReducer,
  client_quotes: quotesClientReducer
});

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleWare))
);
export type AppStateType = ReturnType<typeof reducers>;
