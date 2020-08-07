import React from "react";
import { navigate } from "@reach/router";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  const [authState, setAuthState] = React.useState({ userInfo: null });

  const logout = () => {
    setAuthState({ userInfo: userInfo ? JSON.parse(userInfo) : {} });
    navigate("/");
  };

  const setAuthInfo = ({ userInfo }) => {
    const { username } = userInfo;
    localStorage.setItem("username", username);
    setAuthState({ userInfo: { username } });
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        authState,
        setUserInfo: setAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default { AuthContext, AuthProvider };
