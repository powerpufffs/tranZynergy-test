import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router, Redirect, Link } from "@reach/router";

import Admin from "../components/Admin";
import Login from "../components/Login";
import { AuthProvider, AuthContext } from "../utils/authContext";

const FourOFour = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mt-10">404</h1>
      <h2 className="text-4xl">Page Not Found</h2>
      <div className="mt-2">
        <Link to="/">Go Back Home</Link>
      </div>
    </div>
  );
};

const AuthRoutes = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn() ? <Element {...rest} /> : <Redirect to="/" noThrow />;
};

function IndexPage() {
  return (
    <AuthProvider>
      <Router>
        <Login path="/" />
        <AuthRoutes element={Admin} path="admin" />
        <FourOFour path="*" />
      </Router>
    </AuthProvider>
  );
}

export default IndexPage;
