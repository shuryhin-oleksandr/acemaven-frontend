import React, {useEffect, useState} from 'react'
import Layout from "../../../../components/BaseLayout/Layout";
import BookingCard from './BookingCard';
import AssignAgentPopup from "../../../../components/PopUps/assign_master_to_booking/AssignAgentPopup";
import {useDispatch, useSelector} from "react-redux";
import {getWorkersList} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import AssignConfirmationPopup from "../../../../components/PopUps/assign_master_to_booking/AssignConfirmationPopup";
import RejectBookingByAgentPopup from "../../../../components/PopUps/reject_booking_by_agent/RejectBookingByAgentPopup";
import AcceptPopup from "../../../../components/PopUps/accept_booking_popup/AcceptPopup";
import MovedToOperationsPopup from "../../../../components/PopUps/moved_to_operations_popup/MovedToOperationsPopup";
import {getBookingInfoByIdThunk} from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import { useParams } from 'react-router-dom';
import {getExactBookingInfo} from "../../../../../_BLL/selectors/booking/bookingAgentSelector";


const BookingCardContainer = () => {

    let query = useParams()
    // @ts-ignore
    let id = query.id

    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getWorkersList())
       dispatch(getBookingInfoByIdThunk(Number(id)))
    }, [dispatch])

    //conditions for popups
    const [isAssignAgent, setAssignAgent] = useState(false)
    const [isAssignConfirmation, setAssignConfirmation] = useState(false)
    const [agent_full_name, setAgentFullName] = useState('')
    const [isRejectPopupOpen, setRejectPopupOpen] = useState(false)
    const [isAcceptPopup, openAcceptPopup] = useState(false)
    const [isMovedToOperations, setMovedToOperations] = useState(false)

    //data from store
    let workers = useSelector((state:AppStateType) => state.profile.workersList)
    let agents_workers = workers?.filter(w => w.roles.includes('agent')) //only users who have role = 'agent' can be assigned
    let exact_booking_info = useSelector(getExactBookingInfo)


    return (
        <Layout>
            {isAssignAgent && <AssignAgentPopup agents={agents_workers && agents_workers?.length > 0 ? agents_workers : null}
                                                setAssignAgent={setAssignAgent}
                                                setAgentFullName={setAgentFullName}
                                                setAssignConfirmation={setAssignConfirmation}
            />
            }
            {isAssignConfirmation && <AssignConfirmationPopup setAssignAgent={setAssignAgent}
                                                              setAssignConfirmation={setAssignConfirmation}
                                                              agent_full_name={agent_full_name}
            />}
            {isRejectPopupOpen && <RejectBookingByAgentPopup setRejectPopupOpen={setRejectPopupOpen}
            />}
            {isAcceptPopup && <AcceptPopup openAcceptPopup={openAcceptPopup}/>}
            {isMovedToOperations && <MovedToOperationsPopup setMovedToOperations={setMovedToOperations}/>}
            <BookingCard setAssignAgent={setAssignAgent}
                         setRejectPopupOpen={setRejectPopupOpen}
                         openAcceptPopup={openAcceptPopup}
                         exact_booking_info={exact_booking_info}
            />
        </Layout>
    )
}

export default BookingCardContainer
