import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router } from "@reach/router";

import Admin from "../components/Admin";
import Login from "../components/Login";

function IndexPage() {
  return (
    <Router>
      <Login path="/" />
      <Admin path="admin" />
    </Router>
  );
}

export default IndexPage;
