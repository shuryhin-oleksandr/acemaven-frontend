import React, {useEffect, useState} from 'react'
import {FillOuter, FormContainer, FullfilledWrap, Label, LineWrap, TextWrap } from './additional-user-styles'
import FormField from "../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import {IAdditionalUserCompleteData} from "../../../../_BLL/types/addNewUserTypes";
import DropZone from 'src/_UI/components/DropZone';
import Close from "../../../assets/icons/close-icon.svg";
import styled from "styled-components";
import {InputWrap, SubmitButton} from "../CreateNewUser/AddUserForm";
import {authActions} from "../../../../_BLL/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import {getFilesFormData} from "../../../../_BLL/helpers/MultipartFormDataHelper";
import {authAPI} from "../../../../_DAL/API/authAPI";


type PropsType = {
    token: string
}

const UserCompleteForm:React.FC<PropsType> = ({token}) => {
    const {register, handleSubmit, errors, getValues, setValue} = useForm<IAdditionalUserCompleteData>()
    const dispatch = useDispatch()
    const checkedUser = useSelector((state: AppStateType) => state.auth.checkedUser)



    const onSubmit = (values: IAdditionalUserCompleteData) => {
        let email = checkedUser?.email
        let roles = checkedUser?.roles
        let finalObj = {...values, email: email, roles: roles}

        const wholeData = getFilesFormData(finalObj, file)

        dispatch(authActions.setIsLoading(true))
        authAPI.signUp(token, wholeData)
            .then((res) => {
                console.log(res.data)
                res.data && localStorage.setItem('access_token', res.data.token)
                dispatch(authActions.setIsLoading(false))
            })
            .catch((e) => {
                console.log('error', e.response)
                dispatch(authActions.setCheckTokenError(e.response))
                dispatch(authActions.setIsLoading(false))
            })

        console.log(finalObj)
    }
    const [img, setImg] = useState("");
    const [file, setFile] = useState(null)
    console.log(file)




    useEffect(() => {
        if(checkedUser) {
            setValue('first_name', checkedUser?.first_name) //должно меняться в зав от стора
            setValue('last_name',  checkedUser?.last_name) //должно меняться в зав от стора
        }
    }, [checkedUser])


    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <FullfilledWrap>
                        <FillOuter>
                            <Label>Email</Label>
                            <TextWrap>{checkedUser?.email}</TextWrap>
                        </FillOuter>
                        <FillOuter>
                            <Label>Roles</Label>
                            <TextWrap style={{textTransform: 'capitalize'}}>{checkedUser?.roles}</TextWrap>
                        </FillOuter>
                    </FullfilledWrap>
                    <LineWrap/>
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
                    <FormField
                        inputRef={register({
                            required: 'Field is required'
                        })}
                        placeholder='Confirm password'
                        name='confirm_password'
                        error={errors?.confirm_password?.message}
                        getValues={getValues}
                    />
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
                    <SubmitButton type='submit'>Complete Profile</SubmitButton>
                </FormContainer>

    )
}

export default UserCompleteForm


const Photo = styled.img`
  width: 185px;
  height: 185px;
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;
