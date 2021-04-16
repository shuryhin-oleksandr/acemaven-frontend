import React, {useEffect} from "react";
//react-hook-form
import {useForm} from "react-hook-form";
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {editCompanyInfo} from "../../../../../_BLL/thunks/profile/profileThunks";
//types
import {EditCompanyInfo} from "../../../../../_BLL/types/profile&settingsTypes";
import {CompanyInfoType} from "../../../../../_BLL/types/profileSettingsType";
//components
import CancelEditButton from "src/_UI/components/_commonComponents/buttons/editFormButtons/CancelEditButton";
import {InputWrap, SubmitButton, Wrapper} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
//styles
import {ButtonsWrap, FormContainer, FormWrap} from "./company-info-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    setEdit?: (value: boolean) => void,
    companyInfo?: CompanyInfoType | null,
    company_type: string
}

const EditCompanyInfoForm: React.FC<PropsType> = ({setEdit, companyInfo, company_type}) => {
    let {register, handleSubmit, errors, setValue} = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur"
    })
    const dispatch = useDispatch()

    let onSubmit = (values: EditCompanyInfo) => {

        dispatch(editCompanyInfo(companyInfo?.id as number, values, setEdit))

    }

    useEffect(() => {
        if (companyInfo) {
            Object.keys(companyInfo).forEach((key: string) => {
                setValue(key, companyInfo[key])
            })
        }
    }, [setValue, companyInfo])
 const {t} = useTranslation();
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <Wrapper>
                    <InputWrap w='48%'>
                        <FormField name='city'
                                   error={errors?.city}
                                   placeholder={t("Register/City")}
                                   label={t("Register/City")}
                                   inputRef={register({
                                       required: `${t("Error message/Field is required")}`
                                   })}
                        />
                    </InputWrap>
                    <InputWrap w='48%'>
                        <FormField name='state'
                                   placeholder={t("Register/State")}
                                   error={errors?.state}
                                   label={t("Register/State")}
                                   inputRef={register({
                                       required: `${t("Error message/Field is required")}`
                                   })}
                        />
                    </InputWrap>
                </Wrapper>
                <Wrapper>
                    <InputWrap w='48%'>
                        <FormField name='address_line_first'
                                   error={errors?.address_line_first}
                                   placeholder='str. 27'
                                   label={t("Register/Address")}
                                   inputRef={register({
                                       required:`${t("Error message/Field is required")}`
                                   })}
                        />
                        <FormField name='address_line_second'
                                   placeholder='apt.1'
                                   inputRef={register}
                        />
                    </InputWrap>
                    <InputWrap w='48%'>
                        <FormField name='zip_code'
                                   placeholder='000000'
                                   error={errors?.zip_code}
                                   label={t("Register/Zip Code")}
                                   inputRef={register({
                                       required: `${t("Error message/Field is required")}`,
                                       pattern: {
                                           value: /^[a-zA-Z0-9](.){3,10}[a-zA-Z0-9]$/,
                                           message: t("Error message/Invalid format")
                                       }
                                   })}
                                   pattern_message={t("Error message/Invalid format")}
                        />
                    </InputWrap>
                </Wrapper>
                <InputWrap w='48%'>
                    <FormField name='phone'
                               error={errors?.phone}
                               placeholder='+375296665544'
                               label={t("Register/Phone Number")}
                               inputRef={register({
                                   required: `${t("Error message/Field is required")}`,
                                   pattern: {
                                       value: /^(\+)([0-9]){10,13}$/,
                                       message: t("Error message/Invalid number")

                                   }})}
                               pattern_message={t("Error message/Invalid number")}

                    />
                    {company_type !== 'client' && <FormField name='website'
                                                             label={t("Register/Website")}
                                                             placeholder='www.company.com'
                                                             error={errors?.website}
                                                             inputRef={register({
                                                                 required: `${t("Error message/Field is required")}`
                                                             })}
                    />}
                </InputWrap>
            </FormWrap>
            <ButtonsWrap>
                <SubmitButton type='submit'
                              style={{
                                  backgroundColor: 'black', width: '176px', marginTop: '0',
                                  height: '40px', marginRight: '25px', marginBottom: '10px'
                              }}
                >
                  {t("My Profile/SAVE CHANGES")}
                </SubmitButton>
                <CancelEditButton text={t("My Profile/CANCEL")} setIsEdit={setEdit}/>
            </ButtonsWrap>
        </FormContainer>
    )
}

export default EditCompanyInfoForm