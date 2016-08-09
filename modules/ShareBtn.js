import React from 'react'
import {render} from 'react-dom'
import Ajax from './Ajax.js'
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
		// 弹出二维码
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

		// 发送数据到服务器
		var $ = document.querySelector;
		var $$ = document.querySelectorAll;
		var postData = {};
		postData.theme = $('.theme textarea').value();
		postData.cards = [];
		$$('.oldCard').forEach(function (item, index, arr) {
			let tempObj = {};
			// let tempArr = [];
			let options = item.querySelectorAll('option');
			// tempArr.push(options.map((item) => {item.innerText}));
			tempObj.optionArr = options.map((item) => {item.innerText})
			tempObj.description = item.querySelector('.oldDescription').innerText;
			postData.cards.push(tempObj);
		});

		var shareAjax = new Ajax({
			url: '/option/share',
			type: 'POST',
			data: {
				data: postData
			},
			success: function () {},
			error: function () {
				alert('分享出错..联系研发哥哥..');
			}
		})
	},
	render: function () {
		return (
			<a href="javascript:;" className="share" onClick={this.shareToWeChat}>分享到微信</a>
		)
	}
});

export default ShareBtn;