import React, {useEffect, useState} from "react";
import {
    FillOuter,
    FormContainer,
    FullfilledWrap,
    Label,
    LineWrap,
    TextWrap,
} from "./additional-user-styles";
import FormField from "../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import {IAdditionalUserCompleteData} from "../../../../_BLL/types/addNewUserTypes";
import DropZone from "src/_UI/components/DropZone";
import Close from "../../../assets/icons/close-icon.svg";
import styled from "styled-components";
import {InputWrap, SubmitButton} from "../CreateNewUser/AddUserForm";
import {completeAdditionalUser} from "../../../../_BLL/thunks/auth/authThunks";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import PasswordFormField from "../../../components/_commonComponents/Input/PasswordFormField";
import {useHistory} from "react-router-dom";
import {ErrorServerMessage} from "../../SignInPage";
import {getFilesFormData} from "../../../../_BLL/helpers/MultipartFormDataHelper";
import {HelperText} from "../../../components/_commonComponents/Input/input-styles";
import {useTranslation} from "react-i18next";


type PropsType = {
    token: string;
    email_error?: string
};

const UserCompleteForm: React.FC<PropsType> = ({token, email_error}) => {
    const {register, handleSubmit, errors, getValues, setValue} = useForm<IAdditionalUserCompleteData>();
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
        let finalObj = {...values, email: email, roles: roles};

        const wholeData = getFilesFormData(finalObj, file);
        dispatch(completeAdditionalUser(token, wholeData, history))
    };
    const [img, setImg] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (checkedUser) {
            setValue("first_name", checkedUser?.first_name); //должно меняться в зав от стора
            setValue("last_name", checkedUser?.last_name); //должно меняться в зав от стора
        }
    }, [checkedUser, setValue]);

    const [errorMatch, setError] = useState('')
    let matchPasswords = (value: string) => {
        let pass = getValues('password')

        if (value !== pass) {
            setError("Passwords don't match!")
        } else {
            setError('')
        }
    }

  const {t} = useTranslation();
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FullfilledWrap>
                <FillOuter>
                    <Label>{t("Register/Email")}</Label>
                    <TextWrap>{checkedUser?.email}</TextWrap>
                    {email_error && <HelperText>Email already exists.</HelperText>}
                </FillOuter>
                <FillOuter>
                    <Label>{t("Register/Roles")}</Label>
                    <TextWrap style={{textTransform: "capitalize"}}>
                        {checkedUser?.roles.map((r: any, index: number) => <span key={index}>{r}{' '}</span>)}
                    </TextWrap>
                </FillOuter>
            </FullfilledWrap>
            <LineWrap/>
            <FullfilledWrap style={{marginBottom: "0"}}>
                <InputWrap w="47%">
                    <FormField
                        label={t("Register/Name")}
                        inputRef={register({
                            required: "Field is required",
                        })}
                        placeholder={t("Register/Name")}
                        name="first_name"
                        error={errors?.first_name}
                    />
                </InputWrap>
                <InputWrap w="47%">
                    <FormField
                        label={t("Register/Last Name")}
                        inputRef={register({
                            required: "Field is required",
                        })}
                        placeholder={t("Register/Last Name")}
                        name="last_name"
                        error={errors?.last_name}

                    />
                </InputWrap>
            </FullfilledWrap>
            <FormField
                label={t("Register/Phone Number")}
                inputRef={register({
                    required: "Field is required",
                    maxLength: 13,
                    minLength: 10,
                    pattern: /^(\+)?([0-9]){10,13}$/
                })}
                placeholder={t("Register/Phone Number")}
                name="phone"
                error={errors?.phone}
                max='13'
                min='10'
                pattern_message='Phone number has to include only + and numbers'
            />
            <FormField
                label={t("Register/Position in the Company")}
                inputRef={register({
                    required: "Field is required",
                })}
                placeholder={t("Register/Position in the Company")}
                name="position"
                error={errors?.position}
            />
            <PasswordFormField
                name="password"
                label={t("Complete Profile/Password")}
                getValues={getValues}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                errors={errors}
                placeholder={t("Complete Profile/Password")}
                register={register}
            />
            {passwordError && <ErrorServerMessage>{passwordError}</ErrorServerMessage>}
            <FormField
                inputRef={register({
                    required: "Field is required",
                })}
                placeholder={t("My Profile/Confirm Password")}
                name="confirm_password"
                error={errors?.confirm_password}
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
                <div style={{marginTop: "45px", marginBottom: "50px", width: "100%"}}>
                    <DropZone setFile={setFile} name="photo" setImg={setImg}/>
                </div>
            )}
            <SubmitButton type="submit">{t("Complete Profile/Complete Profile")}</SubmitButton>
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
