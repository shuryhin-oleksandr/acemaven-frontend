import React from "react";
import {
  PopupContent,
  PopupInner,
  PopupTitle,
  PopupWrapper,
  UserInfo,
  UserName,
  UserPhoto,
  UserRole,
  UserRow,
  UserRowAssignButton,
  UserRowInfo,
  UsersList,
} from "./assign-master-to-booking-styles";
import { IconButton } from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import user from "../../../../_UI/assets/icons/profile/defaultUserPhoto.svg";
import { IAddNewUserData } from "../../../../_BLL/types/addNewUserTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
  setAssignAgent: (value: boolean) => void;
  setAssignConfirmation: (value: boolean) => void;
  agents: IAddNewUserData[] | null;
  setAgentFullName: (value: string) => void;
  setAgentId: (id: number) => void;
};

const AssignAgentPopup: React.FC<PropsType> = ({
  setAssignAgent,
  agents,
  setAgentFullName,
  setAssignConfirmation,
  setAgentId,
}) => {
  let assignHandler = (a: IAddNewUserData) => {
    setAgentId(Number(a.id));
    setAgentFullName(a.first_name + " " + a.last_name);
    setAssignAgent(false);
    setAssignConfirmation(true);
  };
  console.log("agents", agents);
  const {t} = useTranslation();
  return (
    <PopupWrapper>
      <PopupInner height="auto">
        <IconButton
          onClick={() => setAssignAgent(false)}
          style={{
            top: "20px",
            right: "20px",
            width: "12px",
            height: "12px",
            position: "absolute",
          }}
        >
          <img src={close_icon} alt="" />
        </IconButton>
        <PopupContent>
          <PopupTitle>{t("Bookings/Assign this booking to an agent")}</PopupTitle>
          <UsersList>
            {agents?.map((a) => {
              return (
                <UserRow key={a.id}>
                  <UserRowInfo>
                    <UserPhoto>
                      <img src={a.photo ? a.photo : user} alt="" />
                    </UserPhoto>
                    <UserInfo>
                      <UserName>{a.first_name + " " + a.last_name}</UserName>
                      <UserRole>{t(`Role/${a.roles.find((r) => r === "agent")}`)}</UserRole>
                    </UserInfo>
                  </UserRowInfo>
                  <UserRowAssignButton onClick={() => assignHandler(a)}>
                    {t("Bookings/ASSIGN")}
                  </UserRowAssignButton>
                </UserRow>
              );
            })}
          </UsersList>
        </PopupContent>
      </PopupInner>
    </PopupWrapper>
  );
};

export default AssignAgentPopup;
