import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { commonReducer } from "./reducers/commonReducer";
import { profileReducer } from "./reducers/profileReducer";
import { employeesAndBanksReducer } from "./reducers/employeesAndBanksReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { surchargeReducer } from "./reducers/surcharge&rates/surchargeReducer";
import { rateReducer } from "./reducers/surcharge&rates/rateReducer";
import { bookingReducer } from "./reducers/booking/bookingReducer";
import {searchClientReducer} from "./reducers/search_client/searchClientReducer";
import {quotesClientReducer} from "./reducers/quotes/quotesClientReducer";
import {quotesAgentReducer} from "./reducers/quotes/quotesAgentReducer";
import {agentBookingReducer} from "./reducers/booking/agentBookingReducer";

let reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  common: commonReducer,
  company: employeesAndBanksReducer,
  surcharge: surchargeReducer,
  rate: rateReducer,
  booking: bookingReducer,
  agent_booking: agentBookingReducer,
  search: searchClientReducer,
  client_quotes: quotesClientReducer,
  agent_quotes: quotesAgentReducer
});

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleWare))
);
export type AppStateType = ReturnType<typeof reducers>;
