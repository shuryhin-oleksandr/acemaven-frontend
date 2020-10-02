import React from "react";
import Layout from "../../components/BaseLayout/Layout";
import DashboardPage from "./DashboardPage";


const DashboardContainer:React.FC = () => {
    return (
        <Layout>
            <DashboardPage />
        </Layout>
    )
}

export default DashboardContainer