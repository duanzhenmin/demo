/**
 * (c) Copyright 2016 zhenmin. All Rights Reserved.
 */


/**
 * @param {Object} options 
 * el: 挂载元素 （必须项）
 * pre: 上一个月
 * next: 下一个月
 * nowDate: 默认日期
 * minDate: 最小日期
 * maxDate: 最大日期
 * even: 触发事件
 * evenFn: function(data) { data } 回调函数
 * loadEnd: function(data) { data } 日历渲染完成回调函数
 */

/*new MyDate({
	el: "#MyDate",
	pre: ".pre",
	next: ".next",
	nowDate: "2016-12-12",
	minDate: "2016-7",
	maxDate: "2017-7",
	even: "click",
	evenFn: function(data) {
		//code
	},
	loadEnd: function(date) {
		//code
	}
});*/
function MyDate(options) {
	if(!options.el) {
		return false;
	}

	this.oDate = new Date();
	this.year = this.oDate.getFullYear();
	this.month = this.oDate.getMonth() + 1;
	this.minYear = 1970;
	this.minMonth = 1;
	this.maxYear = 2099;
	this.maxMonth = 12;

	if(options.minDate) {
		this.minYear = parseInt(options.minDate.split("-")[0]);
		this.minMonth = parseInt(options.minDate.split("-")[1]);
	}

	if(options.maxDate) {
		this.maxYear = parseInt(options.maxDate.split("-")[0]);
		this.maxMonth = parseInt(options.maxDate.split("-")[1]);
	}

	if(this.minYear > this.maxYear) {
		return false;
	} else if((this.minYear == this.maxYear) && (this.minMonth > this.maxMonth)) {
		return false;
	}

	this.lastDate = 0;

	var that = this;
	if(options.pre) {
		if(window.addEventListener) {
			document.querySelector(options.pre).addEventListener("click", function(ev) {
				that.month--;
				if(that.month < 1) {
					that.month = 12;
					that.year--;
				}
				options.nowDate = that.year + "-" + that.month + "-" + that.DD;
				that.init(options);
			}, false)
		} else {
			document.querySelector(options.pre).attachEvent("onclick", function(ev) {
				that.month--;
				if(that.month < 1) {
					that.month = 12;
					that.YY--;
				}
				options.nowDate = that.year + "-" + that.month + "-" + that.DD;
				that.init(options);
			});
		};
	}
	if(options.next) {
		if(window.addEventListener) {
			document.querySelector(options.next).addEventListener("click", function(ev) {
				that.month++;
				if(that.month > 12) {
					that.month = 1;
					that.year++;
				}
				options.nowDate = that.year + "-" + that.month + "-" + that.DD;
				that.init(options);
			}, false)
		} else {
			document.querySelector(options.next).attachEvent("onclick", function(ev) {
				that.month++;
				if(that.month > 12) {
					that.month = 1;
					that.year++;
				}
				options.nowDate = that.year + "-" + that.month + "-" + that.DD;
				that.init(options);
			});
		};
	}

	//循环次数
	this.x = 7;
	this.y = 6;

	this.init(options);
}

MyDate.prototype.init = function(options) {
	if(options.nowDate) {
		this.year = parseInt(options.nowDate.split("-")[0]);
		this.month = parseInt(options.nowDate.split("-")[1]);
	}

	if(this.year < this.minYear) {
		this.year = this.minYear;
		this.month = this.minMonth;
	} else if((this.year == this.minYear) && (this.month < this.minMonth)) {
		this.year = this.minYear;
		this.month = this.minMonth;
	}

	if(this.year > this.maxYear) {
		this.year = this.maxYear;
		this.month = this.maxMonth;
	} else if((this.year == this.maxYear) && (this.month > this.maxMonth)) {
		this.year = this.maxYear;
		this.month = this.maxMonth;
	}

	this.YY = this.year;
	this.MM = this.month - 1;
	this.DD = this.oDate.getDate();
	if(options.nowDate) {
		if(options.nowDate.split("-")[2]) {
			this.DD = parseInt(options.nowDate.split("-")[2]);
		}
	}

	this.oDate.setFullYear(this.YY, this.MM, 1);
	this.firstDay = this.oDate.getDay();

	this.oDate.setDate(0);
	this.preLastDate = this.oDate.getDate();

	this.createdTable(options);
	this.setLastDate(options);
	this.fillDate(options);
}

MyDate.prototype.createdTable = function(options) {
	this.container = document.querySelector(options.el);
	this.container.innerHTML = "";
	var oTable = document.createElement("div");
	oTable.className = "table";
	oTable.innerHTML = "<ul class='thead clearfix'>" +
							"<li>星期日</li>" +
							"<li>星期一</li>" +
							"<li>星期二</li>" +
							"<li>星期三</li>" +
							"<li>星期四</li>" +
							"<li>星期五</li>" +
							"<li>星期六</li>" +
						"</ul>" +
						"<div class='tbody'></div>";
	this.container.appendChild(oTable);
}

MyDate.prototype.setLastDate = function(options) {
	if((this.MM == 0) || (this.MM == 2) || (this.MM == 4) || (this.MM == 6) || (this.MM == 7) || (this.MM == 9) || (this.MM == 11)) {
		this.lastDate = 31;
	} else if(this.MM != 1) {
		this.lastDate = 30;
	} else if(this.MM == 1) {
		this.YY % 4 ? this.lastDate = 28 : this.lastDate = 29;
	}
}

MyDate.prototype.fillDate = function(options) {
	var disDate = this.firstDay;
	var con = 1;

	var that = this;

	var content = document.querySelector(options.el + " .tbody");
	options.even = options.even || "click";
	if(window.addEventListener) {
		content.addEventListener(options.even, function(ev) {
			var oEvent = ev || event;
			options.evenFn && options.evenFn({
				time: that.YY + "-" + (that.MM + 1) + "-" + oEvent.target.innerText,
				data: []
			});
		}, false)
	} else {
		content.attachEvent("on" + options.even, function(ev) {
			var oEvent = ev || event;
			options.evenFn && options.evenFn({
				time: that.YY + "-" + (that.MM + 1) + "-" + oEvent.target.innerText,
				data: []
			});
		});
	};
	content.innerHTML = "";
	for(var i = 0; i < this.y; i++) {
		var oTr = document.createElement("ul");
		oTr.className = "clearfix";
		for(var j = 0; j < this.x; j++) {
			if(con <= disDate) {
				oTr.innerHTML += "<li class='my-date-pre'>" + (this.preLastDate + (con - disDate)) + "</li>";
			} else if(con > (this.lastDate + disDate)) {
				oTr.innerHTML += "<li class='my-date-next'>" + (con - (this.lastDate + disDate)) + "</li>";
			} else {
				if((con - disDate) == this.DD) {
					oTr.innerHTML += "<li class='my-date-cur my-date-now'>" + (con - disDate) + "</li>";
				} else {
					oTr.innerHTML += "<li class='my-date-cur'>" + (con - disDate) + "</li>";
				}
			}
			con++;

			if((i >= this.y - 1) && (j >= this.x - 1)) {
				options.loadEnd && options.loadEnd(this.YY + "-" + (this.MM + 1) + "-" + this.DD);
			}
		}
		content.appendChild(oTr);
	}
}