/* eslint-disable */
import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import {ButtonToolbar, Card, Button, CardTitle, CardText, Jumbotron, Collapse } from "reactstrap";

import './video-recorder-demo.css'

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';
import {withRouter} from 'react-router-dom';

const videoJsOptions = {
    controls: false,
    width: 400,
    height: 300,
    fluid: false,
    plugins: {
        record: {
            audio: true,
            video: true,
            maxLength: 3,
            debug: true
        }
      },
    controlBar: {
      fullscreenToggle: false,
      deviceButton: false,
      hotKeys:true
    }
}



export default class Videos_Demo extends Component {

  constructor(props) {
      super(props);
      this.cameraTurnon = this.cameraTurnon.bind(this);
      this.startRecord = this.startRecord.bind(this);
      this.toggle1 = this.toggle1.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
      this.toggle4 = this.toggle4.bind(this);
      this.slide_2_3 = this.slide_2_3.bind(this);
      this.slide_4_5 = this.slide_4_5.bind(this);

      this.state = {
        collapse1: true,
        collapse2: false,
        collapse3: false,
        collapse4: false,
        collapse5: false,
      };
    }

    toggle1(){
      this.setState(state => ({ collapse1: !state.collapse1}));
    }

    toggle2(){
      this.setState(state => ({ collapse2: !state.collapse2}));
    }

    toggle3(){
      this.setState(state => ({ collapse3: !state.collapse3}));
    }
    toggle4(){
      this.setState(state => ({ collapse4: !state.collapse4}));
    }

    slide_2_3() {
      this.toggle2();
      this.toggle3();
    }

    cameraTurnon() {
        this.player.record().getDevice();
        this.toggle1();
        this.toggle2();
    }

    startRecord() {
        this.player.record().start();
        this.toggle3();
        this.toggle4();

    }

    slide_4_5() {
        this.setState(
          state => ({
            collapse4: !state.collapse4,
            collapse5: !state.collapse5
        }));
    }


    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, videoJsOptions, () => {
            // print version information at startup
            var version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(version_info);
        });

        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });

        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');
        });

        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording:', this.player.recordedData);
            this.player.record().saveAs({'video': 'my-video-file-name.webm'});
            this.slide_4_5();
        });

        // error handling
        this.player.on('error', (element, error) => {
            console.warn(error);
        });

        this.player.on('deviceError', () => {
            console.error('device error:', this.player.deviceErrorCode);
        });

    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

  render() {
      return (
        <div className='thebig'>
            <div className='instructions'>
                <Collapse isOpen={this.state.collapse1} appear={false}>

                    <ButtonToolbar id="bt">
                      <Button color='primary' onClick={this.cameraTurnon}>
                        <h2>
                          Enable camera/mic.
                        </h2>
                      </Button>
                    </ButtonToolbar>
                </Collapse>

                <Collapse isOpen={this.state.collapse2} appear={false}>

                    <ButtonToolbar id="bt">
                      <Button color='primary' onClick={this.slide_2_3}>
                        <h2>
                          Put your Alexa beside your Camera
                        </h2>
                      </Button>
                    </ButtonToolbar>

                </Collapse>

                <Collapse isOpen={this.state.collapse3} appear={false}>

                    <ButtonToolbar id="bt">
                      <Button color='primary' onClick={this.startRecord}>
                        <h2>
                          Start Test Recording
                        </h2>
                      </Button>
                    </ButtonToolbar>

                </Collapse>

                <Collapse isOpen={this.state.collapse4} appear={false}>

                    <h2>
                      Say: "Alexa What's the weather?" < br/>
                      < br/>
                      [you will be recorded for 20 seconds]
                    </h2>

                </Collapse>

                <Collapse isOpen={this.state.collapse5} appear={false}>

                    <h2>
                      You should have a video file downloaded to your computer. Check the video to make sure everything is working.
                      < br/>
                      < br/>
                      If everything is working.
                    </h2>

                    <ButtonToolbar id="bt">
                      <a href="/Videos" className="btn btn-primary">
                        <h2>
                          Next Page
                        </h2>
                      </a>
                    </ButtonToolbar>


                    <h2>
                      < br/>
                      If it didn't work...
                    </h2>

                    <ButtonToolbar id="bt">
                      <a onClick={()=> window.open("https://www.cleverfiles.com/help/mac-camera-not-working.html")} className="btn btn-primary">
                        <h2>
                          Help for Mac users
                        </h2>
                      </a>
                    </ButtonToolbar>


                    <ButtonToolbar id="bt">
                      <a onClick={()=> window.open("https://support.microsoft.com/en-us/help/13753/windows-10-camera-does-not-work", "_blank")}  className="btn btn-primary">
                        <h2>
                          Help for Window Users
                        </h2>
                      </a>
                    </ButtonToolbar>

                    <h2>
                      < br/>
                      After making adjustments...
                    </h2>

                    <ButtonToolbar id="bt">
                      <a href="/Videos_demo" className="btn btn-primary">
                        <h2>
                          Refresh this page
                        </h2>
                      </a>
                    </ButtonToolbar>
                </Collapse>
          </div>
          <div className ="video_player">
              <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
          </div>
        </div>
      );
  }
}
