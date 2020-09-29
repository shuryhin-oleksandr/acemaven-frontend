import React from "react";
import { SeaContainer } from "../sea_containerized_cargo/sea-conteneraized-cargo-styles";
import AdditionalSurcharges from "../../../../../components/_commonComponents/tables/AdditionalSurcharges";
import UsageFee from "./UsageFee";

const ULD_CargoForm:React.FC = () => {

    return (
        <>
            <SeaContainer><UsageFee /></SeaContainer>
            <SeaContainer minWidth='662px'>
                <AdditionalSurcharges />
            </SeaContainer>
        </>

    )
}

export default ULD_CargoForm