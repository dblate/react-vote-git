import React from 'react'
import {render} from 'react-dom'
import YoungCard from './YoungCard.js'
import ShareBtn from './ShareBtn.js'
import AddVoteBtn from './AddVoteBtn.js'
import Header from './Header.js'
import Fooetr from './Footer.js'

var CreateVotePage = React.createClass({
	getInitialState: function () {
		return {
			cardNumber: 2
		}
	},
	addVote: function () {
		var newCardNumber = this.state.cardNumber + 1;
		this.setState({
			cardNumber: newCardNumber
		});
	},
	render: function() {
		var cardNodes = [];
		for (let i = 0; i < this.state.cardNumber; i++) {
			cardNodes.push(<YoungCard />)
		}
		return (
			<div className="createVotePage">
				<Header />
				<div className="mainContent">
					<div className="card">
						{cardNodes}
					</div>
					<div className="btn">
						<AddVoteBtn addVote={this.addVote} />
					</div>
				</div>
				<Fooetr />
			</div>
		)
	}
});

export default CreateVotePage;