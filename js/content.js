/**
 * 南湖二楼开敞座位区 区域id: 101699071 座位id: 101699933-101700080
 * 南湖卡座 区域id: 101699071 座位id: 101700081-101700176
 * 南湖分馆一楼中庭开敞座位区 区域id: 101699069 座位id: 101699605-101699776
 * 南湖分馆一楼开敞座位区 区域id: 101699069 座位id: 101699777-101699932
 * 南湖图书馆研讨间 区域id:  房间id: 101697166,101697173,101697177,101697207,101697211,101697215,101697219,101697223
 */
//content.js   manifest匹配地址的页面在刷新时会直接执行这里的代码
console.log('run')

function getNowFormatDate() {
	let date = new Date();
	let seperator1 = "-";
	let seperator2 = ":";
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	
	const addZero = (params) => {
		if (params >= 0 && params <= 9) return '0' + params
		else return params
	}
	
	let currentdate = year + seperator1 + addZero(month) + seperator1 + addZero(strDate) + " " + addZero(date.getHours()) + seperator2 + addZero(date.getMinutes()) + seperator2 + addZero(date.getSeconds());
	return currentdate;
}

const shuffle = (arr) => {
	let len = arr.length, random
	while (len != 0) {
		random = (Math.random() * len--) >>> 0; // 无符号右移位运算符向下取整(注意这里必须加分号，否则报错)
		[arr[len], arr[random]] = [arr[random], arr[len]] // ES6的结构赋值实现变量互换
	}
	return arr
}

const Request = (url, options = {}) => {
	url = `${url}`;
	const isFile = options.body instanceof FormData;
	options.headers = isFile ? {} : {
		Accept: 'application/json', 'Content-Type': 'application/json',
	};
	options.headers.Authorization = localStorage.getItem('token');
	
	if (options.body) {
		options.body = isFile ? options.body : JSON.stringify(options.body);
	}
	return fetch(url, options)
		.then((response) => {
			if (response.ok) {
				return response.json().then((res) => {
					return res;
				});
			} else {
				return response.json().then((res) => {
					return new Promise((_, reject) => {
						reject(res);
					});
				});
			}
		})
		.catch((e) => {
			console.log(`服务端错误：${e.message}`);
			throw e;
		});
};

const Reserve = (area, start, end, date, special) => {
	console.log(special)
	if (!area || !start || !end) {
		alert('注意筛选条件');
		return
	}
	if (start.slice(0, 2) < end.slice(0, 2)) {
		let range = area.split('-')
		const s = start.slice(0, 2) + start.slice(-2)
		const e = end.slice(0, 2) + end.slice(-2)
		let arr = [];
		for (let i = +range[0]; i < +range[1]; ++i) {
			arr.push(i)
		}
		arr = shuffle(arr)
		if (special) {
			Request(`/ClientWeb/pro/ajax/reserve.aspx?dialogid=&dev_id=${special}&lab_id=&kind_id=&room_id=&type=dev&prop=&test_id=&term=&Vnumber=&classkind=&test_name=&start=${date + " " + start}&end=${date + " " + end}&start_time=${s}&end_time=${e}&up_file=&memo=&act=set_resv&_=`).then((res) => {
				console.log(res)
				if (res.msg.includes('操作成功')) {
					alert('定好了')
				} else {
					for (let i = 0; i < arr.length; ++i) {
						Request(`/ClientWeb/pro/ajax/reserve.aspx?dialogid=&dev_id=${arr[i]}&lab_id=&kind_id=&room_id=&type=dev&prop=&test_id=&term=&Vnumber=&classkind=&test_name=&start=${date + " " + start}&end=${date + " " + end}&start_time=${s}&end_time=${e}&up_file=&memo=&act=set_resv&_=`).then((res) => {
							console.log(res)
							if (res.msg.includes('操作成功')) {
								alert('定好了')
							}
						})
					}
				}
			})
		} else {
			for (let i = 0; i < arr.length; ++i) {
				Request(`/ClientWeb/pro/ajax/reserve.aspx?dialogid=&dev_id=${arr[i]}&lab_id=&kind_id=&room_id=&type=dev&prop=&test_id=&term=&Vnumber=&classkind=&test_name=&start=${date + " " + start}&end=${date + " " + end}&start_time=${s}&end_time=${e}&up_file=&memo=&act=set_resv&_=`).then((res) => {
					console.log(res)
					if (res.msg.includes('操作成功')) {
						alert('定好了')
					}
				})
			}
		}
	} else alert('请预约一个小时以上并注意合法时间！')
}

