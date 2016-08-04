import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import CreateVotePageBtn from './modules/CreateVotePageBtn.js';
import CreateVotePage from './modules/CreateVotePage.js'

let App = React.createClass({
	componentDidMount() {
		// 点击body任意一处（二维码中除外），隐藏二维码
		var body = document.querySelector('body');
		var forSharpCorner = document.querySelector('.forSharpCorner');
		body.onclick = function (e) {
			if (e.target.id !== 'shareToWeChatBox' && e.target.className !== 'share') {
				var shareToWeChatBox = document.querySelector('#shareToWeChatBox');
				forSharpCorner.style.display = 'none';
			}
			// e.stopPropagation();
		}
	},
	render() {
		return (
			<Router history={hashHistory}>
		      	<Route path="/" component={CreateVotePageBtn} />
		        <Route path="CreateVotePage" component={CreateVotePage} />
	      	</Router>
		)
	}
});

render(<App />, document.getElementById('react'));

(function() {
	var screenWidth = document.documentElement.clientWidth;
	document.getElementsByTagName('html')[0].style.fontSize = (100 * (screenWidth / 320) + 'px');
})();