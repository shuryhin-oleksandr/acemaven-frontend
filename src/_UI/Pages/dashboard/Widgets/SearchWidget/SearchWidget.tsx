import React, { useState } from "react";
import { Container, Heading } from "./searchWidgett-styles";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/OptionsDeliveryButtons";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
        initialValues={{
          shipping_mode: "",
          origin: "",
          destination: "",
          date: "",
          cargo_groups: [{ container_type: "", volume: "", frozen: "" }],
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values", values);
        }}
      >
        {({ isSubmitting, values }) => {
          return (
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
                  name="shipping_mode"
                  component="select"
                  searchWidget={true}
                  width="19%"
                >
                  <option value="">Shipping mode</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </BaseFormikInput>

                <BaseFormikInput
                  width="19%"
                  searchWidget={true}
                  name="origin"
                  placeholder="Origin"
                />
                <BaseFormikInput
                  width="19%"
                  searchWidget={true}
                  name="destination"
                  placeholder="Destination"
                />
                <BaseFormikInput
                  width="19%"
                  searchWidget={true}
                  name="date"
                  placeholder="Shipment date"
                />
              </div>
              {/*FieldArray*/}
              <FieldArray
                name="cargo_groups"
                render={(arrayHelpers) =>
                  values.cargo_groups.map((group, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: 13,
                      }}
                    >
                      <FieldWrapper>
                        <BaseFormikInput
                          name={`cargo_groups.${index}.container_type`}
                          component="select"
                          searchWidget={true}
                        >
                          <option value="">Container Type</option>
                          <option value="green">Green</option>
                          <option value="blue">Blue</option>
                        </BaseFormikInput>
                      </FieldWrapper>
                      <FieldWrapper>
                        <BaseFormikInput
                          name={`cargo_groups.${index}.volume`}
                          searchWidget={true}
                          placeholder="Volume"
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <BaseFormikInput
                          name={`cargo_groups.${index}.frozen`}
                          component="select"
                          searchWidget={true}
                        >
                          <option value="">Frozen</option>
                          <option value="green">Green</option>
                          <option value="blue">Blue</option>
                        </BaseFormikInput>
                      </FieldWrapper>
                      <ButtonGroup>
                        <BaseTooltip
                          title={"Add more cargo groups by clicking on plus"}
                        >
                          <AddImg
                            src={AddIcon}
                            alt="add"
                            onClick={() =>
                              arrayHelpers.push({
                                container_type: "",
                                volume: "",
                                frozen: "",
                              })
                            }
                          />
                        </BaseTooltip>
                        <BaseButton type="submit">Search</BaseButton>
                      </ButtonGroup>
                    </div>
                  ))
                }
              />
            </Form>
          );
        }}
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
