import React from 'react'
import {SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {
    SurchargeForRateContainer,
    SurchargeTitle,
    SurchargeToRateInner,
    TableWrapper
} from "./surcharges-to-rate-styles";
import SurchargeAdditionalTable from "./surcharge_tables/SurchargeAdditionalTable";
import HandlingSurchargeTable from "./surcharge_tables/HandlingSurchargeTable";

type PropsType = {
    existing_surcharge: SurchargeInfoType | null
}

const SurchargesToRate:React.FC<PropsType> = ({ existing_surcharge}) => {
    return (
        <SurchargeForRateContainer>
            <SurchargeToRateInner>
                <SurchargeTitle>
                    SURCHARGES
                </SurchargeTitle>
                <TableWrapper>
                    {existing_surcharge?.usage_fees && existing_surcharge.usage_fees.length > 0
                    && <HandlingSurchargeTable containers={existing_surcharge?.usage_fees}/>}
                     <SurchargeAdditionalTable charges={existing_surcharge?.charges}/>
                </TableWrapper>
            </SurchargeToRateInner>
        </SurchargeForRateContainer>
    )
}

export default SurchargesToRate