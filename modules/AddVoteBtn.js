import React from 'react'
import {render} from 'react-dom'

var AddVoteBtn = React.createClass({
	render: function () {
		return (
			<a href="javascript:;" className="btn-primary addVoteBtn" onClick={this.props.addVote}>增加投票项</a>
		)
	}
});

export default AddVoteBtn;