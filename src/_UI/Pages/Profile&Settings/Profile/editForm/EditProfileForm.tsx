import React, {useState} from 'react';
import {ButtonsWrap, FormContainer, FormWrap, Roles, RolesWrap} from './edit-form-styles';
import {HeaderWrap, ProfileTitle} from "../profile-styles";
import {InputWrap, SubmitButton} from 'src/_UI/Pages/ActivateCompany/CreateNewUser/AddUserForm';
import CancelEditButton from 'src/_UI/components/_commonComponents/buttons/editFormButtons/CancelEditButton';
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {useForm} from "react-hook-form";
import {IAdditionalUserCompleteData} from "../../../../../_BLL/types/addNewUserTypes";
import { Label } from 'src/_UI/components/_commonComponents/ProfileinfoBlock/profile-info-field-styles';
import Close from "../../../../assets/icons/close-icon.svg";
import styled from "styled-components";
import DropZone from "../../../../components/DropZone/index";
import {FullfilledWrap} from "../../../ActivateCompany/AdditionalUser/additional-user-styles";
import FormField from "../../../../components/_commonComponents/Input/FormField";

type PropsType = {
    isEdit: boolean,
    setIsEdit: VoidFunctionType
}

const EditProfileForm:React.FC<PropsType> = ({isEdit, setIsEdit}) => {
    const {register, handleSubmit, errors, getValues} = useForm<IAdditionalUserCompleteData>()
    const onSubmit = (values:any) => {
        console.log(values)
    }

    const [img, setImg] = useState("");

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrap>
                <ProfileTitle>My Profile</ProfileTitle>
                <ButtonsWrap>
                    <SubmitButton type='submit'
                        style={{backgroundColor: 'black', width: '176px', marginTop: '0',
                        height: '40px', marginRight: '25px'}}
                    >
                        Save changes
                    </SubmitButton>
                    <CancelEditButton setIsEdit={setIsEdit} text='Cancel' />
                </ButtonsWrap>

            </HeaderWrap>
            <FormWrap>
                <RolesWrap>
                    <Label>Roles</Label>
                    <Roles>Agent, Billing</Roles>
                </RolesWrap>
                {img ? (
                    <div style={{ display: "flex", width: '100%', alignItems: "flex-start", marginTop: '20px',marginBottom: '50px' }}>
                        <Photo src={img} />
                        <CloseIcon
                            src={Close}
                            alt="Close"
                            onClick={() => {
                                setImg("");
                            }}
                        />
                    </div>
                ) : (
                    <div style={{ marginTop: '45px', marginBottom: '50px', width: '100%'}}>
                        <DropZone name='photo' setImg={setImg} />
                    </div>
                )}
                <FullfilledWrap style={{marginBottom: '0'}}>
                    <InputWrap w='47%'>
                        <FormField label='Name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   placeholder='Name'
                                   name='name'
                                   error={errors?.name?.message}
                                   getValues={getValues}
                        />
                    </InputWrap>
                    <InputWrap  w='47%'>
                        <FormField label='Last Name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   placeholder='Last Name'
                                   name='lastName'
                                   error={errors?.lastName?.message}
                                   getValues={getValues}
                        />
                    </InputWrap>
                </FullfilledWrap>
                <FormField label='Phone Number'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           placeholder='Phone Number'
                           name='phoneNumber'
                           error={errors?.phoneNumber?.message}
                           getValues={getValues}
                />
                <FormField label='Position in the Company'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           placeholder='Position in the Company'
                           name='companyPosition'
                           error={errors?.companyPosition?.message}
                           getValues={getValues}
                />
                <FormField label='Password'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           placeholder='Password'
                           name='password'
                           error={errors?.password?.message}
                           getValues={getValues}
                />
                <FormField
                    inputRef={register({
                        required: 'Field is required'
                    })}
                    placeholder='Confirm password'
                    name='repeatPassword'
                    error={errors?.repeatPassword?.message}
                    getValues={getValues}
                />
            </FormWrap>
        </FormContainer>
    )
}


export default EditProfileForm

const Photo = styled.img`
  width: 185px;
  height: 185px;
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;
