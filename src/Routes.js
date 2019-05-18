
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Videos from "./containers/video-recorder";
import Videos_demo from "./containers/video-recorder-demo";


export default () =>
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/Videos_demo" exact component={Videos_demo} />
    <Route
      path="/Videos"
      render = {props =>
        <div>
          <Videos />

        </div>
      }/>

    <Route component={NotFound} />
  </Switch>;
