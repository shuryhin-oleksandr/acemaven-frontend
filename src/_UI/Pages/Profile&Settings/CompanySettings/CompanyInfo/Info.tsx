import React from 'react'
import {EditIcon, Field, FieldsContent, FieldsWrap, Label, TextWrap} from "./company-info-styles";
import editIcon from "../../../../assets/icons/profile/editProfile.svg";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";

type PropsType = {
    setEdit: VoidFunctionType
}

const Info:React.FC<PropsType> = ({setEdit}) => {
    const labels = ['City', 'State', 'Phone Number', 'Address', 'Zip Code', 'Email']

    return (
        <FieldsWrap>
            <FieldsContent>
                {labels.map(l => <Field key={l}>
                        <Label>{l}</Label>
                        <TextWrap>bla bla</TextWrap>
                    </Field>
                )}
            </FieldsContent>
            <EditIcon onClick={() => setEdit(true)}><img src={editIcon} alt=""/></EditIcon>
        </FieldsWrap>
    )
}

export default Info