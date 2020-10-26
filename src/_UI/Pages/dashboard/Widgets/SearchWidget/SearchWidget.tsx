import React, { useState } from "react";
import {
  Container,
  Heading,
  RelativeWrapper,
  FieldWrapper,
  ButtonGroup,
  AddImg,
  RemoveImg,
} from "./searchWidgett-styles";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import { Formik, Form, FieldArray } from "formik";
import BaseFormikInput from "../../../../components/base/BaseFormikInput";
import BaseButton from "../../../../components/base/BaseButton";
import AddIcon from "../../../../assets/icons/widgets/add-icon.svg";
import RemoveIcon from "../../../../assets/icons/widgets/remove-icon.svg";
import BaseTooltip from "../../../../components/_commonComponents/baseTooltip/BaseTooltip";

type PropsType = {
    right?: string,
    bottom?: string
}

const SearchWidget: React.FC<PropsType> = ({bottom, right}) => {
  const [mode, setMode] = useState("sea");
  return (
    <RelativeWrapper >
      <Container >
        <Heading>Search Rates</Heading>
        <Formik
          initialValues={{
            shipping_mode: "",
            origin: "",
            destination: "",
            date: "",
            cargo_groups: [{ container_type: "", volume: "", frozen: "" }],
          }}
          onSubmit={(values) => {
            console.log("values", values);
          }}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 13,
                    marginBottom: 6,
                  }}
                >
                  <OptionsDeliveryButtons
                    mode={mode}
                    setMode={setMode}
                    directory=""
                    searchColumn=""
                    searchValue=""

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
                  render={(arrayHelpers) => (
                    <>
                      {values.cargo_groups.map((group, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            marginBottom: 10,
                            paddingTop: 10,
                            borderTop:
                              index > 0 ? "1px solid #E0E0E0" : "none",
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
                          {values.cargo_groups.length > 1 && (
                            <RemoveImg
                              src={RemoveIcon}
                              alt="remove"
                              onClick={() => {
                                arrayHelpers.remove(index);
                              }}
                            />
                          )}
                        </div>
                      ))}
                      <ButtonGroup bottom={bottom} right={right}>
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
                    </>
                  )}
                />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </RelativeWrapper>
  );
};

export default SearchWidget;
