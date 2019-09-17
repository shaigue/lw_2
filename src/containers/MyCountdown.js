
import React from 'react';
import Countdown from 'react-countdown-now';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge } from 'reactstrap';

function MyCountdownRenderer({ total, days, hours, minutes, seconds, milliseconds, completed }){
  if(completed) {
    return (
      <div>
        <h2><Badge color="secondary">Finished</Badge></h2>
      </div>
    );
  } else {
    seconds += minutes * 60;
    return (
      <div>
        <h2><Badge color="secondary">{seconds}</Badge> seconds left</h2>
      </div>
    );
  }
}

export default function MyCountdown(props) {
  // just for simplicity and 
  const seconds = props.seconds
  const onComplete = props.onComplete 
  return (
    <Countdown
    date={Date.now() + seconds*1000}
    onComplete={onComplete}
    renderer={MyCountdownRenderer}
    />
  );
}