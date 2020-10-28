import React, { useState } from "react";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import { useForm } from "react-hook-form";
import { ChangePasswordButton } from "./EditProfileForm";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import { useDispatch, useSelector } from "react-redux";
import {changeMyPassword, profileActions} from "../../../../../_BLL/reducers/profileReducer";
import { AppStateType } from "../../../../../_BLL/store";
import { ErrorServerMessage } from "src/_UI/Pages/SignInPage";
import PasswordFormField from "../../../../components/_commonComponents/Input/PasswordFormField";
import closeIcon from "../../../../../_UI/assets/icons/close-icon.svg";
import {
  ActionsButtons,
  ChangeFormWrap,
  CloseButton,
  SuccessMessage,
} from "./edit-form-styles";

type PropsType = {
  setChangeMode: VoidFunctionType;
};

const ChangePasswordPage: React.FC<PropsType> = ({ setChangeMode }) => {
  const { register, handleSubmit, errors, getValues } = useForm({reValidateMode: "onSubmit"});
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
      debugger
    dispatch(changeMyPassword(values));
  };

  let matchPasswords = (value: string) => {
    let pass = getValues("new_password1");
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

  return (
    <ChangeFormWrap onSubmit={handleSubmit(onSubmit)}>
      <CloseButton onClick={() => closeHandler()}>
        <img src={closeIcon} alt="" />
      </CloseButton>
      <FormField
        label="Old Password"
        inputRef={register({
          required: "Old Password is required",
        })}
        placeholder="Password"
        name="old_password"
        error={errors?.old_password?.message}
        getValues={getValues}
        type="password"
      />
      {error?.old_password && (
        <ErrorServerMessage style={{ padding: "0", marginBottom: "5px" }}>
          {error?.old_password[0]}
        </ErrorServerMessage>
      )}
      <PasswordFormField
        name="new_password1"
        label="New Password"
        getValues={getValues}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        errors={errors}
        placeholder="New Password"
        register={register}
      />
      <FormField
        label="Confirm Password"
        inputRef={register({
          required: "Confirm Password is required",
            //pattern: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,25}$/
        })}
        placeholder="Confirm password"
        name="new_password2"
        error={errors?.new_password2?.message}
        getValues={getValues}
        type="password"
        onBlur={matchPasswords}
        pattern_message='Password must contain only alphanumeric characters. Min 8, Max 25 symbols'
      />
      {error?.new_password2 && (
        <ErrorServerMessage style={{ padding: "0", marginBottom: "5px" }}>
          {error?.new_password2[0]}
        </ErrorServerMessage>
      )}
      {errorMatch && (
        <ErrorServerMessage style={{ padding: "0", marginBottom: "5px" }}>
          {errorMatch}
        </ErrorServerMessage>
      )}
      {success && <SuccessMessage>Password was changed!</SuccessMessage>}
      <ActionsButtons>
        <ChangePasswordButton type="submit">
          CHANGE PASSWORD
        </ChangePasswordButton>
      </ActionsButtons>
    </ChangeFormWrap>
  );
};

export default ChangePasswordPage;
