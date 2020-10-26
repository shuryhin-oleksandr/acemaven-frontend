import React from "react";
import Layout from "../../components/BaseLayout/Layout";
import DashboardPage from "./DashboardPage";
import SearchContainer from "./search/SearchContainer";
import ChargeableWeightPopup from "../../components/PopUps/chargable_weight/ChargeableWeightPopup";


const DashboardContainer:React.FC = () => {
    const search_result = true

    return (
        <Layout>
           {/* <ChargeableWeightPopup />*/}
            {search_result
                ? <SearchContainer />
                :  <DashboardPage />}
        </Layout>
    )
}

export default DashboardContainer