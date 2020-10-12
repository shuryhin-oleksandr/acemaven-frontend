import {AppStateType} from "../store";
import moment from "moment";


export const getBookedDates = (state: AppStateType) => state.surcharge.bookedDates?.map((d: {start_date: string, expiration_date: string})=> (
    {from: new Date(d.start_date),
    to: new Date(d.expiration_date)}
    )
)