import React, {useEffect} from "react";
import useRoute from "./routes/useRoute";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./_BLL/reducers/authReducer";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const route = useRoute(isAuth);
  const dispatch = useDispatch()
  let token = localStorage.getItem('access_token')

  useEffect(() => {
    if(token) {
      dispatch(authActions.setAuth(true))
    } else {
      dispatch(authActions.setAuth(false))
    }
  }, [dispatch, token])

  return <div className="App">{route}</div>;
}

export default App;
