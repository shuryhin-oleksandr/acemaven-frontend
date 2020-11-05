import React, {useState} from "react";
import Layout from "../../components/BaseLayout/Layout";
import DashboardPage from "./DashboardPage";
import SearchContainer from "./search/SearchContainer";
import ChargeableWeightPopup from "../../components/PopUps/chargable_weight/ChargeableWeightPopup";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentShippingTypeSelector,
    getShippingTypesSelector
} from "../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
    getCargoGroupsListSelector,
    getWmCalculationSuccessSelector
} from "../../../_BLL/selectors/search/searchClientSelector";
import {CurrentShippingType, ShippingTypesEnum} from "../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {surchargeActions} from "../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {getWMCalculationThunk} from "../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import {CargoGroupType} from "../../../_BLL/types/search/search_types";


const DashboardContainer:React.FC = () => {
    const search_result = false

    const dispatch = useDispatch()

    //conditions for calculation popup
    const [isOpenCalcPopup, setOpenCalcPopup] = useState(false)

    //current shipping mode id
    const [shippingValue, setShippingValue] = useState(0);

    //data from store
    let calc_success = useSelector(getWmCalculationSuccessSelector)
    const current_shipping_type = useSelector(getCurrentShippingTypeSelector)
    let shipping_types = useSelector(getShippingTypesSelector)
    let shipping_modes_options = (current_shipping_type === ShippingTypesEnum.AIR) ? shipping_types[0]?.shipping_modes : shipping_types[1]?.shipping_modes
    const usageFees = shipping_modes_options?.find(m => m.id === shippingValue)?.container_types || []
    const packaging_types = shipping_modes_options?.find(m => m.id === shippingValue)?.packaging_types || []
    const cargo_groups = useSelector(getCargoGroupsListSelector)

    let setMode = (value: CurrentShippingType) => {
        dispatch(surchargeActions.setCurrentShippingType(value))
    }

    //async calculation for mode (except FCL) on the search widget
    const getCalculation = ( data: CargoGroupType) => {
        dispatch(getWMCalculationThunk(data))
    }

    return (
        <Layout>
            {isOpenCalcPopup && <ChargeableWeightPopup calc_success={calc_success}
                                                       setOpenCalcPopup={setOpenCalcPopup}
                                                       packaging_types={packaging_types}
                                                       container_types={usageFees}
                                                       shippingValue={shippingValue}
                                                       getCalculation={getCalculation}
                                                       current_shipping_type={current_shipping_type}
            />}
            {search_result
                ? <SearchContainer />
                : <DashboardPage setOpenCalcPopup={setOpenCalcPopup}
                                 shippingValue={shippingValue}
                                 setShippingValue={setShippingValue}
                                 setMode={setMode}
                                 mode={current_shipping_type}
                                 cargo_groups={cargo_groups}
                />}
        </Layout>
    )
}

export default DashboardContainer