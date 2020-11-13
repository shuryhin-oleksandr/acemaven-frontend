import React from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//types
import {CargoGroupType} from "../../../../../../_BLL/types/search/search_types";
import {PackagingType} from "../../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//BLL
import {useDispatch} from "react-redux";
import {searchActions} from "../../../../../../_BLL/reducers/search_client/searchClientReducer";
//styles
import {OneFieldContent, OneFieldWrapper, TotalDescriptions, TotalPart} from "./other-fields-array-styles";
//icons
import close_icon from '../../../../../../_UI/assets/icons/close-icon.svg'


type PropsType = {
    cargo: CargoGroupType,
    packaging_types: PackagingType[] | null,
    deleteCargoGroup: (id: number) => void,
    setEditableCargoGroupToState: (id: number) => void,
    editCargoGroup: (edit_data: CargoGroupType) => void,
    setOpenCalcPopup: (value: boolean) => void,
    search_success: boolean
}

const OneField:React.FC<PropsType> = ({cargo, packaging_types, deleteCargoGroup, setEditableCargoGroupToState, setOpenCalcPopup, search_success}) => {

    let a = packaging_types && packaging_types.find(p => p.id === Number(cargo.packaging_type))

    const dispatch = useDispatch()
    let setEditMode = (id: number) => {
        setEditableCargoGroupToState(id)
        setOpenCalcPopup(true)
        dispatch(searchActions.setEdit(true))
    }


    return (
        <OneFieldWrapper>
            <OneFieldContent >
                <TotalPart onClick={() => !search_success && setEditMode(Number(cargo.id))}>Total: {cargo ? cargo.total_wm : ''}w/m</TotalPart>
                <TotalDescriptions>= {cargo ? cargo.volume : ''} x {a ? a.description : 'boxes'} of {cargo ? cargo.total_per_pack : ''}w/m</TotalDescriptions>
                {!search_success
                    && <IconButton onClick={() => deleteCargoGroup(Number(cargo.id))} style={{padding: '10px'}}>
                        <img src={close_icon} alt=""/>
                    </IconButton>}
            </OneFieldContent>
        </OneFieldWrapper>
    )
}

export default OneField