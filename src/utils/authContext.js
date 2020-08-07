import React from "react";
import { navigate } from "@reach/router";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const userInfo =
    typeof window !== "undefined" && localStorage.getItem("userInfo");
  const [authState, setAuthState] = React.useState({
    userInfo: userInfo || null,
  });

  const isLoggedIn = () => !!authState.userInfo;

  const logout = () => {
    localStorage.removeItem("userInfo");
    setAuthState({ userInfo: null });
    navigate("/");
  };

  const setAuthInfo = (userInfo) => {
    console.log(userInfo);
    const { username } = userInfo;
    typeof window !== "undefined" && localStorage.setItem("userInfo", username);
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
