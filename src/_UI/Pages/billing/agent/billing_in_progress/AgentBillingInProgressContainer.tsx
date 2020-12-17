import React, {useState} from 'react'
import Layout from "../../../../components/BaseLayout/Layout";
import AgentBillingInProgressPage from "./AgentBillingInProgressPage";



const AgentBillingInProgressContainer:React.FC = ({}) => {
    const [isSearchMode, setSearchMode] = useState(false)
    const [mode, setMode] = useState("sea"); //shipping_type
    const [searchValue, setSearchValue] = useState('')
    const [search_column, setSearchColumn] = useState('')

    return (
        <Layout>
            <AgentBillingInProgressPage search_column={search_column}
                                        setSearchColumn={setSearchColumn}
                                        mode={mode}
                                        setMode={setMode}
                                        searchValue={searchValue}
                                        setSearchValue={setSearchValue}
                                        isSearchMode={isSearchMode}
                                        setSearchMode={setSearchMode}
            />
        </Layout>
    )
}

export default AgentBillingInProgressContainer