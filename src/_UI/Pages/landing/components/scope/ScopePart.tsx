import React from "react";
import {
  ScopeContent,
  ScopeIcon,
  ScopeInner,
  ScopeNavigation,
  ScopeOuter,
  ScopeSubtitle,
  ScopeTitle,
} from "./scope-style";
import loop from "../../../../../_UI/assets/icons/landing/surface1.svg";
import weight from "../../../../../_UI/assets/icons/landing/weight1.svg";
import tracker from "../../../../../_UI/assets/icons/landing/track1.svg";
import RouteButton from "src/_UI/components/_commonComponents/buttons/route_button/RouteButton";
import { authActions } from "../../../../../_BLL/reducers/authReducer";
import { useDispatch } from "react-redux";

const ScopePart = () => {
  let dispatch = useDispatch();
  return (
    <ScopeOuter>
      <ScopeInner>
        <ScopeContent>
          <ScopeIcon>
            <img src={loop} alt="" />
          </ScopeIcon>
          <ScopeTitle>Select freight forwarder</ScopeTitle>
          <ScopeSubtitle>
            There would be a description of the feature.
          </ScopeSubtitle>
        </ScopeContent>
        <ScopeContent>
          <ScopeIcon>
            <img src={weight} alt="" />
          </ScopeIcon>
          <ScopeTitle>CBM calculator</ScopeTitle>
          <ScopeSubtitle>
            There would be a description of the feature.
          </ScopeSubtitle>
        </ScopeContent>
        <ScopeContent>
          <ScopeIcon>
            <img src={tracker} alt="" />
          </ScopeIcon>
          <ScopeTitle>Track transfer</ScopeTitle>
          <ScopeSubtitle>
            There would be a description of the feature.
          </ScopeSubtitle>
        </ScopeContent>
      </ScopeInner>
      <ScopeNavigation>
        <RouteButton
          callback={() => {
            dispatch(authActions.setSignUpAsAgent(false));
            dispatch(authActions.setOpenSignUp(true));
          }}
          path="#"
          text="START AS CLIENT"
          back="#1B1B25"
          textColor="white"
          w="235px"
        />
        <RouteButton
          callback={() => {
            dispatch(authActions.setSignUpAsAgent(true));
            dispatch(authActions.setOpenSignUp(true));
          }}
          border="1px solid #1B1B25"
          path="#"
          text="START AS AGENT"
          textColor="#1B1B25"
          back="transparent"
          w="235px"
        />
      </ScopeNavigation>
    </ScopeOuter>
  );
};

export default ScopePart;
