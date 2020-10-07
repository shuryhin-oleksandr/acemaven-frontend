import React from "react";
import { SeaContainer } from "./sea-conteneraized-cargo-styles";
import Handling from "./Handling";
import AdditionalSurcharges from "./AdditionalSurcharges";
import {CurrencyType, ShippingModeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {register} from "../../../../../../serviceWorker";
import AdditionalWithConditionsSurcharges
    from "../../../../../components/_commonComponents/tables/AdditionalWithConditionsSurcharges";

type PropsType = {
    ship_mode?: ShippingModeType | null,
    register?: any,
    control?: any,
    currency_list: CurrencyType[] | null,
    shipping_value?: number
}

const SeaCargoForm:React.FC<PropsType> = ({ship_mode, ...props}) => {
    let containers = ship_mode?.container_types

    return (
        <SeaContainer>
            {(containers && containers?.length > 0) && <Handling control={props.control}
                                                                 register={register}
                                                                 containers={containers ? containers : null}
                                                                 currency_list={props.currency_list}
            />}
            {props.shipping_value && (props.shipping_value === 3)
                ? <AdditionalSurcharges control={props.control}
                                        register={register}
                                        additionals={ship_mode?.additional_surcharges}
                                        currency_list={props.currency_list}
                />
                : <AdditionalWithConditionsSurcharges control={props.control}
                                                      register={register}
                                                      additionals={ship_mode?.additional_surcharges}
                                                      currency_list={props.currency_list}
                />
            }

        </SeaContainer>
    )
};

export default SeaCargoForm