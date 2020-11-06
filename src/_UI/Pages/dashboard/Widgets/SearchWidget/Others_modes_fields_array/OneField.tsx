import React from 'react'
import {OneFieldContent, OneFieldWrapper, TotalDescriptions, TotalPart} from "./other-fields-array-styles";
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";
import {PackagingType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../../../../_UI/assets/icons/close-icon.svg'
import {useDispatch} from "react-redux";
import {searchActions} from "../../../../../../_BLL/reducers/search_client/searchClientReducer";


type PropsType = {
    cargo: CargoGroupType,
    packaging_types: PackagingType[] | null,
    deleteCargoGroup: (id: number) => void,
    setEditableCargoGroupToState: (id: number) => void,
    editCargoGroup: (edit_data: CargoGroupType) => void,
    setOpenCalcPopup: (value: boolean) => void
}

const OneField:React.FC<PropsType> = ({cargo, packaging_types, deleteCargoGroup, setEditableCargoGroupToState,  setOpenCalcPopup}) => {

    let a = packaging_types && packaging_types.find(p => p.id === cargo.package_type)

    const dispatch = useDispatch()
    let setEditMode = (id: number) => {
        setEditableCargoGroupToState(id)
        setOpenCalcPopup(true)
        dispatch(searchActions.setEdit(true))
    }


    return (
        <OneFieldWrapper>
            <OneFieldContent >
                <TotalPart onClick={() => setEditMode(Number(cargo.id))}>Total: {cargo ? cargo.total_wm : ''}w/m</TotalPart>
                <TotalDescriptions>= {cargo ? cargo.volume : ''} x {a ? a.description : 'boxes'} of {cargo ? cargo.total_per_pack : ''}w/m</TotalDescriptions>
                <IconButton onClick={() => deleteCargoGroup(Number(cargo.id))} style={{padding: '10px'}}><img src={close_icon} alt=""/></IconButton>
            </OneFieldContent>
        </OneFieldWrapper>
    )
}

export default OneField