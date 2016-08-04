import React from 'react'
import {render} from 'react-dom'

var Header = React.createClass({
	render: function () {
		return (
			<div className="header">
				<div className="theme">
					<textarea placeholder="输入投票主题，2-80字"></textarea>
				</div>
			</div>
		)
	}
});

export default Header;