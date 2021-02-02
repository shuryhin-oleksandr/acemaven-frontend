import React, { useEffect } from "react";
import useRoute from "./routes/useRoute";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./_BLL/reducers/authReducer";
import Spinner from "./_UI/components/_commonComponents/spinner/Spinner";
import { Scrollbars } from "react-custom-scrollbars";
import { getAuthUserInfo } from "./_BLL/reducers/profileReducer";
import { wsChatHelper } from "./_BLL/helpers/wsChatHelper";
import {
  startReceiveNotifications,
  stopReceiveNotifications,
} from "./_BLL/thunks/notifications_thunk/notifications_thunk";

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
      return () => {
      stopReceiveNotifications();
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
    </Scrollbars>
  ) : (
    <Spinner />
  );
}

export default App;
