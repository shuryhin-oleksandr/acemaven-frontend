import React, {useEffect} from "react";
import CancelEditButton from "src/_UI/components/_commonComponents/buttons/editFormButtons/CancelEditButton";
import {ButtonsWrap, FormContainer, FormWrap} from "./company-info-styles";
import {InputWrap, SubmitButton, Wrapper} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import {EditCompanyInfo} from "../../../../../_BLL/types/profile&settingsTypes";
import { useForm } from "react-hook-form";
import {CompanyInfoType} from "../../../../../_BLL/types/profileSettingsType";
import {useDispatch} from "react-redux";
import {editCompanyInfo} from "../../../../../_BLL/reducers/profileReducer";

type PropsType = {
    setEdit?: (value: boolean) => void,
    companyInfo?: CompanyInfoType | null,
    company_type: string
}

const EditCompanyInfoForm:React.FC<PropsType> = ({setEdit, companyInfo, company_type}) => {
    let {register, handleSubmit, errors, setValue} = useForm({
        mode: "onSubmit",
        reValidateMode: "onBlur"
    })
    const dispatch = useDispatch()

    let onSubmit = (values: EditCompanyInfo) => {

        dispatch(editCompanyInfo(companyInfo?.id as number, values))
        setEdit && setEdit(false)
    }

    useEffect(() => {
        if(companyInfo) {
            Object.keys(companyInfo).forEach((key: string) => {
                setValue(key, companyInfo[key])
            })
        }
    }, [setValue, companyInfo])

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <Wrapper>
                    <InputWrap w='48%'>
                        <FormField name='city'
                                   error={errors?.city}
                                   placeholder='City'
                                   label='City'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                    </InputWrap>
                    <InputWrap w='48%'>
                        <FormField name='state'
                                   placeholder='State'
                                   error={errors?.state}
                                   label='State'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                    </InputWrap>
                </Wrapper>
                <Wrapper>
                    <InputWrap w='48%'>
                        <FormField name='address_line_first'
                                   error={errors?.address1}
                                   placeholder='str. 27'
                                   label='Address'
                                   inputRef={register({
                                       required: 'Field is required'
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
                                   error={errors?.zipCode}
                                   label='Zip Code'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                    </InputWrap>
                </Wrapper>
                <InputWrap w='48%'>
                    <FormField name='phone'
                               error={errors?.phoneNumber}
                               placeholder='+375296665544'
                               label='Phone Number'
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                    />
                    {company_type !== 'client' && <FormField name='website'
                               label='Website'
                               placeholder='www.company.com'
                               error={errors?.website}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                    />}
                </InputWrap>
            </FormWrap>
            <ButtonsWrap>
                <SubmitButton type='submit'
                              style={{backgroundColor: 'black', width: '176px', marginTop: '0',
                                  height: '40px', marginRight: '25px', marginBottom: '10px'}}
                >
                    Save changes
                </SubmitButton>
                <CancelEditButton text='CANCEL' setIsEdit={setEdit}/>
            </ButtonsWrap>
        </FormContainer>
    )
}

export default EditCompanyInfoForm