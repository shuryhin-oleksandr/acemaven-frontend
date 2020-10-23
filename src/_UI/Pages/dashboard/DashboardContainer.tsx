import React from "react";
import Layout from "../../components/BaseLayout/Layout";
import DashboardPage from "./DashboardPage";
import SearchContainer from "./search/SearchContainer";


const DashboardContainer:React.FC = () => {
    const search_result = true

    return (
        <Layout>
            {search_result
                ? <SearchContainer />
                :  <DashboardPage />}
        </Layout>
    )
}

export default DashboardContainer