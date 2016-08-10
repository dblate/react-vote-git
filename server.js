var express = require('express');
var path = require('path');
var compression = require('compression');
var bodyParser = require('body-parser');

var app = express()

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

// send all requests to index.html so browserHistory works
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

function sum (arr) {
	return eval(arr.join('+'));
}

function average (arr) {
	return (sum(arr)/arr.length).toFixed(2);
}

app.get('/operation/getTest', function (req, res) {
	console.log('req.query.name=' + req.query.name);
	res.send('nihao');
});

// 前端分享，后端创建投票页
app.post('/operation/share', function (req, res) {
	console.dir(req.body);
	// res.render('votePage.ejs', {theme: req.body.theme});
	res.send(req.body);
});

// 提交投票
var resultPageData = [];
app.post('/operation/vote', function (req, res) {
	var	result = req.params.result;
	resultPageData.forEach(function (item, index, arr) {
		if (item && item.description === result.description) {
			// 已有时，追加value值，以及改变total和average的值
			item.valueArr.push(result.value);
			item.total = sum(item.valueArr);
			item.average = average(item.valueArr);
		} else {
			// 不存在该投票项时，新建对象
			var tempObj = {};
			tempObj.description = result.description;
			tempObj.valueArr = [result.value];
			tempObj.total = result.value;
			tempObj.average = result.value;

			arr.push(tempObj);
		}
	});

	res.render('./template/result.ejs', resultPageData);
});


var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
