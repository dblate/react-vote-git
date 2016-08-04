import React from 'react';
import {render} from 'react-dom';

// 选项1、选项2....
var OptionDescription = React.createClass({
	render: function () {
		return (
			<input className="optionDescription" placeholder="选项{this.props.serialNumber}"/>
		)
	}
});

// 添加选项按钮
var AddOption = React.createClass({
	render: function () {
		return (
			<a href="javascript:()" className="addOption" onClick={this.handleClick}>添加选项</a>
		)
	}
});

// 完成按钮
var FinishBtn = React.createClass({
	render: function () {
		return (
			<a href="javascript:()" className="finish">完成</a>
		)
	}
});

//增加投票项按钮
var AddVoteBtn = React.createClass({
	render: function () {
		return (
			<a href="javascript:()" class="addVoteBtn">增加投票项</a>
		)
	}
});

// 下拉框的option
var Option = React.createClass({
	render: function () {
		return (
			<option>{this.props.value}</option>
		)
	}
});

var Component = {OptionDescription, AddOption, FinishBtn, Option, AddVoteBtn};
export default Component;
