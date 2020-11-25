import React from 'react'
import {EditIcon, Field, FieldsContent, FieldsWrap, Label, TextWrap} from "./company-info-styles";
import editIcon from "../../../../assets/icons/profile/editProfile.svg";
import {CompanyInfoType} from "../../../../../_BLL/types/profileSettingsType";

type PropsType = {
    setEdit: (value: boolean) => void,
    companyInfo?: CompanyInfoType | null,
    company_type: string
}

const Info:React.FC<PropsType> = ({setEdit, companyInfo, company_type}) => {

    return (
        <FieldsWrap>
            <FieldsContent>
                <Field >
                    <Label>City</Label>
                    <TextWrap>{companyInfo?.city}</TextWrap>
                </Field>
                <Field>
                    <Label>State</Label>
                    <TextWrap>{companyInfo?.state}</TextWrap>
                </Field>
                <Field>
                    <Label>Phone</Label>
                    <TextWrap>{companyInfo?.phone}</TextWrap>
                </Field>
                <Field>
                    <Label>Address</Label>
                    <TextWrap>{companyInfo?.address_line_first + ',' + ' ' + companyInfo?.address_line_second}</TextWrap>
                </Field>
                <Field>
                    <Label>Zip Code</Label>
                    <TextWrap>{companyInfo?.zip_code}</TextWrap>
                </Field>
                {company_type !== 'client' && <Field>
                    <Label>Website</Label>
                    <TextWrap>{companyInfo?.website}</TextWrap>
                </Field>}
            </FieldsContent>
            <EditIcon onClick={() => setEdit(true)}><img src={editIcon} alt=""/></EditIcon>
        </FieldsWrap>
    )
}

export default Info