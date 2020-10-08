import React, { useState } from "react";
import Layout from "src/_UI/components/BaseLayout/Layout";
import SurchargePopup from "src/_UI/components/PopUps/Surcharge/SurchargePopup";
import {
  ActionsWrapper,
  Container,
  HeaderOuter,
  MainTitle,
  RegisterButton,
} from "./rates-styles";
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import OptionsDirectoryButtons from "src/_UI/components/_commonComponents/optionsButtons/directory/OptionsDirectoryButtons";
import RegistrationNewRateForm from "./RatesRegistrationForm/RegistrationNewRateForm";
import RatesPage from "./rates_page/RatesPage";

const RatesContainer: React.FC = () => {
  const [mode, setMode] = useState("sea");
  const [directory, setDirectory] = useState("import");

  const [isOpen, setIsOpen] = useState(false);
  const [newRateMode, setNewRateMode] = useState(false);

  return (
    <>
      {isOpen && <SurchargePopup setIsOpen={setIsOpen} />}
      <Layout>
        {newRateMode ? (
          <RegistrationNewRateForm setNewRateMode={setNewRateMode} />
        ) : (
          <Container>
            <HeaderOuter>
              <MainTitle>Freight rates</MainTitle>
              <ActionsWrapper>
                <RegisterButton onClick={() => setNewRateMode(true)}>
                  REGISTER NEW
                </RegisterButton>
                <OptionsDeliveryButtons mode={mode}
                                        setMode={setMode}
                                        directory={directory}
                                        searchColumn=''
                                        searchValue=''
                />
                <OptionsDirectoryButtons
                    mode={mode}
                  directory={directory}
                  setDirectory={setDirectory}
                    searchColumn=''
                    searchValue=''
                />
              </ActionsWrapper>
            </HeaderOuter>
            <RatesPage />
          </Container>
        )}
      </Layout>
    </>
  );
};

export default RatesContainer;
