import {Dispatch} from "redux";
import {bookingApi} from "../../../_DAL/API/bookingApi";


export const getBookingRequestListThunk = () => {
    return async (dispatch: Dispatch) => {
        try {
            let res = await bookingApi.getAgentsBookingRequestList()
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}