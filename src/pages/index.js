import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router, Redirect } from "@reach/router";

import Admin from "../components/Admin";
import Login from "../components/Login";
import { AuthProvider, AuthContext } from "../utils/authContext";

const AuthRoutes = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  console.log(isLoggedIn());
  return isLoggedIn() ? <Element {...rest} /> : <Redirect to="/" noThrow />;
};

function IndexPage() {
  return (
    <AuthProvider>
      <Router>
        <Login path="/" />
        <AuthRoutes element={Admin} path="admin" />
      </Router>
    </AuthProvider>
  );
}

export default IndexPage;
