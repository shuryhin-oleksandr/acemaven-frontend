import React from "react";
import { SeaContainer } from "./sea-conteneraized-cargo-styles";
import Handling from "./Handling";
import AdditionalSurcharges from "./AdditionalSurcharges";
import {ShippingModeType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
    ship_mode?: ShippingModeType | null
}

const SeaCargoForm:React.FC<PropsType> = ({ship_mode}) => {
    let containers = ship_mode?.container_types

    return (
        <SeaContainer>
            {(containers && containers?.length > 0) && <Handling containers={containers ? containers : null}/>}
            <AdditionalSurcharges additionals={ship_mode?.additional_surcharges}/>
        </SeaContainer>
    )
};

export default SeaCargoForm