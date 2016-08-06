import React from 'react';
import {render} from 'react-dom';
import BookStore from './BookStore.jsx';

const apiUrl = './data/BOOKS.json';

const BOOKS_NUMBER = 100000;

render(
  <BookStore url={apiUrl} numberOfBooks={BOOKS_NUMBER}/>,
  document.getElementById('bookStore')
);