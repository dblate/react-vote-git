import React from 'react'
import {render} from 'react-dom'
import ShareBtn from './ShareBtn.js'

var Footer = React.createClass({
	render: function () {
		return (
			<div className="footer">
				<div className="forSharpCorner">
					<div id="shareToWeChatBox"></div>
					<em className="a"></em><em className="b"></em>
				</div>
				<ShareBtn />
			</div>
		)
	}
});

export default Footer;