import React, {useEffect, useState} from 'react'
import {FillOuter, FormContainer, FullfilledWrap, Label, LineWrap, TextWrap } from './additional-user-styles'
import FormField from "../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import {IAdditionalUserCompleteData, IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";
import DropZone from 'src/_UI/components/DropZone';
import Close from "../../../assets/icons/close-icon.svg";
import styled from "styled-components";
import {InputWrap, SubmitButton} from "../CreateNewUser/AddUserForm";


const UserCompleteForm:React.FC = () => {
    const {register, handleSubmit, errors, getValues, setValue} = useForm<IAdditionalUserCompleteData>()
    const onSubmit = (values: IAddNewUserData) => {
        let email = 'blabla@blatrteerterertertt'
        let roles = ['agent']
        let finalObj = {...values, email: email, roles: roles}
        console.log(finalObj)
    }
    const [img, setImg] = useState("");

    useEffect(() => {
        setValue('name','hanna') //должно меняться в зав от стора
        setValue('lastName', 'yarash') //должно меняться в зав от стора
    }, [])


    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FullfilledWrap>
                <FillOuter>
                    <Label>Email</Label>
                    <TextWrap>blabla@blatrteerterertertt</TextWrap>
                </FillOuter>
                <FillOuter>
                    <Label>Roles</Label>
                    <TextWrap>fdf, 454</TextWrap>
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
