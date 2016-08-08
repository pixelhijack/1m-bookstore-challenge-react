import React from 'react';
import {render} from 'react-dom';

var Select = React.createClass({
    handleChange: function(e){
        console.log('selected: ', e.currentTarget.options[e.currentTarget.selectedIndex].value);
    },
    render: function() {
        var options = this.props.options.map(function(opt, i){
            return (
                <option key={i} 
                        value={opt.value}> 
                    {opt.text} 
                </option> 
            );
        });
		return (
            <div className='cta'>
                <span> 
                    {this.props.title} 
                </span>
                <select onChange={this.props.onChange || this.handleChange}>
                    {options}
                </select>
            </div>
		);
	}
});

module.exports = Select;