var React = require('react');
var ReactDOM = require('react-dom');


var TestUnit = new React.createClass({
	render: function(){
		return (
			<h1>User-center, text is:{this.props.text}</h1>
		);
	}
});

ReactDOM.render(<TestUnit text="用户中心"/>, document.body);