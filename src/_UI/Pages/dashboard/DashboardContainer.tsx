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
    getCargoGroupsListSelector, getEditableCargoSelector,
    getWmCalculationSuccessSelector
} from "../../../_BLL/selectors/search/searchClientSelector";
import {CurrentShippingType, ShippingTypesEnum} from "../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {surchargeActions} from "../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {getWMCalculationThunk} from "../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import {CargoGroupType} from "../../../_BLL/types/search/search_types";
import Search from "./Widgets/SearchWidget/Search";
import {SearchBox} from "./dashboard-styles";

const DashboardContainer:React.FC = () => {
    const search_result = true
    const [widgetsVisible, setWidgetsVisible] = useState(true);

    const dispatch = useDispatch()

    //conditions for calculation popup
    const [isOpenCalcPopup, setOpenCalcPopup] = useState(false)

    //current shipping mode id
    const [shippingValue, setShippingValue] = useState(0);
    console.log("mode_id",shippingValue)

    //data from store
    let calc_success = useSelector(getWmCalculationSuccessSelector)
    const current_shipping_type = useSelector(getCurrentShippingTypeSelector)
    let shipping_types = useSelector(getShippingTypesSelector)
    let shipping_modes_options = (current_shipping_type === ShippingTypesEnum.AIR) ? shipping_types[0]?.shipping_modes : shipping_types[1]?.shipping_modes
    const usageFees = shipping_modes_options?.find(m => m.id === shippingValue)?.container_types || []
    const packaging_types = shipping_modes_options?.find(m => m.id === shippingValue)?.packaging_types || []
    const cargo_groups = useSelector(getCargoGroupsListSelector)
    const editable_cargo_group = useSelector(getEditableCargoSelector)

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
                                                       editable_cargo_group={editable_cargo_group}
            />}
            <div style={{position:"relative", width:"100%"}}>
                <div style={{position:search_result?"relative":"absolute", zIndex:6, top:"30px", left:"30px", display:widgetsVisible?"block":"none"}}>
                    <Search setOpenCalcPopup={setOpenCalcPopup}
                            shippingValue={shippingValue}
                            setShippingValue={setShippingValue}
                            setMode={setMode}
                            mode={current_shipping_type}
                            cargo_groups={cargo_groups}
                            packaging_types={packaging_types}
                            disabled={search_result}
                    />
                </div>
            {search_result
                ? <SearchContainer />
                : <DashboardPage widgetsVisible={widgetsVisible} setWidgetsVisible={setWidgetsVisible}/>}
            </div>

        </Layout>
    )
}

export default DashboardContainer