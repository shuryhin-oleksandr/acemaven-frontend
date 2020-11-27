import React from 'react'
//types
import {CargoGroupQuoteType} from "../../../../../../../_BLL/types/quotes/quotesTypes";
//styles
import CargoGroupsTable from "../../../../../operations/agent/ExactOperationContainer/OperationCard/blocks/Tables/CargoGroupsTable";

type PropsType = {
    cargo_groups?: CargoGroupQuoteType[],
    booking_shipping_mode: {id: number, title: string}
}

const ShippingModeTable:React.FC<PropsType> = ({cargo_groups, booking_shipping_mode}) => {
    return (
        <CargoGroupsTable cargo_groups={cargo_groups}
                          object_shipping_mode={booking_shipping_mode}
        />
    )
}

export default ShippingModeTable