import React from 'react'
import {render} from 'react-dom'
import CompleteBtn from './CompleteBtn.js'

var Footer = React.createClass({
	render: function () {
		return (
			<div className="footer">
				<div className="forSharpCorner">
					<div id="shareToWeChatBox"></div>
					<em className="a"></em><em className="b"></em>
				</div>
				<CompleteBtn />
			</div>
		)
	}
});

export default Footer;