import React, { useEffect, useState } from "react";
import {
  FillOuter,
  FormContainer,
  FullfilledWrap,
  Label,
  LineWrap,
  TextWrap,
} from "./additional-user-styles";
import FormField from "../../../components/_commonComponents/Input/FormField";
import { useForm } from "react-hook-form";
import { IAdditionalUserCompleteData } from "../../../../_BLL/types/addNewUserTypes";
import DropZone from "src/_UI/components/DropZone";
import Close from "../../../assets/icons/close-icon.svg";
import styled from "styled-components";
import { InputWrap, SubmitButton } from "../CreateNewUser/AddUserForm";
import {completeAdditionalUser} from "../../../../_BLL/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";
import PasswordFormField from "../../../components/_commonComponents/Input/PasswordFormField";
import { useHistory} from "react-router-dom";
import {ErrorServerMessage} from "../../SignInPage";
import {getFilesFormData} from "../../../../_BLL/helpers/MultipartFormDataHelper";


type PropsType = {
  token: string;
};

const UserCompleteForm: React.FC<PropsType> = ({ token }) => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm<IAdditionalUserCompleteData>();
  const dispatch = useDispatch();
  const history = useHistory();
  const checkedUser = useSelector(
    (state: AppStateType) => state.auth.checkedUser
  );
  const [showPassword, setShowPassword] = useState(false);
  const passwordError = useSelector((state: AppStateType) => state.auth.passwordError)


  const onSubmit = (values: IAdditionalUserCompleteData) => {
    let email = checkedUser?.email;
    let roles = checkedUser?.roles;
    let finalObj = { ...values, email: email, roles: roles };

    const wholeData = getFilesFormData(finalObj, file);
    dispatch(completeAdditionalUser(token, wholeData, history))
  };
  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);


  useEffect(() => {
   if(errors) {
     console.log('errors', errors)
   }
  }, [errors])

  useEffect(() => {
    if (checkedUser) {
      setValue("first_name", checkedUser?.first_name); //должно меняться в зав от стора
      setValue("last_name", checkedUser?.last_name); //должно меняться в зав от стора
    }
  }, [checkedUser, setValue]);

  const [errorMatch, setError] = useState('')
    let matchPasswords = (value: string) => {
        let pass = getValues('password')
        console.log(value)
        if(value !== pass) {
            setError("Passwords don't match!")
        } else {
            setError('')
        }
    }


    return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FullfilledWrap>
        <FillOuter>
          <Label>Email</Label>
          <TextWrap>{checkedUser?.email}</TextWrap>
        </FillOuter>
        <FillOuter>
          <Label>Roles</Label>
          <TextWrap style={{ textTransform: "capitalize" }}>
            {checkedUser?.roles}
          </TextWrap>
        </FillOuter>
      </FullfilledWrap>
      <LineWrap />
      <FullfilledWrap style={{ marginBottom: "0" }}>
        <InputWrap w="47%">
          <FormField
            label="Name"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Name"
            name="first_name"
            error={errors?.first_name}
            getValues={getValues}
          />
        </InputWrap>
        <InputWrap w="47%">
          <FormField
            label="Last Name"
            inputRef={register({
              required: "Field is required",
            })}
            placeholder="Last Name"
            name="last_name"
            error={errors?.last_name}
            getValues={getValues}
          />
        </InputWrap>
      </FullfilledWrap>
      <FormField
        label="Phone Number"
        inputRef={register({
          required: "Field is required",
          maxLength: 13,
          minLength: 10,
          pattern: /^(\+)?([0-9]){10,13}$/
        })}
        placeholder="Phone Number"
        name="phone"
        error={errors?.phone}
        getValues={getValues}
        max='13'
        min='10'
        pattern_message='Phone number has to include only + and numbers'
      />
      <FormField
        label="Position in the Company"
        inputRef={register({
          required: "Field is required",
        })}
        placeholder="Position in the Company"
        name="position"
        error={errors?.position}
        getValues={getValues}
      />
      <PasswordFormField
        name="password"
        label="Password"
        getValues={getValues}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        errors={errors}
        placeholder="Password"
        register={register}
      />
      {passwordError && <ErrorServerMessage>{passwordError}</ErrorServerMessage>}
      <FormField
        inputRef={register({
          required: "Field is required",
        })}
        placeholder="Confirm password"
        name="confirm_password"
        error={errors?.confirm_password}
        getValues={getValues}
        type="password"
        onBlur={matchPasswords}
      />
        {errorMatch && <ErrorServerMessage>{errorMatch}</ErrorServerMessage>}
      {img ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            marginTop: "20px",
            marginBottom: "50px",
          }}
        >
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
        <div style={{ marginTop: "45px", marginBottom: "50px", width: "100%" }}>
          <DropZone setFile={setFile} name="photo" setImg={setImg} />
        </div>
      )}
      <SubmitButton type="submit">Complete Profile</SubmitButton>
    </FormContainer>
  );
};

export default UserCompleteForm;

const Photo = styled.img`
  width: 185px;
  height: 185px;
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;
