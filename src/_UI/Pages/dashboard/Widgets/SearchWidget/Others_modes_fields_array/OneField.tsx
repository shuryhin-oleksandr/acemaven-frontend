import React from 'react'
import {OneFieldContent, OneFieldWrapper, TotalDescriptions, TotalPart} from "./other-fields-array-styles";
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";
import {PackagingType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";

type PropsType = {
    cargo: CargoGroupType,
    packaging_types: PackagingType[] | null,
}

const OneField:React.FC<PropsType> = ({cargo, packaging_types}) => {

      let a = packaging_types && packaging_types.find(p => p.id === cargo.packaging_type)
    console.log(a)

    return (
        <OneFieldWrapper>
            <OneFieldContent>
                <TotalPart>Total: {cargo ? cargo.total_wm : ''}w/m</TotalPart>
                <TotalDescriptions>= {cargo ? cargo.volume : ''} x {a ? a.description : 'boxes'} of {cargo ? cargo.total_per_pack : ''}w/m</TotalDescriptions>
            </OneFieldContent>
        </OneFieldWrapper>
    )
}

export default OneField