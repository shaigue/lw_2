import React, { Component } from "react";
import {ButtonToolbar, Button } from "react-bootstrap";
import "../../node_modules/video-react/dist/video-react.css";
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
          </h3>
        </div>

        <div className = "blackjack_guide">
          <div>
            <h3>If you don't know how to play blackjack watch the video below</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5bWpnABkU-Y?start=15" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
          </div>
        </div>

        <div className = "box text-center">
          <div>
            <ButtonToolbar>
              <a href= "/login" class="btn btn-primary btn-lg btn-block">
                click here to Start the experiment
              </a>
            </ButtonToolbar>
          </div>
        </div>

      </div>
    );
  }
}
