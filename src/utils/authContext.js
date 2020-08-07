import React from "react";
import { navigate } from "@reach/router";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  const [authState, setAuthState] = React.useState({
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const isLoggedIn = () => authState && authState === {};

  const logout = () => {
    localStorage.removeItem("userInfo");
    setAuthState({ userInfo: {} });
    navigate("/");
  };

  const setAuthInfo = (userInfo) => {
    console.log(userInfo);
    const { username } = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(username));
    setAuthState({ userInfo: { username } });
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLoggedIn,
        authState,
        setUserInfo: setAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
