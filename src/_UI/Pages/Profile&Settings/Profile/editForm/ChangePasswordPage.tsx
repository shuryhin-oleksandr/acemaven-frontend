import React, {useEffect, useState} from "react";
//react-hook-form
import {useForm} from "react-hook-form";
import {ChangePasswordButton} from "./EditProfileForm";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../_BLL/store";
import {changeMyPassword} from "../../../../../_BLL/thunks/profile/profileThunks";
import {profileActions} from "../../../../../_BLL/reducers/profileReducer";
//components
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {ErrorServerMessage} from "src/_UI/Pages/SignInPage";
import PasswordFormField from "../../../../components/_commonComponents/Input/PasswordFormField";
//styles
import {
    ActionsButtons,
    ChangeFormWrap,
    CloseButton,
    SuccessMessage,
} from "./edit-form-styles";
//icons
import closeIcon from "../../../../../_UI/assets/icons/close-icon.svg";
import {useTranslation} from "react-i18next";


type PropsType = {
    setChangeMode: (value: boolean) => void
};

const ChangePasswordPage: React.FC<PropsType> = ({setChangeMode}) => {
    const {register, handleSubmit, errors, getValues, reset} = useForm({reValidateMode: "onSubmit"});
    const error = useSelector(
        (state: AppStateType) => state.profile.passwordError
    );
    const success = useSelector(
        (state: AppStateType) => state.profile.changesPass
    );

    const [errorMatch, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = (values: any) => {
        dispatch(changeMyPassword(values));
    };

    let matchPasswords = (value: string) => {

        let pass = getValues("new_password1");
        console.log(pass,value);
        if (value !== pass) {
            setError("Passwords don't match!");
        } else {
            setError("");
        }
    };
    let closeHandler = () => {
        setChangeMode(false)
        dispatch(profileActions.setChanges(''))
        dispatch(profileActions.changePassError(null))
    }

    useEffect(() => {
        if (success) {
            reset()
        }
    }, [success])
  const {t} = useTranslation();

    return (
        <ChangeFormWrap onSubmit={handleSubmit(onSubmit)}>
            <CloseButton onClick={() => closeHandler()}>
                <img src={closeIcon} alt=""/>
            </CloseButton>
            <FormField
                label={t("My Profile/Old Password")}
                inputRef={register({
                    required: "Old Password is required",
                })}
                placeholder={t("My Profile/Password")}
                name="old_password"
                error={errors?.old_password?.message}
                type="password"
            />
            {error?.old_password && (
                <ErrorServerMessage style={{padding: "0", marginBottom: "5px"}}>
                    {error?.old_password[0]}
                </ErrorServerMessage>
            )}
            <PasswordFormField
                name="new_password1"
                label={t("My Profile/New Password")}
                getValues={getValues}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                errors={errors}
                placeholder={t("My Profile/Password")}
                register={register}
            />
            <FormField
                label={t("My Profile/Confirm Password")}
                inputRef={register({
                    required: "Confirm Password is required",
                    //pattern: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,25}$/
                })}
                placeholder={t("My Profile/Confirm Password")}
                name="new_password2"
                error={errors?.new_password2?.message}
                type="password"
                onBlur={matchPasswords}
                pattern_message='Password must contain only alphanumeric characters. Min 8, Max 25 symbols'
            />
            {error?.new_password2 && (
                <ErrorServerMessage style={{padding: "0", marginBottom: "5px"}}>
                    {error?.new_password2[0]}
                </ErrorServerMessage>
            )}
            {errorMatch && (
                <ErrorServerMessage style={{padding: "0", marginBottom: "5px"}}>
                    {errorMatch}
                </ErrorServerMessage>
            )}
            {success && <SuccessMessage>Password was changed!</SuccessMessage>}
            <ActionsButtons>
                <ChangePasswordButton type="submit">
                  {t("My Profile/CHANGE PASSWORD")}
                </ChangePasswordButton>
            </ActionsButtons>
        </ChangeFormWrap>
    );
};

export default ChangePasswordPage;
