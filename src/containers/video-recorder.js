/* eslint-disable */
import React, { Component } from 'react';
import {ButtonToolbar, Button, Collapse, Card, Progress } from "reactstrap";
import './video-recorder.css'

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

import MyCountdown from './MyCountdown';
import AWS from 'aws-sdk';

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:7c3552ee-a9c7-4fce-8377-1cd3b0eaa489',
});

const videoJsOptions = {
    controls: false,
    width: 720,
    height: 540,
    fluid: false,
    plugins: {
        record: {
            audio: true,
            video: true,
            maxLength: 600,
            debug: true
        }
      },
    controlBar: {
      fullscreenToggle: false,
      deviceButton: false,
      hotKeys:true
    }
}


/*
// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;

// register videojs-wavesurfer plugin
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
*/

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';

export default class Videos extends Component {

  constructor(props) {
      super(props);
      this.startRecord = this.startRecord.bind(this);
      this.toggle1 = this.toggle1.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);

      this.state = {
        collapse1: true,
        collapse2: false,
        collapse3: false,
        countdownStarted: false,
        progressPercent: 0,
      };
    }
    getUploadParams = (data) => {
      return {
        Body: data, // the data
        Bucket: 'lamwitty-lamwitty', 
        ContentType: 'video/webm',
        Key: 'public/study-videos/example1.webm', // the name it will be saved in the S3 bucket
        // Metadata: '', // a map of metadata to attach to the object
      };
    };
    handleUpload = (err, data) => {
      if(err) {
        console.log('Error in upload');
        console.log(err);
      } else {
        console.log('Upload is in progress');
        console.log(data.Key + ' is Uploading...');
      }
    }
    doUpload = (data) => {
      const s3 = new AWS.S3({apiersion: '2006-03-01'});
      s3.upload(this.getUploadParams(data), this.handleUpload)
      .on('httpUploadProgress', (event) => {
        const completed = (event.loaded * 100) / event.total;
        console.log("Uploaded :: " + parseInt(completed) +'%');
        this.setState({progressPercent: completed});
      })
      .send((err, data) => {
        if(err) {
          console.log('error uploading');
          console.log(err);
        } else {
          console.log('Success upload');
        }
      });
    };

    toggle1(){
      this.setState(state => ({ collapse1: !state.collapse1}));
    }

    toggle2(){
      this.setState(state => ({ collapse2: !state.collapse2}));
    }

    toggle3(){
      this.setState(state => ({ collapse3: !state.collapse3}));
    }
    startRecord() {
        this.player.record().start();
        this.toggle1();
        this.toggle2();

    }
    startCountdown = () => {
      this.setState({countdownStarted: true});
    }
    stopRecord = () => {
      this.player.record().stop();
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
        this.player.record().getDevice();
        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });
        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');
            this.startCountdown();
        });
        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            this.toggle2();
            this.toggle3();
            console.log('finished recording:', this.player.recordedData);
            // TODO: add some code to upload to S3 the video and logs
            this.doUpload(this.player.recordedData);
        });
        // error handling
        this.player.on('error', (element, error) => {
            console.warn(error);
        });
        this.player.on('deviceError', () => {
            console.error('device error:', this.player.deviceErrorCode);
        });

    }


  render() {
    const seconds = 180; // 3- minutes
    const countdown = (
      <MyCountdown 
        seconds={seconds}
        onComplete={this.stopRecord}
      />
    );
    return (
        <div className='thebig'>
            <div className='instructions'>
                <Collapse isOpen={this.state.collapse1} appear={false}>
                    <ButtonToolbar id="bt">
                      <Button color='primary' onClick={this.startRecord}>
                        <h2>
                          Start Recording
                        </h2>
                      </Button>
                    </ButtonToolbar>
                </Collapse>

                <Collapse isOpen={this.state.collapse2} appear={false}>
                    <ButtonToolbar id="bt">
                      <h2>
                        Say: “Alexa, open blackjack Prototype” and start playing
                        < br/>
                        < br/>
                        {this.state.countdownStarted && countdown}
                      </h2>
                    </ButtonToolbar>
                </Collapse>

                <Collapse isOpen={this.state.collapse3} appear={false}>
                    <ButtonToolbar id="bt">
                      <h2>
                        Thank you for participating! Your recording is being uploaded to the server!
                      </h2>
                    </ButtonToolbar>
                    <Progress animated value={this.state.progressPercent}>{this.state.progressPercent}%</Progress>
                </Collapse>
          </div>
          <div className ="video_player">
              <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline></video>
          </div>
        </div>


      );
  }
}
