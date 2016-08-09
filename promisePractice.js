var xmlhttp;
function loadXMLDoc (url) {
	xmlhttp = null;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest()
	} else if (window.ActiveXObject) {
		xmlhttp = new ActiveXobject();
	}

	if (xmlhttp !== null) {
		xmlhttp.open('GET', url, true);
		xmlhttp.send();

		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				console.log('do something...');
			}
		}
	}
}

function ajax(obj) {
	var xmlhttp = new XMLHttpRequest();
	var type = obj.type.toLowerCase();
	if (type == 'get') {
		xmlhttp.open('GET', obj.url, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.status === 200 && xmlhttp.reaydSatet === 4) {
				obj.success();
			} else {
				obj.error && obj.error();
			}
		}
	} else if (type === 'post') {
		xmlhttp.open('POST', obj.url, true);
		xmlhttp.setRequestHeader('Content-type', 'application/json');
		xmlhttp.send(obj.data);

		XMLHttpRequest.onreadystatechange = function () {
			if (xmlhttp.status === 200 && xmlhttp.reaydSatet === 4) {
				obj.success();
			} else {
				obj.error && obj.error();
			}
		}
	}
}

function marry () {
	ajax({
		type: 'Get',
		url: 'yuefu',
		success: function () {
			ajax({
				type: 'GET',
				url: 'dabo',
				success: function () {
					ajax({
						type: 'GET',
						url: 'dagu',
						success: function () {
							ajax({
								type: 'GET',
								url: 'girl',
								success: function () {
									console.log('goMarry');
								},
								error: function () {
									console.log('agagin..');
								}
							})
						}
					})
				},
				error: function () {
					console.log('again...');
				}
			})
		},
		error: function () {
			ajax({
				type: 'GET',
				url: 'yuefu',
				success: function () {
					console.log('continue...');
				},
				error: function () {
					console.log('failed...');
				}
			})
		}
	})
}