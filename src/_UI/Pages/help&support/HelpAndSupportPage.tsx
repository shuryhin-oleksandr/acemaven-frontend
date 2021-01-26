import React from 'react'
//components
import TopicCard from "./TopicCard";
//styles
import {
    AddTopicOption,
    AddTopicText,
    SupportContent,
    SupportInner,
    SupportOuter,
    SupportTitle
} from "./help-support-styles";


type PropsType = {
    setNewTopic: (value: boolean) => void
}

const HelpAndSupportPage:React.FC<PropsType> = ({ setNewTopic}) => {
    return (
        <SupportOuter>
            <SupportInner>
                <SupportTitle>Help and Support</SupportTitle>
                <SupportContent>
                    <AddTopicOption>
                        <AddTopicText onClick={() => setNewTopic(true)}>+ Add New</AddTopicText>
                    </AddTopicOption>
                    <TopicCard />
                </SupportContent>
            </SupportInner>
        </SupportOuter>
    )
}

export default HelpAndSupportPage