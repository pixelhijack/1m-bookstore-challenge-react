import React from 'react';
import {render} from 'react-dom';
import BookShelf from './BookShelf.jsx';

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

module.exports = BookStore;