import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import {getAgentsOperationsThunk} from "../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getAgentsOperationsListSelector} from "../../../_BLL/selectors/operations/agentOperationsSelector";
//components
import Layout from "../../components/BaseLayout/Layout";
import AgentOperationsListContainer from './agent/AgentOperationsListContainer';


const OperationsContainer:React.FC = () => {

    //data from store
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0])
    let operations_list = useSelector(getAgentsOperationsListSelector)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAgentsOperationsThunk(true))
    }, [])

    const [isSearchMode, setSearchMode] = useState(false)
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState('')
    const [search_column, setSearchColumn] = useState('')
    const [my_operations, setMyOperations] = useState('mine')


    return (
        <Layout>
            {company_type?.type === 'agent'
                ? <AgentOperationsListContainer setSearchMode={setSearchMode}
                                                isSearchMode={isSearchMode}
                                                mode={mode}
                                                setMode={setMode}
                                                searchValue={searchValue}
                                                setSearchValue={setSearchValue}
                                                search_column={search_column}
                                                setSearchColumn={setSearchColumn}
                                                my_operations={my_operations}
                                                setMyOperations={setMyOperations}
                                                operations_list={operations_list}
                />
                : <div/>
            }
        </Layout>
    )
}

export default OperationsContainer