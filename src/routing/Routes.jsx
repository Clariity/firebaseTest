import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../components/Home";
import Login from "../components/Login";
import Forgot from "../components/Forgot";
import NotFound from "../components/NotFound";

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/forgot" exact component={Forgot} />
      <Route component={NotFound} />
    </Switch>
  );
};
