import React, {useState} from 'react'
//components
import SurchargeAdditionalTable from "./surcharge_tables/SurchargeAdditionalTable";
import HandlingSurchargeTable from "./surcharge_tables/HandlingSurchargeTable";
//types
import {SurchargeInfoType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//styles
import {
    Arrow,
    SurchargeForRateContainer,
    SurchargeTitle,
    SurchargeToRateInner,
    TableWrapper, TextWrap
} from "./surcharges-to-rate-styles";
//icons
import show_arrow from '../../../../../../_UI/assets/icons/rates&services/show_arrow.svg';
import hide_arrow from '../../../../../../_UI/assets/icons/rates&services/hide_arrow.svg';


type PropsType = {
    existing_surcharge: SurchargeInfoType | null
}


const SurchargesToRate:React.FC<PropsType> = ({ existing_surcharge}) => {
    const [isFullView, setFullView] = useState(false)

    return (
        <SurchargeForRateContainer >
            <SurchargeToRateInner>
                <SurchargeTitle>
                    <TextWrap>SURCHARGES</TextWrap>
                    <Arrow type='button' onClick={() => isFullView ? setFullView(false) : setFullView(true)}>
                        <img src={!isFullView ? show_arrow : hide_arrow} alt=""/>
                    </Arrow>
                </SurchargeTitle>
                {
                    isFullView &&
                <TableWrapper>
                    {existing_surcharge?.usage_fees && existing_surcharge.usage_fees.length > 0
                    && <HandlingSurchargeTable containers={existing_surcharge?.usage_fees}/>}
                    {existing_surcharge && <SurchargeAdditionalTable charges={existing_surcharge?.charges}/>}
                </TableWrapper>
                }
            </SurchargeToRateInner>
        </SurchargeForRateContainer>
    )
}

export default SurchargesToRate