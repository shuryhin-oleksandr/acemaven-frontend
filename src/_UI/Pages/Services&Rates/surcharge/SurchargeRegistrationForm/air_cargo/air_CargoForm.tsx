import React from "react";
import { SeaContainer } from "../sea_containerized_cargo/sea-conteneraized-cargo-styles";
import UsageFee from "./UsageFee";
import {CurrencyType, ShippingModeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";

import AdditionalWithConditionsSurcharges
    from "../../../../../components/_commonComponents/tables/AdditionalWithConditionsSurcharges";

type PropsType = {
    ship_mode?: ShippingModeType | null,
    register?: any,
    control?: any,
    currency_list: CurrencyType[] | null,
    shipping_value?: number
}

const AirCargoForm:React.FC<PropsType> = ({ship_mode, ...props}) => {
    let containers = ship_mode?.container_types

    return (
        <>
            {
                (props.shipping_value && props.shipping_value === 2) &&
                <SeaContainer>
                    <UsageFee control={props.control}
                              register={props.register}
                              currency_list={props.currency_list}
                              containers={containers}
                    />
                </SeaContainer>
            }
            <SeaContainer minWidth='662px'>
                <AdditionalWithConditionsSurcharges control={props.control}
                                                    register={props.register}
                                                    additionals={ship_mode?.additional_surcharges}
                                                    currency_list={props.currency_list}
                />
            </SeaContainer>

        </>

    )
}

export default AirCargoForm