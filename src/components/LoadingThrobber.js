import React from 'react';
import './LoadingThrobber.css';

const LoadingThrobber = ({ message }) => {
  return (
    <div className="container">
      {/* Optional cross icon */}
      <div className="icon">˗ˏˋ ✞ ˎˊ˗</div>
      {/* Loading Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoadingThrobber;
