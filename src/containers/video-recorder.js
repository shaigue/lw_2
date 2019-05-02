import React, { Component } from "react";
import Webcam from "react-webcam";
import ReactWebCamCapture from 'react-webcam-capture';

export default class Videos extends Component {
  constructor(props) {
        super(props);
        this.videoTag = React.createRef()
    }

    componentDidMount() {
        // getting access to webcam
       navigator.mediaDevices
            .getUserMedia({video: true, audio: true})
            .then(stream => this.videoTag.current.srcObject = stream)
            .catch(console.log);
    }

    render() {
        return (
          <ReactWebCamCapture
          constraints={{ audio: true, video: true }}
          timeSlice={10}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onPause={this.handlePause}
          onResume={this.handleResume}
          onError={this.handleError}
          render={({ start, stop, pause, resume }) =>
          <div>

            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>

            <p>Streaming test</p>
          <video id={this.props.id}
                      ref={this.videoTag}
                      width={this.props.width}
                      height={this.props.height}
                      autoPlay
                      title={this.props.title}></video>
            </div>
          }/>
      );
    }
}
