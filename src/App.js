import React, { useEffect } from "react";
import useRoute from "./routes/useRoute";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./_BLL/reducers/authReducer";
import Spinner from "./_UI/components/_commonComponents/spinner/Spinner";
import { Scrollbars } from "react-custom-scrollbars";
import {changeLanguageAtBackEnd, getAuthUserInfo} from "./_BLL/thunks/profile/profileThunks";
import { wsChatHelper } from "./_BLL/helpers/wsChatHelper";
import {
  startReceiveNotifications,
  stopReceiveNotifications,
} from "./_BLL/thunks/notifications_thunk/notifications_thunk";
import {
  startReceiveChatNotifications,
  stopReceiveChatNotifications,
} from "./_BLL/thunks/chat_notifications_thunk/chat_notifications_thunk";
import i18next from "i18next";
import {getMyInfoSelector} from "./_BLL/selectors/profile/profileSelectors";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isInit = useSelector((state) => state.auth.isInit);
  const auth_user_info = useSelector(getMyInfoSelector);
  const route = useRoute(isAuth);
  const dispatch = useDispatch();
  let token = localStorage.getItem("access_token");
  let language = localStorage.getItem('language');

  useEffect(() => {
    if (token) {
      dispatch(getAuthUserInfo());
      startReceiveNotifications(dispatch);
      startReceiveChatNotifications(dispatch);

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


  useEffect(()=> {
    if (language && token && auth_user_info?.id) {
      i18next.changeLanguage(language);
     dispatch(changeLanguageAtBackEnd(Number(auth_user_info?.id), language === 'sp' ? 'es' : language, language))
    }
  },[language, token, auth_user_info?.id])

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
    </Scrollbars>
  ) : (
    <Spinner />
  );
}

export default App;
