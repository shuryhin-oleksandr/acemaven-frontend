import React from "react";
import {
    OptionButton,
    OptionButtonPlane,
    OptionsButtonsWrap,
} from "../../../../Pages/Services&Rates/surcharge/register_new_surcharge/form-styles";
import shipActive from "../../../../assets/icons/rates&services/Ship.svg";
import ship from "../../../../assets/icons/rates&services/ShipDefault.svg";
import planeActive from "../../../../assets/icons/rates&services/PlanActive.svg";
import plane from "../../../../assets/icons/rates&services/Plan.svg";
import {filterByThunk} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {getClientQuotesThunk} from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getFilteredRateListThunk} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {getAgentQuotesListThunk} from "../../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {getBookingRequestListThunk} from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {getAgentsOperationsThunk} from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {useDispatch} from "react-redux";
import {CurrentShippingType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {getClientOperationsThunk} from "../../../../../_BLL/thunks/operations/client/OperationsClientThunk";
import {getBillingOperationsListThunk} from "../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import {getClientBillingOperationsThunk} from "../../../../../_BLL/thunks/billing/agent/ClientBillingThunks";
import moment from "moment";

type PropsType = {
    setMode?: (value: CurrentShippingType) => void;
    mode: string;
    dispatch?: any;
    directory: string;
    searchColumn: string;
    searchValue: string;
    setShippingValue?: (shippingModeId: number) => void;
    disabled?: boolean;
    thunkName?: string;
    my_operations?: string;
    operation_status?: string,
    dates?: string[]
};

const OptionsDeliveryButtons: React.FC<PropsType> = ({
                                                         setMode,
                                                         mode,
                                                         disabled,
                                                         dates,
                                                         ...props
                                                     }) => {
    const dispatch = useDispatch();

    let dispatchDeliveryHandler = (type: CurrentShippingType) => {
        setMode && setMode(type);
        props.setShippingValue && props.setShippingValue(0);
        if (props.thunkName === "quotes") {
            dispatch(
                getClientQuotesThunk(type, "", props.searchColumn, props.searchValue)
            );
        } else if (props.thunkName === "quotes_agent") {
            dispatch(
                getAgentQuotesListThunk(type, "", props.searchColumn, props.searchValue)
            );
        } else if (props.thunkName === 'billing') {
            dispatch(getBillingOperationsListThunk(
                type,
                "",
                props.searchColumn,
                props.searchValue,
                props.operation_status))
        } else if (props.thunkName === 'client_billing') {
            let date_from = dates?.length ? moment(dates[0]).format("DD/MM/YYYY") : "";

            let date_to = dates?.length
                ? moment(dates[1]).add(1, "days").format("DD/MM/YYYY")
                : "";

            dispatch(getClientBillingOperationsThunk(
                type,
                "completed",
                date_from,
                date_to,
                ));
        } else if (props.thunkName === "rates") {
            dispatch(
                getFilteredRateListThunk(
                    props.directory,
                    type,
                    "",
                    props.searchColumn,
                    props.searchValue
                )
            );
        } else if (props.thunkName === "operations") {
            props.my_operations === "mine"
                ? dispatch(
                getAgentsOperationsThunk(
                    type,
                    true,
                    "",
                    props.searchColumn,
                    props.searchValue,
                    props.operation_status
                )
                )
                : dispatch(
                getAgentsOperationsThunk(
                    type,
                    "",
                    "",
                    props.searchColumn,
                    props.searchValue,
                    props.operation_status
                )
                );
        } else if (props.thunkName === "operations_client") {
            props.my_operations === "mine"
                ? dispatch(
                getClientOperationsThunk(
                    type,
                    true,
                    "",
                    props.searchColumn,
                    props.searchValue,
                    props.operation_status
                )
                )
                : dispatch(
                getClientOperationsThunk(
                    type,
                    "",
                    "",
                    props.searchColumn,
                    props.searchValue,
                    props.operation_status
                )
                );
        } else if (props.thunkName === "agent_booking") {
            dispatch(
                getBookingRequestListThunk(
                    type,
                    "",
                    props.searchColumn,
                    props.searchValue
                )
            );
        } else if (props.thunkName === "search_widget") {
            return;
        } else {
            dispatch(
                filterByThunk(
                    props.directory,
                    type,
                    "",
                    props.searchColumn,
                    props.searchValue
                )
            );
        }
    };

    return (
        <OptionsButtonsWrap>
            <OptionButton
                onClick={() => {
                    !disabled && dispatchDeliveryHandler("sea");
                }}
                mode={mode}
            >
                <img src={mode === "sea" ? shipActive : ship} alt=""/>
            </OptionButton>
            <OptionButtonPlane
                onClick={() => {
                    !disabled && dispatchDeliveryHandler("air");
                }}
                mode={mode}
            >
                <img src={mode === "air" ? planeActive : plane} alt=""/>
            </OptionButtonPlane>
        </OptionsButtonsWrap>
    );
};

export default OptionsDeliveryButtons;
