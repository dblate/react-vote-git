class Ajax {
	constructor (obj) {
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
		} else if (type === 'POST') {
			xmlhttp.open('POST', obj.url, true);
			xmlhttp.sendRequestHeader('Content-type', 'application/json');
			let postData = this.makePostDataStr(obj.data);
			xmlhttp.send(postData);
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

