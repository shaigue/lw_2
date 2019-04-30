import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Project: Look at Me when I Talk to You</h1>
          <p> We are trying to collect dataset of people interacting with a voice agent like Amazon Alexa.
          There is no risk involved with this study but if you agree to participate,
          you will be video recorded and audio recorded.</p>
        </div>
      </div>
    );
  }
}
