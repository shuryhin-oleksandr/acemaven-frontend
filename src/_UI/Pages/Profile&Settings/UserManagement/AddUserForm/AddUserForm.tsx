import React, {useState} from "react";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {FormContainer, FormWrap} from "./add-user-form-styles";
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import {EditUserInfo} from "../../../../../_BLL/types/profile&settingsTypes";
import CustomCheckbox from "../../../../components/_commonComponents/customCheckbox/customCheckbox";
import {CheckboxWrap} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import styled from "styled-components";
import Close from "../../../../assets/icons/close-icon.svg";
import DropZone from "src/_UI/components/DropZone";

type PropsType = {
    setIsAdd?: VoidFunctionType
}

const AddUserForm:React.FC<PropsType> = ({setIsAdd}) => {
    const {register, errors, handleSubmit, getValues} = useForm<EditUserInfo>()
    const onSubmit = (values:EditUserInfo) => {
        console.log(values)
    }

    const [roleValue, setRole] = useState('')
    const [img, setImg] = useState("");

    return (
        <FormContainer>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <FinishFormButtons closeCallback={setIsAdd}/>
                <FormField name='name'
                           placeholder='Name'
                           label='Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.name?.message}
                           getValues={getValues}
                />
                <FormField name='lastName'
                           placeholder='Last Name'
                           label='Last Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.lastName?.message}
                           getValues={getValues}
                />
                <CheckboxWrap>
                   <Label>Roles</Label>
                    <CustomCheckbox
                        value='master'
                        name='roles'
                        inputRef={register({
                            required: 'Field is required'
                        })}
                        role='Master'
                        getValues={getValues}
                        disabled={roleValue === 'agent' || roleValue === 'billing'}
                        setRole={setRole}
                        roleValue={roleValue}
                        error={errors?.roles}
                    />
                    <CustomCheckbox value='agent'
                                    name='roles'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Agent'
                                    getValues={getValues}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                                    error={errors?.roles}
                    />
                    <CustomCheckbox value='billing'
                                    name='roles'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Billing'
                                    getValues={getValues}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                                    error={errors?.roles}
                    />
                </CheckboxWrap>
                <FormField name='email'
                           placeholder='Email'
                           label='Email'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.email?.message}
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
                    <div style={{ marginTop: '30px', marginBottom: '30px', width: '100%'}}>
                        <DropZone name='photo' setImg={setImg} />
                    </div>
                )}
            </FormWrap>
        </FormContainer>
    )
}

export default AddUserForm

const Label = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`
const Photo = styled.img`
  width: 185px;
  height: 185px;
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;
