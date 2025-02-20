import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="container">
      <div className="page">
        <div>
          <h2>About</h2>
          <p>
            This is a pet project of Clint Veasey. Source code is available here, feel free to fork and create your own version. 
            <a href="https://github.com/veasey/bible-reader-app">github.com/veasey/bible-reader-app</a>. 
            Get in touch if you want to be involved or contribute to this app.
          </p>
        </div>
        
        <h3>Email Me</h3>
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
    </div>
  );
};

export default About;
