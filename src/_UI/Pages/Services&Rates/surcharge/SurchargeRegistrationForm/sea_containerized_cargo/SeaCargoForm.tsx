import React from "react";
import { SeaContainer } from "./sea-conteneraized-cargo-styles";
import Handling from "./Handling";
import AdditionalSurcharges from "./AdditionalSurcharges";


const SeaCargoForm:React.FC = () => {

    return (
        <SeaContainer>
            <Handling />
            <AdditionalSurcharges />
        </SeaContainer>
    )
};

export default SeaCargoForm