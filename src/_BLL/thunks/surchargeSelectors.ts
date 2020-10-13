import {AppStateType} from "../store";


export const getBookedDates = (state: AppStateType) => state.surcharge.bookedDates?.map((d: {start_date: string, expiration_date: string})=> (
    {from: new Date(d.start_date),
    to: new Date(d.expiration_date),
    before: new Date()}
    )
)

export const getSurcharge = (state: AppStateType) => state.surcharge.surcharge_info