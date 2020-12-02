import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//react-router-dom
import {useHistory, useParams } from 'react-router-dom';
//BLL
import {AppStateType} from "../../../../../_BLL/store";
import {
    acceptBookingByAgentThunk,
    assignAgentThunk,
    getBookingInfoByIdThunk,
    getMyAgentsThunk
} from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {
    getExactBookingInfo,
    getIsFetching,
    getMyAgents
} from "../../../../../_BLL/selectors/booking/bookingAgentSelector";
import {agentBookingActions} from "../../../../../_BLL/reducers/booking/agentBookingReducer";
//components
import Layout from "../../../../components/BaseLayout/Layout";
import BookingCard from './BookingCard';
import AssignAgentPopup from "../../../../components/PopUps/assign_master_to_booking/AssignAgentPopup";
import AssignConfirmationPopup from "../../../../components/PopUps/assign_master_to_booking/AssignConfirmationPopup";
import RejectBookingByAgentPopup from "../../../../components/PopUps/reject_booking_by_agent/RejectBookingByAgentPopup";
import MovedToOperationsPopup from "../../../../components/PopUps/moved_to_operations_popup/MovedToOperationsPopup";
import ModalWindow from '../../../../../_UI/components/_commonComponents/ModalWindow/ModalWindow';



const BookingCardContainer:React.FC = () => {

    let query = useParams()
    // @ts-ignore
    let id = query.id

    const history = useHistory()
    const dispatch = useDispatch()
    const my_id = useSelector((state:AppStateType) => state.profile.authUserInfo?.id)

    const unmountHandler = () => {
        dispatch(agentBookingActions.setExactBookingInfo(null))
    }

    useEffect(() => {
       dispatch(getMyAgentsThunk())
       dispatch(getBookingInfoByIdThunk(Number(id)))
        return () => {
           unmountHandler()
        }
    }, [dispatch])

    //thunk
    let assignConfirmationFunction = () => {
        dispatch(assignAgentThunk(agent_id, Number(exact_booking_info?.id), history))
    }
    let acceptBookingOnMe = () => {
        dispatch(acceptBookingByAgentThunk(Number(my_id), Number(exact_booking_info?.id), history))
    }

    //conditions for popups
    const [isAssignAgent, setAssignAgent] = useState(false)
    const [isAssignConfirmation, setAssignConfirmation] = useState(false)
    const [agent_full_name, setAgentFullName] = useState('')
    const [agent_id, setAgentId] = useState(0)
    const [isRejectPopupOpen, setRejectPopupOpen] = useState(false)
    const [isMovedToOperations, setMovedToOperations] = useState(false)

    //data from store
    let agents_workers = useSelector(getMyAgents) //only users who have role = 'agent' can be assigned
    let exact_booking_info = useSelector(getExactBookingInfo)
    let isFetching = useSelector(getIsFetching)


    return (
        <Layout>
                    <ModalWindow isOpen={isAssignAgent}>
                        <AssignAgentPopup agents={agents_workers && agents_workers?.length > 0 ? agents_workers : null}
                                          setAssignAgent={setAssignAgent}
                                          setAgentFullName={setAgentFullName}
                                          setAgentId={setAgentId}
                                          setAssignConfirmation={setAssignConfirmation}

                        />
                    </ModalWindow>
                    <ModalWindow isOpen={isAssignConfirmation}>
                        <AssignConfirmationPopup setAssignAgent={setAssignAgent}
                                                 setAssignConfirmation={setAssignConfirmation}
                                                 agent_full_name={agent_full_name}
                                                 assign_thunk={assignConfirmationFunction}

                        />
                    </ModalWindow>
                    <ModalWindow isOpen={isRejectPopupOpen}>
                      <RejectBookingByAgentPopup setRejectPopupOpen={setRejectPopupOpen}/>
                    </ModalWindow>
                    <ModalWindow isOpen={isMovedToOperations}>
                      <MovedToOperationsPopup setMovedToOperations={setMovedToOperations}/>
                    </ModalWindow>
                    <BookingCard setAssignAgent={setAssignAgent}
                                 setRejectPopupOpen={setRejectPopupOpen}
                                 acceptBookingOnMe={acceptBookingOnMe}
                                 exact_booking_info={exact_booking_info}
                                 history={history}
                                 isFetching={isFetching}
                    />
        </Layout>
    )
}

export default BookingCardContainer
