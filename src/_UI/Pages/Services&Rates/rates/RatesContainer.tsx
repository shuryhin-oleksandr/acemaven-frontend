import React, { useEffect, useState } from "react";
import Layout from "src/_UI/components/BaseLayout/Layout";
import SurchargePopup from "src/_UI/components/PopUps/Surcharge/SurchargePopup";
import RegisterSurchargePopUp from "../../../components/PopUps/RegisterSurchargePopUp/RegisterSurchargePopUp";
import {
  ActionsWrapper,
  Container,
  HeaderOuter,
  MainTitle,
  RegisterButton,
} from "./rates-styles";
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import OptionsDirectoryButtons from "src/_UI/components/_commonComponents/optionsButtons/directory/OptionsDirectoryButtons";

import RatesPage from "./rates_page/RatesPage";
import RegisterNewFreightRateContainer from "./register_new_freight_rate/RegisterNewFreightRateContainer";
import { getFilteredRateListThunk } from "../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../../_BLL/store";

const RatesContainer: React.FC = () => {
  const [mode, setMode] = useState("sea");
  const [directory, setDirectory] = useState("import");
  const dispatch = useDispatch();
  const [newRateMode, setNewRateMode] = useState(false);

  useEffect(() => {
    dispatch(getFilteredRateListThunk());
  }, [dispatch, directory, mode]);

  let freight_rates_list = useSelector(
    (state: AppStateType) => state.rate.freight_rates_list
  );

  return (
    <>
      <Layout>
        {newRateMode ? (
          /* <RegistrationNewRateForm setNewRateMode={setNewRateMode} />*/
          <RegisterNewFreightRateContainer setNewRateMode={setNewRateMode} />
        ) : (
          <Container>
            <HeaderOuter>
              <MainTitle>Freight rates</MainTitle>
              <ActionsWrapper>
                <RegisterButton onClick={() => setNewRateMode(true)}>
                  REGISTER NEW
                </RegisterButton>
                <OptionsDeliveryButtons
                  mode={mode}
                  setMode={setMode}
                  directory={directory}
                  searchColumn=""
                  searchValue=""
                />
                <OptionsDirectoryButtons
                  mode={mode}
                  directory={directory}
                  setDirectory={setDirectory}
                  searchColumn=""
                  searchValue=""
                />
              </ActionsWrapper>
            </HeaderOuter>
            <RatesPage freight_rates_list={freight_rates_list} />
          </Container>
        )}
      </Layout>
    </>
  );
};

export default RatesContainer;
