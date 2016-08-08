import _ from 'underscore';
import React from 'react';
import {render} from 'react-dom';
import BookShelf from './BookShelf.jsx';
import Button from './Button.jsx';
import Select from './Select.jsx';

const PAGINATION = 100;

var BookStore = React.createClass({
  getInitialState: function() {
    return { 
      data: [], 
      genres: [],
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
  		  var response = this.responseTransform(JSON.parse(xhr.responseText), this.props.numberOfBooks);
  	    this.setState({ 
          data: response,
          genres: _.uniq(_.pluck(response, 'genre'))
        });
  	}.bind(this);
  	xhr.open('get', this.props.url, true);
  	xhr.send();
  },
  getModel: function(){
    var filteredModel = this.state.filterBy ? _.filter(this.state.data, function(book){
      // filterBy should be generic, not genre specific later
      return book.genre = this.state.filterBy;
    }.bind(this)) : this.state.data;
    return _.sortBy(filteredModel, this.state.sortBy)
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
  onFilter: function(e){
    console.log('onfilter', e.currentTarget.options[e.currentTarget.selectedIndex].value);
    this.setState({
      counter: 0,
      filterBy: e.currentTarget.options[e.currentTarget.selectedIndex].value
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
        <Button onClick={this.onSort} text={'Sort by title'}></Button>
        <Select title={'Filter by genre: '} onChange={this.onFilter} options={ 
          this.state.genres.map(function(genre){ 
            return {
              text: genre,
              value: genre
            }; 
          }) 
        }></Select>
        <hr></hr>
        <BookShelf data={this.getModel()} />
      </div>
    );
  }
});

module.exports = BookStore;