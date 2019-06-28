// 给元素添加可视区域高度并随窗口大小改变而改变
function clientHeight(dom, num) {
	var hh = $(window).height()
	var div = $(dom)
	if (num === undefined) {
		div.height(hh)
	} else if (typeof num === 'number') {
		div.height(hh + num)
	} else if (num.indexOf('-')) {
		div.height(hh - parseFloat(num))
	} else if (num.indexOf('+')) {
		div.height(hh + parseFloat(num))
	} else {
		div.height(hh)
	}
	$(window).resize(function () {
		hh = $(window).height()
		if (num === undefined) {
			div.height(hh)
		} else if (typeof num === 'number') {
			div.height(hh + num)
		} else if (num.indexOf('-')) {
			div.height(hh - parseFloat(num))
		} else if (num.indexOf('+')) {
			div.height(hh + parseFloat(num))
		} else {
			div.height(hh)
		}
	})
}

// 给元素添加可视区域宽度并随窗口大小改变而改变
function clientWidth(dom, num) {
	var ww = $(window).width()
	var div = $(dom)
	if (num === undefined) {
		div.width(ww)
	} else if (typeof num === 'number') {
		div.height(ww + num)
	} else if (num.indexOf('-')) {
		div.width(ww - parseFloat(num))
	} else if (num.indexOf('+')) {
		div.width(ww + parseFloat(num))
	} else {
		div.width(ww)
	}
	$(window).resize(function () {
		ww = $(window).width()
		if (num === undefined) {
			div.width(ww)
		} else if (typeof num === 'number') {
			div.height(ww + num)
		} else if (num.indexOf('-')) {
			div.width(ww - parseFloat(num))
		} else if (num.indexOf('+')) {
			div.width(ww + parseFloat(num))
		} else {
			div.width(ww)
		}
	})
}