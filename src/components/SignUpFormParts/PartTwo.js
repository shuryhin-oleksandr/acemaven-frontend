//Core
import React from "react";
import styled from "styled-components";

//Instruments
import { useFormikContext } from "formik";

//Components
import BaseBackButton from "../base/BaseBackButton";
import BaseNextButton from "../base/BaseNextButton";
import BaseInputGroup from "../base/BaseInputGroup";

const PartTwo = ({ changePage }) => {
  const { values } = useFormikContext();
  return (
    <>
      <BaseInputGroup
        name="address1"
        placeholder="Address Line 1"
        values={values}
        labelText="Address"
        marginBot={15}
      />
      <BaseInputGroup
        name="address2"
        placeholder="Address Line 2 (optional)"
        values={values}
        marginBot={46}
      />
      <BaseInputGroup
        name="state"
        placeholder="State"
        values={values}
        labelText="State"
        marginBot={46}
      />
      <BaseInputGroup
        name="city"
        placeholder="City"
        values={values}
        labelText="City"
        marginBot={46}
      />
      <BaseInputGroup
        name="zipCode"
        placeholder="Zip Code"
        values={values}
        labelText="Zip Code"
        marginBot={46}
      />
      <BaseInputGroup
        name="taxId"
        placeholder="Tax id Number"
        values={values}
        labelText="Tax id Number"
        marginBot={46}
      />
      <Row>
        <BaseBackButton
          onClick={() => {
            changePage(true);
          }}
        />
        <BaseNextButton type="submit">Create new account</BaseNextButton>
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
