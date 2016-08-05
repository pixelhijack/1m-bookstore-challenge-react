import React from 'react';
import {render} from 'react-dom';
import Book from './Book.jsx';

var BookShelf = React.createClass({
	render: function(){
		var bookNodes = this.props.data.map(function(book){
			return (
				<Book 
					key={book.id}
					id={book.id}
					name={book.name}
					genre={book.genre}
					author={book.author.name}
					publish_date={book.publish_date} />
			);
		});

		return (
			<div className='book__container'>
				{bookNodes}
			</div>
		);
	}
});

module.exports = BookShelf;