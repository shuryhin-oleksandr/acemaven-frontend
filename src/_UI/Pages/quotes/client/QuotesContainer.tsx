import React from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import QuotesPage from "./QuotesPage";

const QuotesContainer:React.FC = () => {
    return (
        <Layout>
            <QuotesPage />
        </Layout>
    )
}

export default QuotesContainer