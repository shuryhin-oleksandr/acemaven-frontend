import React, {useEffect, useState} from "react";
import Layout from "src/_UI/components/BaseLayout/Layout";
import SurchargePopup from "src/_UI/components/PopUps/Surcharge/SurchargePopup";
import {
  ActionsWrapper,
  Container,
  HeaderOuter,
  MainTitle,
  RegisterButton,
} from "./surcharge-styles";
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/OptionsDeliveryButtons";
import OptionsDirectoryButtons from "src/_UI/components/_commonComponents/optionsButtons/OptionsDirectoryButtons";
import RegistrationNewForm from "./SurchargeRegistrationForm/RegistrationNewForm";
import SurchargesPage from "./surcharges_page/SurchargesPage";
import {useDispatch, useSelector} from "react-redux";
import {getWholeSurchargesList} from "../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import {AppStateType} from "../../../../_BLL/store";

const SurchargesContainer: React.FC = () => {
  const [mode, setMode] = useState("ship");
  const [directory, setDirectory] = useState("Import");

  const [isOpen, setIsOpen] = useState(false);
  const [newSurchargeMode, setNewSurchargeMode] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWholeSurchargesList())
  }, [dispatch])

  let surcharges_list = useSelector((state: AppStateType) => state.surcharge.surcharges_list)

  return (
    <>
      {isOpen && <SurchargePopup setIsOpen={setIsOpen} />}
      <Layout>
        {newSurchargeMode ? (
          <RegistrationNewForm setNewSurchargeMode={setNewSurchargeMode} />
        ) : (
          <Container>
            <HeaderOuter>
              <MainTitle>Surcharges</MainTitle>
              <ActionsWrapper>
                <RegisterButton onClick={() => setNewSurchargeMode(true)}>
                  REGISTER NEW
                </RegisterButton>
                <OptionsDeliveryButtons mode={mode} setMode={setMode} />
                <OptionsDirectoryButtons
                  directory={directory}
                  setDirectory={setDirectory}
                />
              </ActionsWrapper>
            </HeaderOuter>
            <SurchargesPage surcharges_list={surcharges_list}/>
          </Container>
        )}
      </Layout>
    </>
  );
};

export default SurchargesContainer;
