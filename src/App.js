import React from "react";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const isUserLoggedIn = false;
  return (
    <div className="App">{isUserLoggedIn ? "Hello" : <PublicRoute />}</div>
  );
}

export default App;
