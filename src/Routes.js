
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Video_page from "./containers/Video_page";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    { /* Finally, catch all unmatched routes */ }
    <Route path="/login" exact component={Login} />
    <Route path="/Video_page" exact component={Video_page} />
    <Route component={NotFound} />
  </Switch>;
