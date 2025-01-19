import React from 'react';
import './LoadingThrobber.css';

const LoadingThrobber = ({ message }) => {
  return (
    <>
      <span className="icon">˗ˏˋ ✞ ˎˊ˗</span>
      {message && <span className="message">&nbsp;{message}</span>}
    </>
  );
};

export default LoadingThrobber;
