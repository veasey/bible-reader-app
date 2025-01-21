import React from 'react';
import './BookMenu.css';
import { books } from '../constants/books.js';

const BookMenu = ({ message }) => {

  const oldTestamentBooks = books.slice(0,40);
  const newTestamentBooks = books.slice(40);

  return (
    <div class='book-menu-container'>
      <h1>Menu</h1>
      <div>
        <h2>Old Testament</h2>
        <ul>
          {oldTestamentBooks.map((item, index) => (
            <li key={`cat1-${index}`}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>New Testament</h2>
        <ul>
          {newTestamentBooks.map((item, index) => (
            <li key={`cat2-${index}`}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookMenu;
