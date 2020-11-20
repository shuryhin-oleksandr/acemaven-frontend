import React from 'react'
import {
    PopupContent,
    PopupInner,
    PopupTitle,
    PopupWrapper, UserInfo, UserName, UserPhoto, UserRole,
    UserRow, UserRowAssignButton, UserRowInfo,
    UsersList
} from "./assign-master-to-booking-styles";
import {IconButton} from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import user from '../../../../_UI/assets/icons/profile/defaultUserPhoto.svg'
import {IAddNewUserData} from "../../../../_BLL/types/addNewUserTypes";


type PropsType = {
    setAssignAgent: (value: boolean) => void,
    setAssignConfirmation: (value: boolean) => void,
    agents: IAddNewUserData[] | null,
    setAgentFullName: (value: string) => void,
    setAgentId: (id: number) => void

}

const AssignAgentPopup:React.FC<PropsType> = ({setAssignAgent, agents, setAgentFullName, setAssignConfirmation, setAgentId}) => {
    let assignHandler = (a: IAddNewUserData) => {
        setAgentId(Number(a.id))
        setAgentFullName(a.first_name + ' ' + a.last_name)
        setAssignAgent(false)
        setAssignConfirmation(true)
    }

    return (
        <PopupWrapper>
            <PopupInner>
                <IconButton onClick={() => setAssignAgent(false)}
                            style={{top: '20px', right: '20px',width: '12px',height: '12px', position: 'absolute'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <PopupContent>
                    <PopupTitle>Assign this booking to an agent</PopupTitle>
                    <UsersList>
                        {agents?.map(a => {
                            return (
                                <UserRow>
                                <UserRowInfo>
                                    <UserPhoto><img src={a.photo ? a.photo : user} alt=""/></UserPhoto>
                                    <UserInfo>
                                        <UserName>{a.first_name + ' ' + a.last_name}</UserName>
                                        <UserRole>{a.roles.find(r => r === 'agent')}</UserRole>
                                    </UserInfo>
                                </UserRowInfo>
                                <UserRowAssignButton onClick={() => assignHandler(a)}>ASSIGN</UserRowAssignButton>
                            </UserRow>
                            )
                        })}
                    </UsersList>
                </PopupContent>
            </PopupInner>
        </PopupWrapper>
    )
}

export default AssignAgentPopup