import React from 'react'
import {render} from 'react-dom'

var CreateVotePageBtn = React.createClass({
	onClick() {
		window.location.hash = 'CreateVotePage'
	},
	render() {
		return (
			<a href="javascript:;" className="CreateVotePageBtn" onClick={this.onClick}>发起投票</a>
		)
	}
});

export default CreateVotePageBtn;