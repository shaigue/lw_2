/* eslint-disable */
import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import {ButtonToolbar, Button, Collapse, Card } from "reactstrap";
import './video-recorder.css'

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

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

const config = {
    bucketName: 'blackjackvideo',
    region: 'us-east-1',
    accessKeyId:'',
    secretAccessKey:'',
}




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
      deviceButton: false
    }
}



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


    startRecord() {
        this.player.record().start();
        this.toggle1();
        this.toggle2();

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
        });

        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // recordedData is a blob object containing the recorded data that
            // can be downloaded by the user, stored on server etc.
            this.toggle2();
            this.toggle3();
            console.log('finished recording:', this.player.recordedData);
            S3FileUpload.uploadFile(this.player.recordedData, config)
            .then(data => console.log(data))
            .catch(err => console.error(err));
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
                        [you will be recorded for 5 minutes and moved to the next page when the time's up]
                      </h2>
                    </ButtonToolbar>
                </Collapse>

                <Collapse isOpen={this.state.collapse3} appear={false}>
                    <ButtonToolbar id="bt">
                      <h2>
                        Thank you for participating! Your recording is being uploaded to the server!
                      </h2>
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
