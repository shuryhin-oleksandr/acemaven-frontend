import React from "react";
import useRoute from "./routes/useRoute";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const route = useRoute(isAuth);

  return <div className="App">{route}</div>;
}

export default App;
