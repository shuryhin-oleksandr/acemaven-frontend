import React from 'react'
import {OneFieldContent, OneFieldWrapper, TotalDescriptions, TotalPart} from "./other-fields-array-styles";
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";

type PropsType = {
    cargo_groups: CargoGroupType[] | null
}

const OtherModesFieldArray:React.FC<PropsType> = ({cargo_groups}) => {
    return (
        <> {cargo_groups?.map(c =>
            <OneFieldWrapper>
                <OneFieldContent>
                    <TotalPart>Total: {c.total_wm}w/m</TotalPart>
                    <TotalDescriptions>= {c.volume} x boxes of {c.total_per_pack}w/m</TotalDescriptions>
                </OneFieldContent>
            </OneFieldWrapper>
        )}

        </>

    )
}

export default OtherModesFieldArray