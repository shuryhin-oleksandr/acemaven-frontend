import React, {useEffect, useState} from 'react'
import Layout from "../../../../components/BaseLayout/Layout";
import BookingCard from './BookingCard';
import AssignAgentPopup from "../../../../components/PopUps/assign_master_to_booking/AssignAgentPopup";
import {useDispatch, useSelector} from "react-redux";
import {getWorkersList} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import AssignConfirmationPopup from "../../../../components/PopUps/assign_master_to_booking/AssignConfirmationPopup";


const BookingCardContainer = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getWorkersList())
    }, [dispatch])

    const [isAssignAgent, setAssignAgent] = useState(false)
    const [isAssignConfirmation, setAssignConfirmation] = useState(false)
    const [agent_full_name, setAgentFullName] = useState('')
    let workers = useSelector((state:AppStateType) => state.profile.workersList)
    let agents_workers = workers?.filter(w => w.roles.includes('agent'))


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
            <BookingCard setAssignAgent={setAssignAgent}/>
        </Layout>
    )
}

export default BookingCardContainer
