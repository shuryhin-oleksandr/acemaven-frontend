import React, {useEffect} from "react";
import useRoute from "./routes/useRoute";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./_BLL/reducers/authReducer";
import Spinner from "./_UI/components/_commonComponents/spinner/Spinner";
import { Scrollbars } from 'react-custom-scrollbars';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isInit = useSelector((state) => state.auth.isInit);

  const route = useRoute(isAuth);
  const dispatch = useDispatch();
  let token = localStorage.getItem('access_token')

  useEffect(() => {
    dispatch(authActions.setInit(false))
    if(token) {
      dispatch(authActions.setAuth(true))
      dispatch(authActions.setInit(true))
    } else {
      dispatch(authActions.setAuth(false))
      dispatch(authActions.setInit(true))
    }
  }, [dispatch, token])

  return (
     isInit ?
      <Scrollbars style={{ width: "100vw",  height: "100vh" }} autoHide= {false}>
        <div className="App">{route}</div>
      </Scrollbars>:
      <Spinner />
  );
}

export default App;
