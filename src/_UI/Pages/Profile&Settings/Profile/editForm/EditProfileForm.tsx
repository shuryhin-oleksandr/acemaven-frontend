import React, {useEffect, useState} from 'react';
//react-hook-form
import {useForm} from "react-hook-form";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//API
import {profileSettingsAPI} from "../../../../../_DAL/API/profileSettingsAPI";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
import {profileActions} from "../../../../../_BLL/reducers/profileReducer";
//helpers
import {getFilesFormData} from "../../../../../_BLL/helpers/MultipartFormDataHelper";
//types
import {IAuthUserInfo} from "../../../../../_BLL/types/authTypes";
//components
import {InputWrap, SubmitButton} from 'src/_UI/Pages/ActivateCompany/CreateNewUser/AddUserForm';
import CancelEditButton from 'src/_UI/components/_commonComponents/buttons/editFormButtons/CancelEditButton';
import DropZone from "../../../../components/DropZone/index";
import FormField from "../../../../components/_commonComponents/Input/FormField";
//styles
import styled from "styled-components";
import {ButtonsWrap, FormContainer, FormWrap, Role, Roles, RolesWrap} from './edit-form-styles';
import {HeaderWrap, ProfileTitle} from "../profile-styles";
import {Label} from 'src/_UI/components/_commonComponents/ProfileinfoBlock/profile-info-field-styles';
import {FullfilledWrap} from "../../../ActivateCompany/AdditionalUser/additional-user-styles";
//icons
import Close from "../../../../assets/icons/close-icon.svg";


type PropsType = {
    isEdit: boolean,
    setIsEdit: (value: boolean) => void,
    isChangeMode: boolean,
    setChangeMode: (value: boolean) => void
}

const EditProfileForm: React.FC<PropsType> = ({setIsEdit, isChangeMode, setChangeMode}) => {
    const {register, handleSubmit, errors, setValue} = useForm<IAuthUserInfo>()
    const dispatch = useDispatch()
    let userId = useSelector((state: AppStateType) => state.profile?.authUserInfo?.id)
    let profile = useSelector((state: AppStateType) => state.profile.authUserInfo)


    const [fileOne, setFile] = useState(null)


    useEffect(() => {
        if (profile) {
            Object.keys(profile).forEach((key: string) => {
                setValue(key, profile && profile[key])
            })

        }
    }, [setValue, profile])

    const onSubmit = (values: IAuthUserInfo) => {
        const wholeData = getFilesFormData(values, fileOne)

        dispatch(profileActions.setIsFetching(true))
        !isChangeMode && profileSettingsAPI.editProfile(userId as number, wholeData)
            .then((res) => {
                dispatch(profileActions.setAuthUserInfo(res.data))
                dispatch(profileActions.setIsFetching(false))
                setIsEdit(false)
            })
            .catch((e) => {
                console.log('error', e.response)
                dispatch(profileActions.setIsFetching(false))
            })
    }

    const [img, setImg] = useState("");

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrap>
                <ProfileTitle>My Profile</ProfileTitle>
                {!isChangeMode && <ButtonsWrap>
                    <SubmitButton type='submit'
                                  style={{
                                      backgroundColor: 'black', width: '176px', marginTop: '0',
                                      height: '40px', marginRight: '25px'
                                  }}
                    >
                        SAVE CHANGES
                    </SubmitButton>
                    <CancelEditButton setIsEdit={setIsEdit} text='CANCEL'/>
                </ButtonsWrap>}
            </HeaderWrap>
            <FormWrap>
                <RolesWrap>
                    <Label>Roles</Label>
                    {profile?.roles?.map(r => <Roles key={r}><Role role={r}>{r}</Role></Roles>)}
                </RolesWrap>
                {img ? (
                    <div style={{
                        display: "flex",
                        width: '100%',
                        alignItems: "flex-start",
                        marginTop: '20px',
                        marginBottom: '50px'
                    }}>
                        <Photo src={img}/>
                        <CloseIcon
                            src={Close}
                            alt="Close"
                            onClick={() => {
                                setImg("");
                            }}
                        />
                    </div>
                ) : (
                    <div style={{marginTop: '45px', marginBottom: '50px', width: '100%'}}>
                        <DropZone setFile={setFile} name='photo' setImg={setImg}/>
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
                                   error={errors?.first_name}
                        />
                    </InputWrap>
                    <InputWrap w='47%'>
                        <FormField label='Last Name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   placeholder='Last Name'
                                   name='last_name'
                                   error={errors?.last_name}
                        />
                    </InputWrap>
                </FullfilledWrap>
                <FormField label='Phone Number'
                           inputRef={register({
                               required: 'Field is required',
                               maxLength: 13,
                               pattern: /^(\+)?([0-9]){10,13}$/
                           })}
                           placeholder='+000000000000'
                           name='phone'
                           error={errors?.phone}
                           max='13'
                           pattern_message='Phone number has to include only + and numbers'
                />
                <FormField label='Position in the Company'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           placeholder='Position in the Company'
                           name='position'
                           error={errors?.position}
                />
                <ChangePasswordButton type='button' onClick={() => setChangeMode(true)}>CHANGE
                    PASSWORD</ChangePasswordButton>

            </FormWrap>
        </FormContainer>
    )
}


export default EditProfileForm

const Photo = styled.img`
  max-width: 185px;
  max-height: 185px;
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;

export const ChangePasswordButton = styled.button`
  background-color: #1B1B25;
  outline: none;
  border: 1px solid #3B3B41;
  height: 40px;
  width: 210px;
  font-family: "Helvetica Reg", sans-serif;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  
  &:hover {
    cursor: pointer;
  }
`

export const PopupOuter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .2);
  z-index: 29;
  display: flex;
  justify-content: center;
  align-items: center;
`
