import React from 'react';
import {render} from 'react-dom';
import BookStore from './BookStore.jsx';

const apiUrl = './data/BOOKS.json';

render(
  <BookStore url={apiUrl} />,
  document.getElementById('bookStore')
);