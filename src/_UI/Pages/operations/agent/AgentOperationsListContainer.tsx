import React, { useState } from 'react'
//components
import {
    AgentOperationHeader, AgentOperationsContent,
    AgentOperationsInner,
    AgentOperationsWrapper, HideButton,
    OperationTitle
} from './agent-operations-list-container'
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import AgentOperationTable from './table/AgentOperationTable';
import OptionsOperationButtons from 'src/_UI/components/_commonComponents/optionsButtons/operations/OptionsOperationButtons';
//icons
import hide_map_icon from '../../../assets/icons/operations/hide_map.svg'
import {OperationType} from "../../../../_BLL/types/operations/operationsTypes";



type PropsType = {
    setSearchMode: (value: boolean) => void
    isSearchMode: boolean
    mode: string
    setMode: (value: string) => void
    searchValue: string
    setSearchValue: (value: string) => void
    search_column: string
    setSearchColumn: (value: string) => void,
    my_operations: string,
    setMyOperations: (value: string) => void,
    operations_list: OperationType[]
}

const AgentOperationsListContainer:React.FC<PropsType> = ({setSearchMode, ...props}) => {

    const [isHide, setIsHide] = useState(true)

    return (
        <AgentOperationsWrapper>
            {!isHide && <div style={{width: '100%', height: '490px', backgroundColor: 'rgba(0, 0, 0, .07'}}/>}
            <AgentOperationsInner>
                <HideButton isHide={isHide} onClick={() => isHide ? setIsHide((false)) : setIsHide(true)}>
                    <img src={hide_map_icon} alt=""/>
                </HideButton>
                <AgentOperationsContent>
                    <AgentOperationHeader>
                        <OperationTitle>
                            Operations
                        </OperationTitle>
                        <div style={{display: 'flex', width: '315px', justifyContent: 'space-between'}}>
                            <OptionsOperationButtons mode={props.mode}
                                                     setMode={props.setMode}
                                                     searchValue={props.searchValue}
                                                     searchColumn={props.search_column}
                                                     directory=''
                                                     my_operations={props.my_operations}
                                                     setMyOperations={props.setMyOperations}
                            />
                            <OptionsDeliveryButtons mode={props.mode}
                                                    setMode={props.setMode}
                                                    searchValue={props.searchValue}
                                                    searchColumn={props.search_column}
                                                    directory=''

                            />
                        </div>
                    </AgentOperationHeader>
                    <AgentOperationTable setSearchMode={setSearchMode}
                                         isSearchMode={props.isSearchMode}
                                         mode={props.mode}
                                         setMode={props.setMode}
                                         searchValue={props.searchValue}
                                         setSearchValue={props.setSearchValue}
                                         search_column={props.search_column}
                                         setSearchColumn={props.setSearchColumn}
                                         operations_list={props.operations_list}
                    />
                </AgentOperationsContent>
            </AgentOperationsInner>
        </AgentOperationsWrapper>
    )
}

export default AgentOperationsListContainer