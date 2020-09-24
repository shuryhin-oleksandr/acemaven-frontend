import React, {useState} from "react";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {FormContainer, FormWrap} from "./add-user-form-styles";
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import CustomCheckbox from "../../../../components/_commonComponents/customCheckbox/customCheckbox";
import {CheckboxWrap} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import styled from "styled-components";
import Close from "../../../../assets/icons/close-icon.svg";
import DropZone from "src/_UI/components/DropZone";
import {addNewWorker} from "../../../../../_BLL/reducers/profileReducer";
import {IAddNewUserData} from "../../../../../_BLL/types/addNewUserTypes";

type PropsType = {
    setIsAdd?: VoidFunctionType,
    dispatch?: VoidFunctionType
}

const AddUserForm:React.FC<PropsType> = ({setIsAdd, dispatch}) => {
    const {register, errors, handleSubmit, getValues} = useForm<IAddNewUserData>()
    const onSubmit = (values:IAddNewUserData) => {
        console.log(values)
        dispatch && dispatch(addNewWorker(values))
        setIsAdd && setIsAdd(false)
    }

    const [roleValue, setRole] = useState('')
    const [img, setImg] = useState("");
    const [file, setFile] = useState(null)
    console.log(file)

    return (
        <FormContainer>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <FinishFormButtons closeCallback={setIsAdd}/>
                <FormField name='first_name'
                           placeholder='Name'
                           label='Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.first_name?.message}
                           getValues={getValues}
                />
                <FormField name='last_name'
                           placeholder='Last Name'
                           label='Last Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.last_name?.message}
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
                        <DropZone setFile={setFile} name='photo' setImg={setImg} />
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
