import React from 'react'
import {OneFieldContent, OneFieldWrapper, TotalDescriptions, TotalPart} from "./other-fields-array-styles";
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";

type PropsType = {
    cargo_groups: CargoGroupType[] | null
}

const OtherModesFieldArray:React.FC<PropsType> = ({cargo_groups}) => {
    return (
        <OneFieldWrapper>
            <OneFieldContent>
                 <TotalPart>Total: 15w/m</TotalPart>
                <TotalDescriptions>= 1 x boxes of 5w/m</TotalDescriptions>
            </OneFieldContent>
        </OneFieldWrapper>
    )
}

export default OtherModesFieldArray