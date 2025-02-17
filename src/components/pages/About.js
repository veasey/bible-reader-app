import React from 'react';
import './About.css';

const About = () => {
  return (
    <div style={{padding:'20px'}}>
      <div>
        <h2>About</h2>
        <p>This is a pet project of Clint Veasey.</p>
        <p>Source code is available for here, feel free to fork and create your own version. 
          <a href="https://github.com/veasey/bible-reader-app">github.com/veasey/bible-reader-app</a></p>
        <p>Get in touch if you want to be involved or contribute to this app.</p>
      </div>
      
      <h3>Get in touch</h3>
      <form
        action="https://formspree.io/f/mkgovode"
        method="POST"
        className='contact'
      >
        <label>
          Your email:
          <input type="email" name="email" />
        </label>
        <label>
          Your message:
          <textarea name="message"></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default About;
