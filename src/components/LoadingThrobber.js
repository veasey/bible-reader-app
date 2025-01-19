import React from 'react';
import './LoadingThrobber.css';

const LoadingThrobber = ({ message }) => {
  return (
    <div className="container">
      <div className="icon">˗ˏˋ ✞ ˎˊ˗ {message && <span className="message">{message}</span>}</div>
    </div>
  );
};

export default LoadingThrobber;
