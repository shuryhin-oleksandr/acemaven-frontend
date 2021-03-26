import React from "react";
//react-hook-form
import { Controller, useForm } from "react-hook-form";
//components
import BaseButton from "src/_UI/components/base/BaseButton";
import OutlineButton from "../../../components/_commonComponents/buttons/outline_button/OutlineButton";
import SurchargeRateSelect from "../../../components/_commonComponents/select/SurchargeRateSelect";
import FormField from "../../../components/_commonComponents/Input/FormField";
//styles
import {
  SupportInner,
  SupportOuter,
  SupportTitle,
} from "../help-support-styles";
import {
  FormFieldsWrap,
  TopicContent,
  TopicFormActionsWrap,
  TopicFormHeader,
} from "./topic-form-styles";
import {
  FormTextarea,
  TextareaLabel,
} from "../../../components/PopUps/accept_booking_popup/accept-popup-styles";
import { HelperText } from "../../../components/_commonComponents/Input/input-styles";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";
import { postNewTicketThunk } from "../../../../_BLL/thunks/support_thunk/supportThunk";
import { useHistory } from "react-router-dom";
import { TicketType } from "../../../../_BLL/types/support_types/support_types";

type PropsType = {
  setNewTopic: (value: boolean) => void;
};

const TopicForm: React.FC<PropsType> = ({ setNewTopic }) => {
  let dispatch = useDispatch();
  const history = useHistory();
  let category_choices = useSelector(
    (state: AppStateType) => state.support_reducer.category_choices
  );

  const { control, register, errors, handleSubmit, watch } = useForm();

  let category_watch = watch("category");
  const onSubmit = (values: TicketType) => {
    dispatch(postNewTicketThunk(values, history));
  };

  const trapSpacesForRequiredFields = (value: any) => !!value.trim();

  return (
    <SupportOuter>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SupportInner>
          <TopicFormHeader>
            <SupportTitle>New ticket</SupportTitle>
            <TopicFormActionsWrap>
              <BaseButton style={{ marginRight: "10px" }} type="submit">
                POST
              </BaseButton>
              <OutlineButton
                text={"CANCEL"}
                borderColor={"1px solid #3b3b41"}
                text_color={"#3b3b41"}
                font_size={"14px"}
                callback={() => setNewTopic(false)}
                type="button"
              />
            </TopicFormActionsWrap>
          </TopicFormHeader>
          <TopicContent>
            <FormFieldsWrap>
              <Controller
                defaultValue=""
                name={"category"}
                control={control}
                rules={{ required: "Field is required" }}
                as={
                  <SurchargeRateSelect
                    label={"Category"}
                    max_width={"170px"}
                    error={errors?.category?.message}
                    options={category_choices}
                  />
                }
              />
              {category_watch === "operations" && (
                <FormField
                  label={"Operation No."}
                  name={"aceid"}
                  error={errors?.aceid}
                  inputRef={register({
                    required: "Field is required",
                    minLength:3,
                    validate: { trapSpacesForRequiredFields },
                  })}
                  max_width={"170px"}
                  min={"3"}
                />
              )}
              <FormField
                label={"Topic"}
                name={"topic"}
                error={errors?.topic}
                inputRef={register({
                  required: "Field is required",
                  minLength:3,
                  validate: { trapSpacesForRequiredFields },
                })}
                max_width={"606px"}
                min={"3"}
              />
            </FormFieldsWrap>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: "Field is required",
                validate: { trapSpacesForRequiredFields },
              }}
              as={
                <div style={{ width: "100%", marginBottom: "50px" }}>
                  <TextareaLabel>Describe your problem</TextareaLabel>
                  <FormTextarea
                    error={!!errors?.description}
                    placeholder="Describe your problem..."
                  />
                  {errors?.description && (
                    <HelperText messagePaddingTop="4px">
                      Field is required
                    </HelperText>
                  )}
                </div>
              }
            />
          </TopicContent>
        </SupportInner>
      </form>
    </SupportOuter>
  );
};

export default TopicForm;
