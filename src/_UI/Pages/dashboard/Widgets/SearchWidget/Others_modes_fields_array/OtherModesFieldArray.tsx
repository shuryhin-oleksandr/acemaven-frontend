import React from 'react'
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";
import {PackagingType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import OneField from "./OneField";

type PropsType = {
    cargo_groups: CargoGroupType[] | null,
    packaging_types: PackagingType[] | null,
}

const OtherModesFieldArray:React.FC<PropsType> = ({cargo_groups, packaging_types}) => {
    return (
        <>
            {cargo_groups?.map(c =>
            <OneField cargo={c}
                      packaging_types={packaging_types}
            />
            )}
        </>

    )
}

export default OtherModesFieldArray