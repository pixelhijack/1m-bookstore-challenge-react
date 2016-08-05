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

// tutorial1.js
var BookStore = React.createClass({
  getInitialState: function() {
    return { data: [] };    
  },
  pullSomeAPI: function(){
  	var data;
	var xhr = new XMLHttpRequest();
	var component = this;
	xhr.onload = function(e){
		data = JSON.parse(this.responseText);
	    console.log(data);
	    component.setState({ data: data });
	};
	xhr.open('get', this.props.url, true);
	xhr.send();
  },
  componentDidMount: function(){
  	this.pullSomeAPI();
  },
  render: function() {
    return (
      <div className='bookStore'>
        <h1>Store of One Million Book</h1>
        <BookShelf data={this.state.data} />
      </div>
    );
  }
});

render(
  <BookStore url='./data/BOOKS.json'/>,
  document.getElementById('bookStore')
);