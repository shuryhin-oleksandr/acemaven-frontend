import React, {useEffect, useState} from "react";
//types
import {AppStateType} from "../../../_BLL/store";
import {CurrentShippingType, ShippingTypesEnum} from "../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {CargoGroupType} from "../../../_BLL/types/search/search_types";
//BLL
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentShippingTypeSelector,
    getShippingTypesSelector
} from "../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
    getCargoGroupsListSelector, getEditableCargoSelector, getFrozenChoicesSelector, getSearchResult, getSearchSuccess,
    getWmCalculationSuccessSelector
} from "../../../_BLL/selectors/search/searchClientSelector";
import {
    getDestinationPorts,
    getIsLocalPort,
    getOriginPorts
} from "../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import {getWMCalculationThunk} from "../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import {searchActions} from "../../../_BLL/reducers/search_client/searchClientReducer";
import {surchargeActions} from "../../../_BLL/reducers/surcharge&rates/surchargeReducer";
//components
import Layout from "../../components/BaseLayout/Layout";
import DashboardPage from "./DashboardPage";
import ChargeableWeightPopup from "../../components/PopUps/chargable_weight/ChargeableWeightPopup";
import ModalWindow from "../../components/_commonComponents/ModalWindow/ModalWindow";
import {agentOperationsActions} from "../../../_BLL/reducers/operations/agent/agentOperationsReducer";
import {clientOperationsActions} from "../../../_BLL/reducers/operations/client/clientOperationsReducer";
import {getAgentsOperationsThunk} from "../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getClientOperationsThunk} from "../../../_BLL/thunks/operations/client/OperationsClientThunk";
import {
    getAgentsOperationsListSelector,
    getClientOperationsListSelector
} from "../../../_BLL/selectors/operations/agentOperationsSelector";
import {AppCompaniesTypes} from "../../../_BLL/types/commonTypes";
import {getClientQuotesThunk} from "../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getAgentQuotesListThunk} from "../../../_BLL/thunks/quotes/agentQuotesThunk";



const DashboardContainer:React.FC = () => {
    //const search_result = false
    const [widgetsVisible, setWidgetsVisible] = useState(true);

    const dispatch = useDispatch()

    //conditions for calculation popup
    const [isOpenCalcPopup, setOpenCalcPopup] = useState(false)

    //current shipping mode id
    const [shippingValue, setShippingValue] = useState(0);

    //data from store
    const calc_success = useSelector(getWmCalculationSuccessSelector)
    const current_shipping_type = useSelector(getCurrentShippingTypeSelector)
    const shipping_types = useSelector(getShippingTypesSelector)
    let shipping_modes_options = (current_shipping_type === ShippingTypesEnum.AIR) ? shipping_types[0]?.shipping_modes : shipping_types[1]?.shipping_modes
    const usageFees = shipping_modes_options?.find(m => m.id === shippingValue)?.container_types || []
    const packaging_types = shipping_modes_options?.find(m => m.id === shippingValue)?.packaging_types || []
    const cargo_groups = useSelector(getCargoGroupsListSelector)
    const editable_cargo_group = useSelector(getEditableCargoSelector)
    const search_result = useSelector(getSearchResult)
    const search_success = useSelector(getSearchSuccess)
    const duplicatesError = useSelector((state: AppStateType) => state.search.duplicates_error)
    const origin_ports = useSelector(getOriginPorts);
    const destination_ports = useSelector(getDestinationPorts);
    const frozen_choices = useSelector(getFrozenChoicesSelector);
    const origin_port_value = useSelector(getIsLocalPort);
    let company_type = useSelector(
        (state: AppStateType) =>
            state.profile.authUserInfo?.companies &&
            state.profile.authUserInfo?.companies[0]
    );
    let agent_operations_list = useSelector(getAgentsOperationsListSelector);
    let client_operations_list = useSelector(getClientOperationsListSelector);

    let setDuplicatedCargoError = (error: string) => {
        dispatch(searchActions.setDuplicatedError(error))
    }

    let setMode = (value: CurrentShippingType) => {
        dispatch(surchargeActions.setCurrentShippingType(value))
    }

    //async calculation for mode (except FCL) on the search widget
    const getCalculation = ( data: CargoGroupType) => {
        dispatch(getWMCalculationThunk(data))
    }

    let clearStorage = () => {
        sessionStorage.removeItem('origin_id')
        sessionStorage.removeItem('destination_id')
    }

    useEffect(() => {
        clearStorage()
        dispatch(agentOperationsActions.setAgentOperationsList([]))
        dispatch(clientOperationsActions.setClientOperationsList([]))
    }, [])

    useEffect(() => {
        if(company_type) {
            company_type?.type === AppCompaniesTypes.AGENT
                ? dispatch(getAgentsOperationsThunk('', true, "", "", "", 'active'))
                : dispatch(getClientOperationsThunk('', true, "", "", "", 'active'));
        }
    }, [company_type]);

    useEffect(() => {
        if (company_type) {
            company_type?.type === AppCompaniesTypes.CLIENT
                ? dispatch(getClientQuotesThunk('', '', '', ''))
                : dispatch(getAgentQuotesListThunk('', '', '', ''))
        }

    }, [dispatch, company_type]);


    return (
        <Layout>
            <ModalWindow isOpen={isOpenCalcPopup}>
                <ChargeableWeightPopup calc_success={calc_success}
                                       setOpenCalcPopup={setOpenCalcPopup}
                                       packaging_types={packaging_types}
                                       container_types={usageFees}
                                       shippingValue={shippingValue}
                                       getCalculation={getCalculation}
                                       current_shipping_type={current_shipping_type}
                                       editable_cargo_group={editable_cargo_group}
                />
            </ModalWindow>
            <div style={{position:"relative", width:"100%", height: "100%", minHeight: 700, zIndex: 0}}>
                <DashboardPage widgetsVisible={widgetsVisible}
                               setWidgetsVisible={setWidgetsVisible}
                               shippingValue={shippingValue}
                               setOpenCalcPopup={setOpenCalcPopup}
                               setShippingValue={setShippingValue}
                               setMode={setMode}
                               mode={current_shipping_type}
                               cargo_groups={cargo_groups}
                               packaging_types={packaging_types}
                               container_types={usageFees}
                               disabled={search_success}
                               search_result={search_result}
                               search_success={search_success}
                               duplicatedCargoError={duplicatesError}
                               setDuplicatedCargoError={setDuplicatedCargoError}
                               shippingTypes={shipping_types}
                               origin_ports={origin_ports}
                               destination_ports={destination_ports}
                               frozen_choices={frozen_choices}
                               origin_port_value={origin_port_value}
                               operations_list={company_type?.type === AppCompaniesTypes.AGENT ? agent_operations_list : client_operations_list}
                />
            </div>

        </Layout>
    )
}

export default DashboardContainer