import React from "react";
import LandingHeader from "./components/header/LandingHeader";
import ScopePart from "./components/scope/ScopePart";
import { LandingContainer } from "./landing-styles";
import ExamplesPart from "./components/examples/ExamplesPart";
import ShippingModePart from "./components/shipping_modes/ShippingModePart";
import Footer from "./components/footer/Footer";

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