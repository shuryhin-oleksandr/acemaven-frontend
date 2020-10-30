import React from 'react'
import {
    AcceptButton, AssignButton,
    BookingInfo,
    BookingNumber,
    BookingStatus,
    CardContent,
    CardWrapper,
    ContentHeader, RejectButton, ActionsButtons
} from "./booking-card-style";


type PropsType = {

}

const BookingCard:React.FC<PropsType> = ({}) => {

    let current_user_role = 'client'

    return (
        <CardWrapper>
            <CardContent>
                <ContentHeader>
                    <BookingInfo>
                        <BookingNumber>
                            Booking ACY9087512
                        </BookingNumber>
                        <BookingStatus>
                            <span style={{color: '#1ab8e5'}}>STATUS</span> 05/11 21:00 BOOKING IS CONFIRMED LA LA LA
                        </BookingStatus>
                    </BookingInfo>
                    <ActionsButtons>
                        {current_user_role === 'master' && <AssignButton>ASSIGN</AssignButton>}
                        <AcceptButton>ACCEPT</AcceptButton>
                        <RejectButton>REJECT</RejectButton>
                    </ActionsButtons>
                </ContentHeader>
            </CardContent>
        </CardWrapper>
    )
}

export default BookingCard