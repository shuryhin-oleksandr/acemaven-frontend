import React, {useState} from 'react'
//components
import Layout from "../../components/BaseLayout/Layout";
import HelpAndSupportPage from "./HelpAndSupportPage";
import TopicForm from "./form/TopicForm";

const HelpSupportContainer:React.FC = () => {

    const [isNewTopic, setNewTopic] = useState(false)

    return (
        <Layout>
            <>
                {isNewTopic
                    ? <TopicForm setNewTopic={setNewTopic}/>
                    : <HelpAndSupportPage setNewTopic={setNewTopic}
                    />
                }
            </>
        </Layout>
    )
}

export default HelpSupportContainer