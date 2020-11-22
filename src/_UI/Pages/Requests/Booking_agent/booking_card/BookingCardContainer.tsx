import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//react-router-dom
import { useParams } from 'react-router-dom';
//BLL
import {
    assignAgentThunk,
    getBookingInfoByIdThunk,
    getMyAgentsThunk
} from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {getExactBookingInfo, getMyAgents} from "../../../../../_BLL/selectors/booking/bookingAgentSelector";
//components
import Layout from "../../../../components/BaseLayout/Layout";
import BookingCard from './BookingCard';
import AssignAgentPopup from "../../../../components/PopUps/assign_master_to_booking/AssignAgentPopup";
import AssignConfirmationPopup from "../../../../components/PopUps/assign_master_to_booking/AssignConfirmationPopup";
import RejectBookingByAgentPopup from "../../../../components/PopUps/reject_booking_by_agent/RejectBookingByAgentPopup";
import AcceptPopup from "../../../../components/PopUps/accept_booking_popup/AcceptPopup";
import MovedToOperationsPopup from "../../../../components/PopUps/moved_to_operations_popup/MovedToOperationsPopup";


const BookingCardContainer = () => {

    let query = useParams()
    // @ts-ignore
    let id = query.id

    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getMyAgentsThunk())
       dispatch(getBookingInfoByIdThunk(Number(id)))
    }, [dispatch])

    //thunk
    let assignConfirmationFunction = () => {
        dispatch(assignAgentThunk(agent_id, Number(exact_booking_info?.id)))
    }

    //conditions for popups
    const [isAssignAgent, setAssignAgent] = useState(false)
    const [isAssignConfirmation, setAssignConfirmation] = useState(false)
    const [agent_full_name, setAgentFullName] = useState('')
    const [agent_id, setAgentId] = useState(0)
    const [isRejectPopupOpen, setRejectPopupOpen] = useState(false)
    const [isAcceptPopup, openAcceptPopup] = useState(false)
    const [isMovedToOperations, setMovedToOperations] = useState(false)

    //data from store

    let agents_workers = useSelector(getMyAgents) //only users who have role = 'agent' can be assigned
    let exact_booking_info = useSelector(getExactBookingInfo)


    return (
        <Layout>
            {isAssignAgent && <AssignAgentPopup agents={agents_workers && agents_workers?.length > 0 ? agents_workers : null}
                                                setAssignAgent={setAssignAgent}
                                                setAgentFullName={setAgentFullName}
                                                setAgentId={setAgentId}
                                                setAssignConfirmation={setAssignConfirmation}

            />
            }
            {isAssignConfirmation && <AssignConfirmationPopup setAssignAgent={setAssignAgent}
                                                              setAssignConfirmation={setAssignConfirmation}
                                                              agent_full_name={agent_full_name}
                                                              assign_thunk={assignConfirmationFunction}

            />}
            {isRejectPopupOpen && <RejectBookingByAgentPopup setRejectPopupOpen={setRejectPopupOpen}
            />}
            {isAcceptPopup && <AcceptPopup openAcceptPopup={openAcceptPopup}
                                           exact_booking_info={exact_booking_info ? exact_booking_info : null}
            />}
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
