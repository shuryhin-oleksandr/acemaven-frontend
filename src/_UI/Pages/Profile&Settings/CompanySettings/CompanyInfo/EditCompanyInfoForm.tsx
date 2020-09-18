import React from "react";
import CancelEditButton from "src/_UI/components/_commonComponents/buttons/editFormButtons/CancelEditButton";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {ButtonsWrap, FormContainer, FormWrap} from "./company-info-styles";
import {InputWrap, SubmitButton, Wrapper} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import {EditCompanyInfo} from "../../../../../_BLL/types/profile&settingsTypes";
import { useForm } from "react-hook-form";

type PropsType = {
    setEdit?: VoidFunctionType
}

const EditCompanyInfoForm:React.FC<PropsType> = ({setEdit}) => {
    let {register, getValues, handleSubmit, errors} = useForm<EditCompanyInfo>()
    let onSubmit = (values: EditCompanyInfo) => {
        console.log(values)
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormWrap>
                <Wrapper>
                    <InputWrap w='48%'>
                        <FormField name='city'
                                   getValues={getValues}
                                   error={errors?.city?.message}
                                   placeholder='City'
                                   label='City'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                    </InputWrap>
                    <InputWrap w='48%'>
                        <FormField name='State'
                                   placeholder='State'
                                   error={errors?.state?.message}
                                   label='State'
                                   getValues={getValues}
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                    </InputWrap>
                </Wrapper>
                <Wrapper>
                    <InputWrap w='48%'>
                        <FormField name='address1'
                                   getValues={getValues}
                                   error={errors?.address1?.message}
                                   placeholder='Street 27'
                                   label='Address'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                        <FormField name='address2'
                                   getValues={getValues}
                                   placeholder='201'
                                   inputRef={register}
                        />
                    </InputWrap>
                    <InputWrap w='48%'>
                        <FormField name='zipCode'
                                   placeholder='000000'
                                   error={errors?.zipCode?.message}
                                   label='Zip Code'
                                   getValues={getValues}
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                        />
                    </InputWrap>
                </Wrapper>
                <InputWrap w='48%'>
                    <FormField name='phoneNumber'
                               getValues={getValues}
                               error={errors?.phoneNumber?.message}
                               placeholder='+375296665544'
                               label='Phone Number'
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                    />
                    <FormField name='email'
                               label='Email'
                               getValues={getValues}
                               placeholder='email@email.com'
                               error={errors?.email?.message}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                    />
                </InputWrap>
            </FormWrap>
            <ButtonsWrap>
                <SubmitButton type='submit'
                              style={{backgroundColor: 'black', width: '176px', marginTop: '0',
                                  height: '40px', marginRight: '25px'}}
                >
                    Save changes
                </SubmitButton>
                <CancelEditButton text='Cancel' setIsEdit={setEdit}/>
            </ButtonsWrap>
        </FormContainer>
    )
}

export default EditCompanyInfoForm