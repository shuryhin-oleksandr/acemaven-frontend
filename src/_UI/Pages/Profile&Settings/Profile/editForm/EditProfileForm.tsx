import React, {useEffect, useState} from 'react';
import {ButtonsWrap, FormContainer, FormWrap, Role, Roles, RolesWrap} from './edit-form-styles';
import {HeaderWrap, ProfileTitle} from "../profile-styles";
import {InputWrap, SubmitButton} from 'src/_UI/Pages/ActivateCompany/CreateNewUser/AddUserForm';
import CancelEditButton from 'src/_UI/components/_commonComponents/buttons/editFormButtons/CancelEditButton';
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {useForm} from "react-hook-form";
import { Label } from 'src/_UI/components/_commonComponents/ProfileinfoBlock/profile-info-field-styles';
import Close from "../../../../assets/icons/close-icon.svg";
import styled from "styled-components";
import DropZone from "../../../../components/DropZone/index";
import {FullfilledWrap} from "../../../ActivateCompany/AdditionalUser/additional-user-styles";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {useDispatch, useSelector} from "react-redux";
import {editProfileInfo} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import {IAuthUserInfo} from "../../../../../_BLL/types/authTypes";


type PropsType = {
    isEdit: boolean,
    setIsEdit: VoidFunctionType
}

const EditProfileForm:React.FC<PropsType> = ({isEdit, setIsEdit}) => {
    const {register, handleSubmit, errors, getValues, setValue} = useForm<IAuthUserInfo>()
    const dispatch = useDispatch()
    let userId = useSelector((state: AppStateType) => state.profile?.authUserInfo?.id)
    let profile = useSelector((state: AppStateType) => state.profile.authUserInfo)

    useEffect(() => {
        if(profile) {
            Object.keys(profile).forEach((key: string) => {
                setValue(key, profile && profile[key])
            })
        }
    }, [setValue, profile])

    const onSubmit = (values:IAuthUserInfo) => {
        console.log(values)
        dispatch(editProfileInfo(userId as number, values))
        setIsEdit(false)
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
                        SAVE CHANGES
                    </SubmitButton>
                    <CancelEditButton setIsEdit={setIsEdit} text='CANCEL' />
                </ButtonsWrap>

            </HeaderWrap>
            <FormWrap>
                <RolesWrap>
                    <Label>Roles</Label>
                    {profile?.roles?.map(r => <Roles><Role role={r}>{r}</Role></Roles>)}
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
                                   name='first_name'
                                   error={errors?.first_name?.message}
                                   getValues={getValues}
                        />
                    </InputWrap>
                    <InputWrap  w='47%'>
                        <FormField label='Last Name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   placeholder='Last Name'
                                   name='last_name'
                                   error={errors?.last_name?.message}
                                   getValues={getValues}
                        />
                    </InputWrap>
                </FullfilledWrap>
                <FormField label='Phone Number'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           placeholder='Phone Number'
                           name='phone'
                           error={errors?.phone?.message}
                           getValues={getValues}
                />
                <FormField label='Position in the Company'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           placeholder='Position in the Company'
                           name='position'
                           error={errors?.position?.message}
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
                <FormField label='Confirm Password'
                    inputRef={register({
                        required: 'Field is required'
                    })}
                    placeholder='Confirm password'
                    name='confirm_password'
                    error={errors?.confirm_password?.message}
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
