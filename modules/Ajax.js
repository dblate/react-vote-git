class Ajax {
	constructor (obj) {
		console.log('go Ajax');
		let xmlhttp = new XMLHttpRequest();
		let type = obj.type.toLowerCase();
		if (type === 'get') {
			xmlhttp.open('GET', obj.url, true);
			xmlhttp.send();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
					obj.success && obj.success();
				} else {
					obj.error && obj.error();
				}
			}
		} else if (type === 'post') {
			xmlhttp.open('POST', obj.url, true);
			xmlhttp.setRequestHeader('Content-type', 'application/json');
			let postData = this.makePostDataStr(obj.data);
			console.dir(obj.data);
			var testData = 'description=1&option[1]=2&option[2]=3';
			xmlhttp.send(testData);
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
					obj.success && obj.success();
				} else {
					obj.error && obj.error();
				}
			}
		}
	}

	makePostDataStr (dataObj) {
		let postDataStr = '';
		for (let item in dataObj) {
			postDataStr += item + '=' + dataObj[item] + '&';
		}
		// 去除最后一个&
		postDataStr.slice(0, -1);

		return postDataStr;
	}
}

export default Ajax;

