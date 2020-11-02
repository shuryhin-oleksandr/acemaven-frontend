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
    setAssignAgent: (value: boolean) => void
}

const BookingCard:React.FC<PropsType> = ({setAssignAgent}) => {

    let current_user_role = 'master'


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
                        {current_user_role === 'master' && <AssignButton onClick={() => setAssignAgent(true)}>ASSIGN</AssignButton>}
                        <AcceptButton>ACCEPT</AcceptButton>
                        <RejectButton>REJECT</RejectButton>
                    </ActionsButtons>
                </ContentHeader>
            </CardContent>
        </CardWrapper>
    )
}

export default BookingCard