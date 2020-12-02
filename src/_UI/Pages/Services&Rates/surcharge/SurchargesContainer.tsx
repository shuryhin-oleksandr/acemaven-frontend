import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Layout from "src/_UI/components/BaseLayout/Layout";
import SurchargePopup from "src/_UI/components/PopUps/Surcharge/SurchargePopup";
import {
  ActionsWrapper,
  Container,
  HeaderOuter,
  MainTitle,
  RegisterButton,
} from "./surcharge-styles";
import SurchargesPage from "./surcharges_page/SurchargesPage";
import {
  filterByThunk
} from "../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {AppStateType} from "../../../../_BLL/store";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import RegisterNewSurchargeContainer from "./register_new_surcharge/RegisterNewSurchargeContainer";
import OptionsDeliveryButtons from "../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import OptionsDirectoryButtons
  from "../../../components/_commonComponents/optionsButtons/directory/OptionsDirectoryButtons";
import ModalWindow from "../../../components/_commonComponents/ModalWindow/ModalWindow";



const SurchargesContainer: React.FC = () => {

  const [mode, setMode] = useState("sea");
  const [directory, setDirectory] = useState("import");
  const [searchValue, setSearchValue] = useState('')
  const [search_column, setSearchColumn] = useState('')


  const [isOpen, setIsOpen] = useState(false);
  const [newSurchargeMode, setNewSurchargeMode] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filterByThunk(directory, mode, '', '', ''))

  }, [dispatch, directory, mode])

  let surcharges_list = useSelector((state: AppStateType) => state.surcharge.surcharges_list)

  const dispatchHandler = (someFn:VoidFunctionType) => {
    return dispatch(someFn)
  }


  return (
    <>
      <ModalWindow isOpen={isOpen}>
        <SurchargePopup setIsOpen={setIsOpen} />
      </ModalWindow>
      <Layout>
        {newSurchargeMode ? (
            <RegisterNewSurchargeContainer setNewSurchargeMode={setNewSurchargeMode} />
        ) : (
          <Container>
            <HeaderOuter>
              <MainTitle>Surcharges</MainTitle>
              <ActionsWrapper>
                <RegisterButton onClick={() => setNewSurchargeMode(true)}>
                  REGISTER NEW
                </RegisterButton>
                <OptionsDeliveryButtons mode={mode}
                                        directory={directory}
                                        setMode={setMode}
                                        searchColumn={search_column}
                                        searchValue={searchValue}
                />
                <OptionsDirectoryButtons
                  directory={directory}
                  mode={mode}
                  setDirectory={setDirectory}
                  searchColumn={search_column}
                  searchValue={searchValue}
                  margin_bottom='0'
                />
              </ActionsWrapper>
            </HeaderOuter>
            <SurchargesPage surcharges_list={surcharges_list}
                            dispatch={dispatchHandler}
                            directory={directory}
                            mode={mode}
                            searchValue={searchValue}
                            searchColumn={search_column}
                            setSearchColumn={setSearchColumn}
                            setSearchValue={setSearchValue}
                            setNewSurchargeMode={setNewSurchargeMode}
            />
          </Container>
        )}
      </Layout>
    </>
  );
};

export default SurchargesContainer;
