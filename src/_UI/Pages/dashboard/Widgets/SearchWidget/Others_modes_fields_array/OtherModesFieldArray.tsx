import React from 'react'
//types
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";
import {PackagingType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {ContainerType} from "../../../../../../_BLL/types/rates&surcharges/ratesTypes";
//components
import OneField from "./OneField";


type PropsType = {
    cargo_groups: CargoGroupType[] | null,
    packaging_types: PackagingType[] | null,
    deleteCargoGroup: (id: number) => void,
    setEditableCargoGroupToState: (id: number) => void,
    editCargoGroup: (edit_data: CargoGroupType) => void,
    setOpenCalcPopup: (value: boolean) => void,
    search_success: boolean,
    container_types: ContainerType[]
}

const OtherModesFieldArray:React.FC<PropsType> = ({cargo_groups, packaging_types, deleteCargoGroup, search_success,
                                                      setEditableCargoGroupToState, editCargoGroup, setOpenCalcPopup, ...props}) => {
    return (
        <>
            {cargo_groups?.map((c, index) =>
            <OneField key={index}
                      cargo={c}
                      packaging_types={packaging_types}
                      container_types={props.container_types}
                      deleteCargoGroup={deleteCargoGroup}
                      editCargoGroup={editCargoGroup}
                      setEditableCargoGroupToState={setEditableCargoGroupToState}
                      setOpenCalcPopup={setOpenCalcPopup}
                      search_success={search_success}
            />
            )}
        </>

    )
}

export default OtherModesFieldArray