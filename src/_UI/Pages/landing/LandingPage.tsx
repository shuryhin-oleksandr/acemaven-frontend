import React from "react";

import ScopePart from "./components/scope/ScopePart";
import { LandingContainer } from "./landing-styles";
import ExamplesPart from "./components/examples/ExamplesPart";
import ShippingModePart from "./components/shipping_modes/ShippingModePart";
import Footer from "./components/footer/Footer";
import LandingHeader from "./components/header/LandingHeader";

const LandingPage:React.FC = () => {
    return (
        <LandingContainer>
            <LandingHeader />
            <ScopePart />
            <ExamplesPart />
            <ShippingModePart />
            <Footer />
        </LandingContainer>
    )
}

export default LandingPage