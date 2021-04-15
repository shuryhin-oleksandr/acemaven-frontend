import React, { useEffect } from "react";
import useRoute from "./routes/useRoute";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./_BLL/reducers/authReducer";
import Spinner from "./_UI/components/_commonComponents/spinner/Spinner";
import { Scrollbars } from "react-custom-scrollbars";
import { getAuthUserInfo } from "./_BLL/thunks/profile/profileThunks";
import { wsChatHelper } from "./_BLL/helpers/wsChatHelper";
import {
  startReceiveNotifications,
  stopReceiveNotifications,
} from "./_BLL/thunks/notifications_thunk/notifications_thunk";
import {
  startReceiveChatNotifications,
  stopReceiveChatNotifications,
} from "./_BLL/thunks/chat_notifications_thunk/chat_notifications_thunk";
import { profileActions } from "./_BLL/reducers/profileReducer";
import i18next from "i18next";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isInit = useSelector((state) => state.auth.isInit);

  const route = useRoute(isAuth);
  const dispatch = useDispatch();
  let token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      dispatch(getAuthUserInfo());
      startReceiveNotifications(dispatch);
      startReceiveChatNotifications(dispatch);
      dispatch(profileActions.setAuthUserInfo(null));
      return () => {
        stopReceiveNotifications(dispatch);
        stopReceiveChatNotifications(dispatch);
      };
    }
  }, [token]);

  useEffect(() => {
    dispatch(authActions.setInit(false));
    if (token) {
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setInit(true));
    } else {
      dispatch(authActions.setAuth(false));
      dispatch(authActions.setInit(true));
    }
  }, [dispatch, token]);

  return isInit ? (
    <Scrollbars
      style={{ width: "100vw", height: "100vh" }}
      autoHide={false}
      renderTrackVertical={(props) => (
        <div {...props} className={isAuth ? {} : "track-vertical"} />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className={isAuth ? {} : "thumb-vertical"} />
      )}
    >
      <div className="App">{route}</div>
      {/*<div style={{ position: "fixed", left:0, bottom:0, right:0, backgroundColor:"lightgrey", zIndex:100 }}>*/}
      {/*  <button onClick={() => i18next.changeLanguage("en")}>EN</button>*/}
      {/*  <button onClick={() => i18next.changeLanguage("por")}>POR</button>*/}
      {/*  <button onClick={() => i18next.changeLanguage("spa")}>SPA</button>*/}
      {/*</div>*/}
    </Scrollbars>
  ) : (
    <Spinner />
  );
}

export default App;
