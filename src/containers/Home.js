import React, { Component } from "react";
import {ButtonToolbar, Button } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Project: Look at Me when I Talk to You</h1>
          <h3> We’re building an open video dataset of human interactions with voice agents like Alexa.
          There are no risks to participating (other than the typical frustration when the chatbot doesn’t respond as you were expecting),
          but if you agree to participate then you will be asked to play Blackjack against Alexa and your interactions with Alexa
          will be audio and video-recorded.
          <ButtonToolbar>
            <a href= "https://www.youtube.com/watch?v=qd5oc9hLrXg" class="btn btn-primary btn-lg">
                I don't know how to play blackjack
            </a>
          </ButtonToolbar>

          </h3>
        </div>
        <div className = "box text-center">
          <ButtonToolbar>
            <a href= "/login" class="btn btn-primary btn-lg btn-block">
              Click here to Start
            </a>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
