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
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";

const RatesContainer: React.FC = () => {
  const [mode, setMode] = useState("sea");
  const [directory, setDirectory] = useState("import");
  const [searchValue, setSearchValue] = useState("");
  const [search_column, setSearchColumn] = useState("");
  const dispatch = useDispatch();
  const [newRateMode, setNewRateMode] = useState(false);

  useEffect(() => {
    dispatch(getFilteredRateListThunk(directory, mode, "", "", ""));
  }, [dispatch, directory, mode]);

  let freight_rates_list = useSelector(
    (state: AppStateType) => state.rate.freight_rates_list
  );

  const dispatchHandler = (someFn: VoidFunctionType) => {
    return dispatch(someFn);
  };

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
            <RatesPage
              freight_rates_list={freight_rates_list}
              dispatch={dispatchHandler}
              directory={directory}
              mode={mode}
              searchValue={searchValue}
              searchColumn={search_column}
              setSearchColumn={setSearchColumn}
              setSearchValue={setSearchValue}
              setNewRateMode={setNewRateMode}
            />
          </Container>
        )}
      </Layout>
    </>
  );
};

export default RatesContainer;
