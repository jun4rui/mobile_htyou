var React = require('react');
var ReactDOM = require('react-dom');


var TestUnit = new React.createClass({
	render: function(){
		return (
			<h1>This is TEST, text is:{this.props.text}</h1>
		);
	}
});

ReactDOM.render(<TestUnit text="test"/>, document.body);