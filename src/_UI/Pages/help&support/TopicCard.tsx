import React from 'react'
//styles
import {
    TopicDescription,
    TopicHeader,
    TopicInner,
    TopicName,
    TopicOuter,
    TopicReason,
    TopicStatus,
    TopicWrap
} from "./help-support-styles";
//icons
import in_progress_icon from '../../assets/icons/support/in_progress.svg'


type PropsType = {

}

const TopicCard:React.FC<PropsType> = ({}) => {
    return (
        <TopicOuter>
            <TopicInner>
                <TopicHeader>
                    <TopicWrap>
                        <TopicName>Topic:</TopicName>
                        <TopicReason>Problem with Payment</TopicReason>
                    </TopicWrap>
                    <TopicWrap>
                        <img src={in_progress_icon} alt=""/>
                        <TopicStatus>In progress</TopicStatus>
                    </TopicWrap>
                </TopicHeader>
                <TopicDescription>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                    Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                </TopicDescription>
            </TopicInner>
        </TopicOuter>
    )
}

export default TopicCard