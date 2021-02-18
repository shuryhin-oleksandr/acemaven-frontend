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

type PropsType = {
  setNewTopic: (value: boolean) => void;
};

const TopicForm: React.FC<PropsType> = ({ setNewTopic }) => {
  const { control, register, errors, handleSubmit } = useForm();
  const onSubmit = (values: any) => {
    console.log(values);
  };

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
                name={"category"}
                control={control}
                rules={{ required: "Field is required" }}
                as={
                  <SurchargeRateSelect
                    label={"Category"}
                    placeholder={"General"}
                    max_width={"170px"}
                    error={errors?.category?.message}
                    options={[
                      { title: "first", id: 1 },
                      { title: "second", id: 2 },
                    ]}
                  />
                }
              />
              <Controller
                name={"operation_number"}
                control={control}
                rules={{ required: "Field is required" }}
                as={
                  <SurchargeRateSelect
                    label={"Operation No."}
                    placeholder={"Ofh4848"}
                    max_width={"195px"}
                    options={[
                      { title: "first", id: 1 },
                      { title: "second", id: 2 },
                    ]}
                    error={errors?.operation_number?.message}
                  />
                }
              />
              <FormField
                label={"Topic"}
                name={"topic"}
                error={errors?.topic}
                inputRef={register({ required: "Field is required" })}
                max_width={"606px"}
                placeholder={"Placeholder"}
              />
            </FormFieldsWrap>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Field is required" }}
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
