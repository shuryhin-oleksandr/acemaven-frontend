import React from 'react'
import {
    NotificationsContent,
    NotificationsInner,
    NotificationsTitle,
    NotificationsWrapper, SectionWrapper
} from "./notifications-style";
import NotificationCard from "./NotificationCard";
import ScrollbarStyled from "../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import {useTranslation} from "react-i18next";


type PropsType = {

}

const NotificationsPage:React.FC<PropsType> = ({}) => {
    const {t} = useTranslation();
    return (
        <NotificationsWrapper>
            <NotificationsInner>
                <NotificationsContent>
                    <NotificationsTitle>{t("Notifications/Notifications")}</NotificationsTitle>
                    <ScrollbarStyled {...{style: {width: "100%", height: 620}}}>
                        <SectionWrapper>
                            {/*<NotificationCard />*/}
                            {/*<NotificationCard />*/}
                            {/*<NotificationCard />*/}
                            {/*<NotificationCard />*/}
                            {/*<NotificationCard />*/}
                            {/*<NotificationCard />*/}
                        </SectionWrapper>
                    </ScrollbarStyled>
                </NotificationsContent>
            </NotificationsInner>

        </NotificationsWrapper>
    )
}

export default NotificationsPage