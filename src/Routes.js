
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Videos from "./containers/video-recorder.js";

const videoJsOptions = {
    controls: true,
    width: 320,
    height: 240,
    fluid: true,
    plugins: {
        /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            src: 'live',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true
        },
        */
        record: {
            audio: true,
            video: true,
            maxLength: 600,
            debug: true
        }
    }
};

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />

    <Route
      path="/Videos"
      render = {(props) => <Videos {...videoJsOptions}/>}
    />

    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
