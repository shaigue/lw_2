
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Videos from "./containers/video-recorder";
import Welcome from "./containers/Welcome";


export default () =>
  <Switch>
    <Route path="/" exact component={Welcome} />

    <Route
      path="/Videos"
      render = {props =>
        <div>
          <Videos />

        </div>
      }/>

    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
