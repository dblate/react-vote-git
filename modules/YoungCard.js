import React from 'react'
import {render} from 'react-dom'
// import {OptionDescription, AddOption, FinishBtn, Option} from './components.js'

// 该类投票项的描述
var Description = React.createClass({
	render: function () {
		return (
			<input className="onlyBottomBorderInput description" placeholder="请填写该类投票项描述" onChange={this.props.handleChange}/>
		)
	}
});

// 选项1、选项2....
var OptionDescription = React.createClass({
	render: function () {
		return (
			<input className="optionDescription onlyBottomBorderInput" placeholder={this.props.placeholder} serialNumber={this.props.serialNumber} onChange={this.props.handleChange}/>
		)
	}
});

// 添加选项按钮
var AddOption = React.createClass({
	render: function () {
		return (
			<a href="javascript:;" className="addOption btn-primary" onClick={this.props.handleClick}>添加选项</a>
		)
	}
});

// 完成按钮
var FinishBtn = React.createClass({
	render: function () {
		return (
			<a href="javascript:;" className="finish btn-primary" onClick={this.props.handleClick}>完成</a>
		)
	}
});

//增加投票项按钮
var AddVoteBtn = React.createClass({
	render: function () {
		return (
			<a href="javascript:;" className="addVoteBtn btn-primary">增加投票项</a>
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

var YoungCard = React.createClass({
	getInitialState: function () {
		return {
			total: 2,
			description: '不填描述投个j b!',
			optionValueArr: [],
			finish: false
		}
	},
	addOption: function () {
		this.setState({
			total: this.state.total+1
		});
	},
	descriptionChange: function (e) {
		this.setState({
			description: e.target.value
		})
	},
	optionDescriptionChange: function (e) {
		let i = parseInt(e.target.getAttribute('placeholder').slice(2), 10);
		let value = e.target.value;
		this.state.optionValueArr[i] = value;
	},
	delete: function (e) {
		e.target.parentNode.remove();
	},
	finish: function () {
		this.setState({
			finish: true
		});
	},
	render () {
		if (this.state.finish) {
			let optionNodes = [];
			for (let i = 0; i < this.state.total; i++) {
				optionNodes.push(<option value={this.state.optionValueArr[i]}>{this.state.optionValueArr[i]}</option>);
			}
			return (
				<div className="oldCard">
					<a href="javascript:;" className="delete" onClick={this.delete}></a>
					<div className="oldDescription">{this.state.description}</div>
					<select>
						{optionNodes}
					</select>
				</div>
			)
		} else {
			let optionNodes = [];
			for (let i = 0; i < this.state.total; i++) {
				let placeholderStr = '选项' + i;
				optionNodes.push(<OptionDescription serialNumber={i} placeholder={placeholderStr} handleChange={this.optionDescriptionChange}/>);
			}
			return (
				<div className="youngCard">
					<Description handleChange={this.descriptionChange}/>
					{optionNodes}
					<AddOption handleClick={this.addOption}>添加选项</AddOption>
					<FinishBtn handleClick={this.finish}>完成</FinishBtn>
				</div>
			)
		}
	}
});

export default YoungCard;