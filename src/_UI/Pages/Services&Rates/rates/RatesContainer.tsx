import React, { useEffect, useState } from "react";
import Layout from "src/_UI/components/BaseLayout/Layout";
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
import {getFilteredRateListThunk, getRateInfoThunk} from "../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { useDispatch, useSelector } from "react-redux";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
import {getFreightRatesList, getRegistrationSuccess} from "../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import {rateActions} from "../../../../_BLL/reducers/surcharge&rates/rateReducer";
import {RateInfoType} from "../../../../_BLL/types/rates&surcharges/ratesTypes";

const RatesContainer: React.FC = () => {
  const [mode, setMode] = useState("sea");
  const [directory, setDirectory] = useState("import");
  const [searchValue, setSearchValue] = useState("");
  const [search_column, setSearchColumn] = useState("");

  //data from store
  const freight_rates_list = useSelector(getFreightRatesList)
  const freight_registration_success = useSelector(getRegistrationSuccess)

  const dispatch = useDispatch();

  //set registration mode on/off
  const [newRateMode, setNewRateMode] = useState(false);

  useEffect(() => {
    dispatch(getFilteredRateListThunk(directory, mode, "", "", ""));
  }, [dispatch, directory, mode]);

  useEffect(() => {
    if(freight_registration_success) {
      dispatch(getFilteredRateListThunk(directory, mode, "", "", ""))
      dispatch(rateActions.setRegistrationSuccess(''))
    }
  }, [freight_registration_success, dispatch])


  const dispatchHandler = (someFn: VoidFunctionType) => {
    return dispatch(someFn);
  };

  //use existing FR as template for the new one
  const setCheckedFreightRate = (rate: RateInfoType) => {
    dispatch(rateActions.setCurrentShippingType(rate.shipping_type))
    dispatch(getRateInfoThunk(rate.id))
    setNewRateMode(true)
  }

  return (
      <Layout>
        {newRateMode ? (
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
                  thunkName='rates'
                />
                <OptionsDirectoryButtons
                  mode={mode}
                  directory={directory}
                  setDirectory={setDirectory}
                  searchColumn=""
                  searchValue=""
                  margin_bottom='0'
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
              setCheckedFreightRate={setCheckedFreightRate}
            />
          </Container>
        )}
      </Layout>
  );
};

export default RatesContainer;
