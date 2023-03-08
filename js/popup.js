const select = document.querySelector('.area');
const date = document.querySelector('.date')
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const now = document.querySelector('.now')
const reserve = document.querySelector('.reserve')
const seminar = document.querySelector('.seminar')
const seminar2 = document.querySelector('.seminar2')
const theme = document.querySelector(".theme")
const mb0 = document.querySelector(".mb0")
const mb1 = document.querySelector(".mb1")
const mb2 = document.querySelector(".mb2")
const m0b = document.querySelector(".m0b")
const m1b = document.querySelector(".m1b")
const m2b = document.querySelector(".m2b")

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
		}
	});
});

select.addEventListener('change', (e) => {
	if (e.target.value == "101697166-101697223") {
		seminar.style.cssText = ""
		seminar2.style.cssText = "display: none;"
		reserve.innerHTML = "0点开抢"
	}
	bgCommunicationPort.postMessage({ //发送到bg,键值可以自由设置
		Area: e.target.value,//内容
	});
})

date.addEventListener('change', (e) => {
	bgCommunicationPort.postMessage({
		Date: e.target.value
	})
})

start.addEventListener('change', (e) => {
	bgCommunicationPort.postMessage({
		Start: e.target.value
	})
})

end.addEventListener('change', (e) => {
	bgCommunicationPort.postMessage({
		End: e.target.value
	})
})

now.addEventListener('click', () => {
	bgCommunicationPort.postMessage({
		isReady: true,
		type: 'now'
	})
})

reserve.addEventListener('click', () => {
	bgCommunicationPort.postMessage({
		isReady: true,
		type: 'reserve'
	})
})

mb0.addEventListener('input', (e) => {
	bgCommunicationPort.postMessage({
		Mb0: e.target.value
	})
})

mb2.addEventListener('input', (e) => {
	bgCommunicationPort.postMessage({
		Mb2: e.target.value
	})
})
mb1.addEventListener('input', (e) => {
	bgCommunicationPort.postMessage({
		Mb1: e.target.value
	})
})

theme.addEventListener('input', (e) => {
	bgCommunicationPort.postMessage({
		Theme: e.target.value
	})
})

