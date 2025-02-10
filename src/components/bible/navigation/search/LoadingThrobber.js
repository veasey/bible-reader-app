import React from 'react';
import './LoadingThrobber.css';

const LoadingThrobber = ({ message }) => {
  return (
    <center>
      <span className="icon">˗ˏˋ ✞ ˎˊ˗</span>
      {message && <span className="message">&nbsp;{message}</span>}
    </center>
  );
};

export default LoadingThrobber;
