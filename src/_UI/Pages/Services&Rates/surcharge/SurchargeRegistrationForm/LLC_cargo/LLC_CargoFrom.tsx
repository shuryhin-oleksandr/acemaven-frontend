import React from 'react';
import {
    SeaContainer
} from '../sea_containerized_cargo/sea-conteneraized-cargo-styles';
import AdditionalSurcharges from 'src/_UI/components/_commonComponents/tables/AdditionalSurcharges';



const LLC_CargoForm:React.FC = () => {

    return (
        <SeaContainer minWidth='662px'>
           <AdditionalSurcharges />
        </SeaContainer>
    )
}

export default LLC_CargoForm;