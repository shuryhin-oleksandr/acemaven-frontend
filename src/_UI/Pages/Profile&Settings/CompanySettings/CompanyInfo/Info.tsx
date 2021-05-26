import React from 'react'
//types
import {CompanyInfoType} from "../../../../../_BLL/types/profileSettingsType";
//styles
import {EditIcon, Field, FieldsContent, FieldsWrap, Label, TextWrap} from "./company-info-styles";
//icons
import editIcon from "../../../../assets/icons/profile/editProfile.svg";
import {useTranslation} from "react-i18next";

type PropsType = {
    setEdit: (value: boolean) => void,
    companyInfo?: CompanyInfoType | null,
    company_type: string,
    current_user_role: string[]
}

const Info:React.FC<PropsType> = ({setEdit, companyInfo, company_type, current_user_role}) => {
    const {t} = useTranslation();
    return (
        <FieldsWrap>
            <FieldsContent>
                <Field >
                    <Label>{t("Register/City")}</Label>
                    <TextWrap>{companyInfo?.city ? companyInfo?.city : '-'}</TextWrap>
                </Field>
                <Field>
                    <Label>{t("Register/State")}</Label>
                    <TextWrap>{companyInfo?.state ? companyInfo?.state : '-'}</TextWrap>
                </Field>
                <Field>
                    <Label>{t("Register/Phone Number")}</Label>
                    <TextWrap>{companyInfo?.phone ? companyInfo?.phone : '-'}</TextWrap>
                </Field>
                <Field>
                    <Label>{t("Register/Address")}</Label>
                    <TextWrap>
                        {companyInfo?.address_line_first ? companyInfo?.address_line_first : '-'}
                        {companyInfo?.address_line_second ? companyInfo?.address_line_second : '-' && (","+" "+ companyInfo?.address_line_second ? companyInfo?.address_line_second : '-')}
                    </TextWrap>
                </Field>
                <Field>
                    <Label>{t("Register/Zip Code")}</Label>
                    <TextWrap>{companyInfo?.zip_code ? companyInfo?.zip_code : '-'}</TextWrap>
                </Field>
                {company_type !== 'client' && <Field>
                    <Label>{t("Register/Website")}</Label>
                    <TextWrap>{companyInfo?.website ? companyInfo?.website : '-'}</TextWrap>
                </Field>}
            </FieldsContent>
            {current_user_role.includes('master') && <EditIcon onClick={() => setEdit(true)}><img src={editIcon} alt=""/></EditIcon>}
        </FieldsWrap>
    )
}

export default Info