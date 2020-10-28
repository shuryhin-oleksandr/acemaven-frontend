//Core
import React, { useEffect } from "react";
import styled from "styled-components";

//Instruments
import {useFormikContext } from "formik";

//Components
import BaseBackButton from "../base/BaseBackButton";
import BaseNextButton from "../base/BaseNextButton";
import BaseInputGroup from "../base/BaseInputGroup";
import { ErrorServerMessage } from "../../Pages/SignInPage";
import { useDispatch } from "react-redux";
import { authActions } from "../../../_BLL/reducers/authReducer";

const PartTwo = ({ changePage, error }) => {
  const { values, touched, errors } = useFormikContext();
  const dispatch = useDispatch();

  /*useEffect(() => {
    setTimeout(() => {
      dispatch(authActions.setCompanySignupError(null));
    }, 5000);
  }, [dispatch, error]);*/

  const isButtonDisabled =
    !values.first_name ||
    !values.last_name ||
    !values.email ||
    !values.phone ||
    !values.position;
  return (
    <>
      <Heading>Contact person info:</Heading>
      <Row>
        <RowItem>
          <BaseInputGroup
            name="first_name"
            placeholder="Name"
            values={values}
            labelText="Name"
            marginBot={46}
            valid={touched.name && !errors.name}
            error={touched.name && errors.name}
          />
        </RowItem>
        <RowItem>
          <BaseInputGroup
            name="last_name"
            placeholder="Last Name"
            values={values}
            labelText="Last Name"
            marginBot={46}
            valid={touched.lastName && !errors.lastName}
            error={touched.lastName && errors.lastName}
          />
        </RowItem>
      </Row>
      <BaseInputGroup
        name="email"
        placeholder="Email"
        values={values}
        labelText="Email"
        marginBot={46}
        valid={touched.email && !!errors.email}
        error={touched.email && errors.email}
      />
      <BaseInputGroup
        name="master_phone"
        placeholder="Phone number"
        values={values}
        labelText="Phone number"
        marginBot={46}
        valid={touched.master_phone && !errors.master_phone}
        error={touched.master_phone && errors.master_phone}
      />
      <BaseInputGroup
        name="position"
        placeholder="Position in the company"
        values={values}
        labelText="Position in the company"
        marginBot={46}
        valid={touched.position && !errors.position}
        error={touched.position && errors.position}
      />

      <div style={{ width: "100%", marginTop: "-20px", marginBottom: "20px" }}>
        {error && error.phone && (
          <ErrorServerMessage>The company's phone number is not valid</ErrorServerMessage>
        )}
        {error && error.tax_id && (
          <ErrorServerMessage>{'Tax Id number has ' + error.tax_id[0]}</ErrorServerMessage>
        )}
        {error && error.master_email && (
          <ErrorServerMessage>{error.master_email[0]}</ErrorServerMessage>
        )}
        {error && error.zip_code && (
          <ErrorServerMessage>{error.zip_code[0].replace('Invalid format.', 'Zip code has invalid format.')}</ErrorServerMessage>
        )}
        {error && error.master_phone && (
            <ErrorServerMessage>The contact person's phone number is not valid</ErrorServerMessage>
        )}
      </div>

      <Row>
        <BaseBackButton
          onClick={() => {
            changePage(true);
          }}
        />
        <BaseNextButton disabled={isButtonDisabled} type="submit">
          CREATE NEW ACCOUNT
        </BaseNextButton>
      </Row>
    </>
  );
};

export default PartTwo;

const Heading = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #7c7c89;
  margin-bottom: 50px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RowItem = styled.div`
  width: 48%;
`;
