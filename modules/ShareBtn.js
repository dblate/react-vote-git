import React from 'react'
import {render} from 'react-dom'
// import QRCode from './qrcode.js'
var QRCode = require('./qrcode.js')

// 分享按钮
var ShareBtn = React.createClass({
	getInitialState: function () {
		return {
			hasMadeQrcode: false
		}
	},
	shareToWeChat: function () {
		var shareToWeChatBox = document.querySelector('#shareToWeChatBox');
		var forSharpCorner = document.querySelector('.forSharpCorner');
		if (!this.state.hasMadeQrcode) {
			var qrcode = new QRCode(shareToWeChatBox, {
				width: 180,
				height: 180
			});
			var url = window.location.href;
			qrcode.makeCode(url);
			this.setState({
				hasMadeQrcode: true
			});
		}
		forSharpCorner.style.display = 'block';
	},
	render: function () {
		return (
			<a href="javascript:;" className="share" onClick={this.shareToWeChat}>分享到微信</a>
		)
	}
});

export default ShareBtn;