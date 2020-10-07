import React, { useState } from "react";
import { Container, Heading } from "./searchWidgett-styles";
import OptionsDeliveryButtons from "../../../../components/_commonComponents/optionsButtons/OptionsDeliveryButtons";

const SearchWidget: React.FC = () => {
  const [mode, setMode] = useState("ship");
  return (
    <Container>
      <Heading>Search Rates</Heading>
      <OptionsDeliveryButtons mode={mode} setMode={setMode} />

    </Container>
  );
};

export default SearchWidget;
