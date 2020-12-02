import React from 'react'
import {

    InfoRowLabel, InfoRowValue
} from "../../../../Requests/Booking_agent/booking_card/booking-card-style";


type PropsType = {
    payment_due_by: string
}

const PaymentDueByForClient:React.FC<PropsType> = ({payment_due_by}) => {
    return (
        <>
            <div style={{display: 'flex', }}>
                <InfoRowLabel style={{marginRight: '10px'}}>PAYMENT DUE BY:</InfoRowLabel>
                <InfoRowValue>{payment_due_by ? payment_due_by : ''}</InfoRowValue>
            </div>

        </>
    )
}

export default PaymentDueByForClient