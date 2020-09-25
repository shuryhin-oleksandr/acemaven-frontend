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
import { profileActions} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import {IAuthUserInfo} from "../../../../../_BLL/types/authTypes";
import {getFilesFormData} from "../../../../../_BLL/helpers/MultipartFormDataHelper";
import {profileSettingsAPI} from "../../../../../_DAL/API/profileSettingsAPI";
import ChangePasswordPage from "./ChangePasswordPage";


type PropsType = {
    isEdit: boolean,
    setIsEdit: VoidFunctionType
}

const EditProfileForm:React.FC<PropsType> = ({isEdit, setIsEdit}) => {
    const {register, handleSubmit, errors, getValues, setValue} = useForm<IAuthUserInfo>()
    const dispatch = useDispatch()
    let userId = useSelector((state: AppStateType) => state.profile?.authUserInfo?.id)
    let profile = useSelector((state: AppStateType) => state.profile.authUserInfo)

    const [isChangeMode, setChangeMode] = useState(false)
    const [fileOne, setFile] = useState(null)
    console.log(fileOne)

    useEffect(() => {
        if(profile) {
            Object.keys(profile).forEach((key: string) => {
                setValue(key, profile && profile[key])
            })

        }
    }, [setValue, profile])




    const onSubmit = (values:IAuthUserInfo) => {
        const wholeData = getFilesFormData(values, fileOne)

        dispatch(profileActions.setIsFetching(true))
        profileSettingsAPI.editProfile(userId as number, wholeData)
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
                                  style={{backgroundColor: 'black', width: '176px', marginTop: '0',
                                      height: '40px', marginRight: '25px'}}
                    >
                        SAVE CHANGES
                    </SubmitButton>
                    <CancelEditButton setIsEdit={setIsEdit} text='CANCEL' />
                </ButtonsWrap>}
            </HeaderWrap>
            {!isChangeMode
                ? <FormWrap>
                <RolesWrap>
                    <Label>Roles</Label>
                    {profile?.roles?.map(r => <Roles key={r}><Role role={r}>{r}</Role></Roles>)}
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
                        <DropZone setFile={setFile} name='photo' setImg={setImg} />
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
                <ChangePasswordButton type='button' onClick={() => setChangeMode(true)}>CHANGE PASSWORD</ChangePasswordButton>

            </FormWrap>
                : <ChangePasswordPage setChangeMode={setChangeMode}/> }
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

export const ChangePasswordButton = styled.button`
  background: none;
  outline: none;
  border: 1px solid #3B3B41;
  height: 40px;
  width: 210px;
  font-family: "Helvetica Reg", sans-serif;
  color: #3B3B41;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  
  &:hover {
    cursor: pointer;
  }
`
