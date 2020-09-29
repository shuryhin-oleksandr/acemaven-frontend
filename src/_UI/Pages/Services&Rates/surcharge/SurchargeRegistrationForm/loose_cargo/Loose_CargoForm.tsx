import React from 'react';
import {
    SeaContainer
} from "../sea_containerized_cargo/sea-conteneraized-cargo-styles";
import AdditionalSurcharges from "../../../../../components/_commonComponents/tables/AdditionalSurcharges";


const Loose_CargoForm:React.FC = () => {

    return (
        <SeaContainer minWidth='662px'>
            <AdditionalSurcharges />
        </SeaContainer>
    )
}

export default Loose_CargoForm