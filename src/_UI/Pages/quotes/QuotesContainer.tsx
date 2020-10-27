import React from 'react'
import Layout from "../../components/BaseLayout/Layout";
import QuotesPage from "./client/QuotesPage";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import AgentQuotesPage from "./agent/AgentQuotesPage";

const QuotesContainer:React.FC = () => {
    let company_type = useSelector((state: AppStateType) => state.profile.authUserInfo?.companies && state.profile.authUserInfo?.companies[0])

    return (
        <Layout>
            {company_type?.type === 'client'
                ? <QuotesPage />
                : <AgentQuotesPage />
            }

        </Layout>
    )
}

export default QuotesContainer