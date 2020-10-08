import React, { useState } from "react";
import { Container, Heading } from "./searchWidgett-styles";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/OptionsDeliveryButtons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import BaseFormikInput from "../../../../components/base/BaseFormikInput";
import BaseButton from "../../../../components/base/BaseButton";
import styled from "styled-components";
import AddIcon from "../../../../assets/icons/widgets/add-icon.svg";
import BaseTooltip from "../../../../components/_commonComponents/baseTooltip/BaseTooltip";

const SearchWidget: React.FC = () => {
  const [mode, setMode] = useState("ship");
  return (
    <Container>
      <Heading>Search Rates</Heading>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 13,
                marginBottom: 16,
              }}
            >
              <OptionsDeliveryButtons
                mode={mode}
                setMode={setMode}
                withoutBottomMargin
              />

              <BaseFormikInput
                name="email"
                component="select"
                searchWidget={true}
                width="19%"
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </BaseFormikInput>

              <BaseFormikInput
                width="19%"
                searchWidget={true}
                name="password"
              />
              <BaseFormikInput
                width="19%"
                searchWidget={true}
                name="password"
              />
              <BaseFormikInput
                width="19%"
                searchWidget={true}
                name="password"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: 13,
              }}
            >
              <FieldWrapper>
                <BaseFormikInput
                  name="email"
                  component="select"
                  searchWidget={true}
                >
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </BaseFormikInput>
              </FieldWrapper>
              <FieldWrapper>
                <BaseFormikInput searchWidget={true} name="password" />
              </FieldWrapper>
              <FieldWrapper>
                <BaseFormikInput
                  name="email"
                  component="select"
                  searchWidget={true}
                >
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </BaseFormikInput>
              </FieldWrapper>
            </div>
            <ButtonGroup>
              <BaseTooltip title={"Add more cargo groups by clicking on plus"}>
                <AddImg src={AddIcon} alt="add" />
              </BaseTooltip>
              <BaseButton>Search</BaseButton>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SearchWidget;

type PropsStyle = {
  noMargin?: boolean;
};

const FieldWrapper = styled.div<PropsStyle>`
  margin-right: ${({ noMargin }) => (noMargin ? "0" : "13px")};
  width: 18%;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 25px;
  right: 30px;
`;

const AddImg = styled.img`
  margin-right: 10px;
`;
