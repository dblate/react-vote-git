import React from 'react'
import {render} from 'react-dom'

var CompleteBtn = React.createClass({
	render: function () {
		return (
			<a href="javascript:;" className="btn-primary" onClick={this.props.createComplete}>创建</a>
		)
	}
});

export default CompleteBtn;