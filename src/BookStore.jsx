import React from 'react';
import {render} from 'react-dom';
import BookShelf from './BookShelf.jsx';

var BookStore = React.createClass({
  getInitialState: function() {
    return { data: [] };    
  },
  responseTransform: function(model, limit){
    var sampleLength = model.length;
    for(var i = sampleLength, max = limit;i<=max;i++){
      model.push({
        id: i + 1,
        name: model[Math.floor(Math.random() * sampleLength)].name,
        author: model[Math.floor(Math.random() * sampleLength)].author,
        genre: model[Math.floor(Math.random() * sampleLength)].genre,
        publish_date: model[Math.floor(Math.random() * sampleLength)].publish_date
      });
    }
    return model;
  },
  loadContent: function(){
  	var xhr = new XMLHttpRequest();
  	xhr.onload = function(e){
  		  var response = JSON.parse(xhr.responseText);
        response = this.responseTransform(response, 150);
  	    this.setState({ 
          data: response
        });
  	}.bind(this);
  	xhr.open('get', this.props.url, true);
  	xhr.send();
  },
  componentDidMount: function(){
  	window.addEventListener('scroll', this.onScroll);
    this.loadContent();
  },
  onScroll: function(){
    var yOffset = window.pageYOffset,
        y = yOffset + window.innerHeight;

      // fixme: querying the dom is bad, on every scroll is very bad. should stored as state later
      if(y >= document.getElementById('bookStore').clientHeight){
        console.log('hit bottom', yOffset);
      }
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