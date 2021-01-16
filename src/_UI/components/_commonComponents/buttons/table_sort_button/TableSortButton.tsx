import React, {useRef} from "react";
import sort_arrows from "../../../../assets/icons/rates&services/sort_arrows.svg";
import {filterByThunk} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {getFilteredRateListThunk} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {SortButton} from "./table-sort-button-style";
import {getClientQuotesThunk} from "../../../../../_BLL/thunks/quotes/clientQuotesThunk";
import {getAgentQuotesListThunk} from "../../../../../_BLL/thunks/quotes/agentQuotesThunk";
import {getBookingRequestListThunk} from "../../../../../_BLL/thunks/booking_agent_thunk/bookingAgentThunk";
import {useDispatch} from "react-redux";
import {getAgentsOperationsThunk} from "../../../../../_BLL/thunks/operations/agent/OperationsAgentThunk";
import {getClientOperationsThunk} from "../../../../../_BLL/thunks/operations/client/OperationsClientThunk";
import {getBillingOperationsListThunk} from "../../../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import moment from "moment";

type PropsType = {
    column_name: string;
    direction: string;
    mode: string;
    searchValue: string;
    searchColumn: string;
    thunkName?: string;
    my_operations?: string;
    operation_status?: string,
    dates?: string[]
};

const TableSortButton: React.FC<PropsType> = ({
                                                  column_name,
                                                  direction,
                                                  mode,
                                                  thunkName,
                                                  ...props
                                              }) => {
    const dispatch = useDispatch();
    const descendingOrder = useRef(false);
    let date_from = props.dates?.length ? moment(props.dates[0]).format("DD/MM/YYYY") : "";
    let date_to = props.dates?.length
        ? moment(props.dates[1]).add(1, "days").format("DD/MM/YYYY")
        : "";

    return (
        <SortButton
            onClick={() => {
                if (thunkName === "rates") {
                    dispatch(
                        getFilteredRateListThunk(
                            direction,
                            mode,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                    );
                } else if (thunkName === "quotes") {
                    dispatch(
                        getClientQuotesThunk(
                            mode,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                    );
                } else if (thunkName === "quotes_agent") {
                    dispatch(
                        getAgentQuotesListThunk(
                            mode,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                    );
                } else if (thunkName === "agent_booking") {
                    dispatch(
                        getBookingRequestListThunk(
                            mode,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                    );
                } else if (thunkName === 'billing') {
                    dispatch(getBillingOperationsListThunk(
                        mode,
                        descendingOrder.current ? `-${column_name}` : column_name,
                        props.searchColumn,
                        props.searchValue,
                        props.operation_status,
                        date_from,
                        date_to))
                } else if (thunkName === "operations") {
                    props.my_operations === "mine"
                        ? dispatch(
                        getAgentsOperationsThunk(
                            mode,
                            true,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue,
                            props.operation_status
                        )
                        )
                        : dispatch(
                        getAgentsOperationsThunk(
                            mode,
                            true,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue,
                            props.operation_status
                        )
                        );
                } else if (thunkName === "operations_client") {
                    props.my_operations === "mine"
                        ? dispatch(
                        getClientOperationsThunk(
                            mode,
                            true,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                        )
                        : dispatch(
                        getClientOperationsThunk(
                            mode,
                            true,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                        );
                } else {
                    dispatch(
                        filterByThunk(
                            direction,
                            mode,
                            descendingOrder.current ? `-${column_name}` : column_name,
                            props.searchColumn,
                            props.searchValue
                        )
                    );
                }
                descendingOrder.current = !descendingOrder.current;
            }}
        >
            <img src={sort_arrows} alt=""/>
        </SortButton>
    );
};

export default TableSortButton;
