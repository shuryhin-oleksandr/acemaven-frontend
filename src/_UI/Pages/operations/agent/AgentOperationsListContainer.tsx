import React, {useState} from 'react'
//types
import {OperationType} from "../../../../_BLL/types/operations/operationsTypes";
import {CurrentShippingType, ShippingTypesEnum} from "../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
//helpers
import {
    autoTrackWithEventsHelper,
    manualTrackWithEventsHelper
} from "../../../../_BLL/helpers/tracker/autoTracksWithEventsHelper";
//components
import {
    OperationHeader, OperationsContent,
    OperationsInner,
    OperationsWrapper, HideButton,
    OperationTitle
} from './agent-operations-list-container'
import OptionsDeliveryButtons
    from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import AgentOperationTable from './table/AgentOperationTable';
import OptionsOperationButtons
    from 'src/_UI/components/_commonComponents/optionsButtons/operations/OptionsOperationButtons';
import MapComponent from "../../dashboard/MapComponent/MapComponent";
//styles
import {MapWrapper} from "../../dashboard/dashboard-styles";
//icons
import hide_map_icon from '../../../assets/icons/operations/hide_map.svg'



type PropsType = {
    setSearchMode: (value: boolean) => void
    isSearchMode: boolean
    mode: string
    setMode: (value: CurrentShippingType) => void
    searchValue: string
    setSearchValue: (value: string) => void
    search_column: string
    setSearchColumn: (value: string) => void,
    my_operations: string,
    setMyOperations: (value: string) => void,
    operations_list: OperationType[],
    operation_status: string
}

const AgentOperationsListContainer: React.FC<PropsType> = ({setSearchMode, ...props}) => {

    //local state
    const [isHide, setIsHide] = useState(false);

    // SEA
    let events = [...autoTrackWithEventsHelper(props.operations_list), ...manualTrackWithEventsHelper(props.operations_list)]

    //AIR
    let air_events = [...autoTrackWithEventsHelper(props.operations_list), ...manualTrackWithEventsHelper(props.operations_list)]



    return (
        <OperationsWrapper>
            {!isHide && props.operation_status === 'active'
            && <MapComponent
                isMarkerShown={false}
                loadingElement={<div style={{height: `420px`}}/>}
                containerElement={<MapWrapper/>}
                mapElement={<div style={{height: `420px`}}/>}
                events={(props.mode === ShippingTypesEnum.SEA) ? events : air_events}
            />}
            <OperationsInner>
                {props.operation_status === 'active' &&
                <HideButton isHide={isHide} onClick={() => isHide ? setIsHide((false)) : setIsHide(true)}>
                    <img src={hide_map_icon} alt=""/>
                </HideButton>}
                <OperationsContent style={{padding:"0 80px 50px 0"}} isHide={isHide} status={props.operation_status}>
                    <OperationHeader>
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
                                                     operation_status={props.operation_status}
                            />
                            <OptionsDeliveryButtons mode={props.mode}
                                                    setMode={props.setMode}
                                                    searchValue={props.searchValue}
                                                    searchColumn={props.search_column}
                                                    directory=''
                                                    thunkName="operations"
                                                    my_operations={props.my_operations}
                                                    operation_status={props.operation_status}
                            />
                        </div>
                    </OperationHeader>
                        <AgentOperationTable setSearchMode={setSearchMode}
                                             isSearchMode={props.isSearchMode}
                                             mode={props.mode}
                                             setMode={props.setMode}
                                             searchValue={props.searchValue}
                                             setSearchValue={props.setSearchValue}
                                             search_column={props.search_column}
                                             setSearchColumn={props.setSearchColumn}
                                             operations_list={props.operations_list}
                                             my_operations={props.my_operations}
                                             operation_status={props.operation_status}
                        />
                </OperationsContent>
            </OperationsInner>
        </OperationsWrapper>
    )
}

export default AgentOperationsListContainer