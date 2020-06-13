import React from "react";
import { Route, Switch } from "react-router-dom";

import Add from "../components/Add";
import Forgot from "../components/Forgot";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Search from "../components/Search";

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/add" exact component={Add} />
      <Route path="/search" exact component={Search} />
      <Route path="/forgot" exact component={Forgot} />
      <Route path="/recipe" exact component={Add} />
      <Route component={NotFound} />
    </Switch>
  );
};
