import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./components/auth/authContext";
import { authReducer } from "./components/auth/authReducer";
import { AppRouter } from "./components/routes/AppRouter";
const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};
const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ dispatch, user }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
export default App;