const BookSeminar = (start, end, date, theme, meb0, meb1, meb2) => {
	if (!start || !end) {
		alert('注意筛选条件');
		return
	}
	let arr;
	if (start.slice(0, 2) < end.slice(0, 2)) {
		const s = start.slice(0, 2) + start.slice(-2)
		const e = end.slice(0, 2) + end.slice(-2)
		arr = [101697166, 101697173, 101697177, 101697207, 101697211, 101697215, 101697219, 101697223]
		arr.forEach(event => {
			Request(`/ClientWeb/pro/ajax/reserve.aspx?dialogid=&dev_id=${event}&lab_id=101696913&kind_id=103915683&room_id=&type=dev&prop=&test_id=&term=&Vnumber=&classkind=&test_name=${encodeURI(`${theme}`)}&min_user=3&max_user=4&mb_list=%24${meb0}%2C${meb1}%2C${meb2}&start=${date + " " + start}&end=${date + " " + end}&start_time=${s}&end_time=${e}&up_file=&memo=&act=set_resv&_=`).then((res) => {
				console.log(res)
				if (res.msg.includes('操作成功')) {
					alert('定好了')
				}
			})
			console.log(123)
		})
	} else alert('请预约一个小时以上并注意合法时间！')
}

function getMbid(id) {
	return Request(`/ClientWeb/pro/ajax/data/searchAccount.aspx?type=logonname&ReservaApply=ReservaApply&term=${id}&_=`)
}

chrome.runtime.sendMessage(chrome.runtime.id, {//当页面刷新时发送到bg
	fromContent: 'init'
});
//接收到bg
chrome.runtime.onMessage.addListener(function (senderRequest, sender, sendResponse) {
	sendResponse('这里是content返回值');
	let LocalDB = senderRequest.LocalDB;
	if (LocalDB.Area == "101697166-101697223") {
		if (senderRequest.type === 'now') {
			getMbid(LocalDB.Mb0).then(id0 => {
				getMbid(LocalDB.Mb1).then(id1 => {
					getMbid(LocalDB.Mb2).then(id2 => {
						BookSeminar(LocalDB.Start, LocalDB.End, LocalDB.Date, LocalDB.Theme, id0[0].id, id1[0].id, id2[0].id)
					})
				})
			})
		} else {
			let now = new Date(getNowFormatDate()).getTime();
			let end = new Date(getNowFormatDate().slice(0, 10) + ` 24:00:00`).getTime();
			setTimeout(() => {
				getMbid(LocalDB.Mb0).then(id0 => {
					getMbid(LocalDB.Mb1).then(id1 => {
						getMbid(LocalDB.Mb2).then(id2 => {
							BookSeminar(LocalDB.Start, LocalDB.End, LocalDB.Date, LocalDB.Theme, id0[0].id, id1[0].id, id2[0].id)
						})
					})
				})
			}, end - now)
			alert('预定成功！！')
		}
	} else {
		if (senderRequest.type === 'now') {
			Reserve(LocalDB.Area, LocalDB.Start, LocalDB.End, LocalDB.Date, LocalDB.Special)
		} else {
			let now = new Date(getNowFormatDate()).getTime();
			let end = new Date(getNowFormatDate().slice(0, 10) + ` 18:00:00`).getTime();
			setTimeout(() => {
				Reserve(LocalDB.Area, LocalDB.Start, LocalDB.End, LocalDB.Date, LocalDB.Special)
			}, end - now)
			alert('预定成功！！')
		}
	}
});


const select = document.querySelector('.area');
const date = document.querySelector('.date')
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const now = document.querySelector('.now')
const reserve = document.querySelector('.reserve')
const special = document.querySelector('.special')
const specialBtn = document.querySelector('.special-btn')
const specailArea = document.querySelector(".special-area")


const specailArr = ['2001-2096', "101700081-101700176"]

window.bgCommunicationPort = chrome.runtime.connect();

document.addEventListener("DOMContentLoaded", () => {
	bgCommunicationPort.postMessage({fromPopup: 'init'});
	bgCommunicationPort.onMessage.addListener(function (receivedPortMsg) {//监听background
		if (!receivedPortMsg) return
		if (receivedPortMsg.Area) {
			let options = document.getElementsByTagName('option');
			for (let i = 0; i < options.length; ++i) {
				if (options[i].value === receivedPortMsg.Area) {
					options[i].selected = true
				}
			}
			start.value = receivedPortMsg.Start;
			end.value = receivedPortMsg.End;
			date.value = receivedPortMsg.Date
			if (receivedPortMsg.Special) {
				specailArea.style.display = 'block'
				let temp2 = specailArr[1].split('-')
				for (let i = 0; i < +temp2[1] - (+temp2[0]) + 1; i++) {
					let opt = document.createElement('option');
					;opt.value = `${+temp2[0] + i}`;
					opt.innerHTML = `K${2001 + i}`
					if (opt.value === receivedPortMsg.Special) opt.selected = true
					specailArea.appendChild(opt);
				}
			}
		}
	});
});
