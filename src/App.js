import React from "react";
import useRoute from './routes/useRoute'

function App() {
  const isAuth = false;
  const route = useRoute(isAuth)
  return (
    <div className="App">
      {route}
    </div>
  );
}

export default App;
