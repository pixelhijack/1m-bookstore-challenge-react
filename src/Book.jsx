import React from 'react';
import {render} from 'react-dom';

class Book extends React.Component{
	render () {
		return (
			<div className='book'>
                <span className='book__id'>{this.props.id}</span>
                <span className='book__name'>{this.props.name}</span>
                <span className='book__author'>{this.props.author}</span>
                <span className='book__genre'>{this.props.genre}</span>
                <span className='book__date'>{this.props.publish_date}</span>
            </div>        
		);
	}
};

module.exports = Book;