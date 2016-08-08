import _ from 'underscore';
import React from 'react';
import {render} from 'react-dom';
import BookShelf from './BookShelf.jsx';
import Button from './Button.jsx';

const PAGINATION = 100;

var BookStore = React.createClass({
  getInitialState: function() {
    return { 
      data: [], 
      sortBy: 'id', 
      filterBy: '',
      counter: 0 
    };    
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
  	    this.setState({ data: this.responseTransform(response, this.props.numberOfBooks) });
  	}.bind(this);
  	xhr.open('get', this.props.url, true);
  	xhr.send();
  },
  getModel: function(){
    return _.sortBy(this.state.data, this.state.sortBy)
            .slice(this.state.counter, this.state.counter + PAGINATION);
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
        this.nextPage();
        window.scrollTo(0, 0);
      }
  },
  onSort: function(){
    this.setState({
      counter: 0,
      sortBy: 'name'
    });
  },
  nextPage: function(){
    this.setState({
      counter: this.state.counter + PAGINATION
    });
  },
  reset: function(){
    this.setState({
      counter: 0,
      sortBy: 'id', 
      filterBy: ''
    });
  },
  render: function() {
    return (
      <div className='bookStore'>
        <h1>Store of One Million Book</h1>
        <Button onClick={this.reset} text={'Reset'}></Button>
        <Button onClick={this.onSort} text={'Sort by name'}></Button>
        <hr></hr>
        <BookShelf data={this.getModel()} />
      </div>
    );
  }
});

module.exports = BookStore;