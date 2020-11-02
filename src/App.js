import React, {useEffect} from "react";
import useRoute from "./routes/useRoute";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./_BLL/reducers/authReducer";
import Spinner from "./_UI/components/_commonComponents/spinner/Spinner";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isInit = useSelector((state) => state.auth.isInit);

  const route = useRoute(isAuth);
  const dispatch = useDispatch()
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
     isInit ? <div className="App">{route}</div> : <Spinner />
  );
}

export default App;
