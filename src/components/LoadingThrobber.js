import React from 'react';
import './LoadingThrobber.css';

const LoadingThrobber = ({ message }) => {
  return (
    <div className="container">
      <div><span className="icon">˗ˏˋ ✞ ˎˊ˗</span>{message && <span className="message">&nbsp;{message}</span>}</div>
    </div>
  );
};

export default LoadingThrobber;
