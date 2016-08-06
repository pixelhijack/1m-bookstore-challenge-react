import React from 'react';
import {render} from 'react-dom';

var Button = React.createClass({
	handleClick: function(e){
        console.log('button clicked', e);
    },
    render: function() {
		return (
			<input className='cta'
                type='button'
                onClick={this.props.onClick || this.handleClick} 
                value={this.props.text}/>
		);
	}
});

module.exports = Button;