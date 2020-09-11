//Core
import React from "react";
import styled from "styled-components";

//Instruments
import { ErrorMessage, useFormikContext } from "formik";

//Components
import BaseBackButton from "../base/BaseBackButton";
import BaseNextButton from "../base/BaseNextButton";
import BaseInputGroup from "../base/BaseInputGroup";
import fonts from "../../theming/fonts";

const PartTwo = ({ changePage }) => {
  const { values, touched, errors } = useFormikContext();

  const isButtonDisabled =
    !values.address_line_first ||
    !values.state ||
    !values.city ||
    !values.zip_code ||
    !values.tax_id;
  return (
    <>
      <BaseInputGroup
        name="address_line_first"
        placeholder="Address Line 1"
        values={values}
        labelText="Address"
        marginBot={15}
        withoutErrorMessage
        valid={touched.address_line_first && !errors.address_line_first}
        error={touched.address_line_first && errors.address_line_first}
      />
      <div style={{ marginBottom: "46px", position: "relative" }}>
        <BaseInputGroup
          name="address_line_second"
          placeholder="Address Line 2 (optional)"
          values={values}
        />
        <ErrorMessage name="address_line_first" component={Error} />
      </div>
      <BaseInputGroup
        name="state"
        placeholder="State"
        values={values}
        labelText="State"
        marginBot={46}
        valid={touched.state && !errors.state}
        error={touched.state && errors.state}
      />
      <BaseInputGroup
        name="city"
        placeholder="City"
        values={values}
        labelText="City"
        marginBot={46}
        valid={touched.city && !errors.city}
        error={touched.city && errors.city}
      />
      <BaseInputGroup
        name="zip_code"
        placeholder="Zip Code"
        values={values}
        labelText="Zip Code"
        marginBot={46}
        type="number"
        valid={touched.zip_code && !errors.zip_code}
        error={touched.zip_code && errors.zip_code}
      />
      <BaseInputGroup
        name="tax_id"
        placeholder="Tax id Number"
        values={values}
        labelText="Tax id Number"
        marginBot={46}
        valid={touched.tax_id && !errors.tax_id}
        error={touched.tax_id && errors.tax_id}
      />
      <Row>
        <BaseBackButton
          onClick={() => {
            changePage(true);
          }}
        />
        <BaseNextButton disabled={isButtonDisabled} type="submit">
          Create new account
        </BaseNextButton>
      </Row>
    </>
  );
};

export default PartTwo;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`;

const Error = styled.div`
  position: absolute;
  right: 0;
  margin-top: 5px;
  ${fonts.raleway(12, 14)};
  color: #e76767;
`;
