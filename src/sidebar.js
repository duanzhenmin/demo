function IndexSideBar(callback) {
	if(callback == undefined) return false;
	this.letter = ['*', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
	this.el = '';
	this.fn = callback;
	this.currentletter = '';
	this.indexletter = '';
	this.indexletterhtml = '';
	this.currentpositionY = 0;
	this.children = '';
	this.eltop = 0;
	this.elheight = 0;
	this.childrenHeight = 0;
	this.time = null;
	this.init();
}
IndexSideBar.prototype.init = function() {
	var oDiv = document.createElement('div');
	var oLi = '';
	oDiv.setAttribute('style', 'position: fixed;top: 0;bottom:0;right: 0;margin: auto;height:80%;');
	oDiv.classList.add('indexsidebar');
	document.querySelector('body').appendChild(oDiv);
	this.el = document.querySelector('.indexsidebar');
	this.elheight = this.el.offsetHeight;
	this.eltop = this.el.offsetTop;
	var oSpan = document.createElement('span');
	oSpan.setAttribute('style', 'position:fixed;left:0;top:160px;right:0;margin:auto;z-index:999999999;width:25px;height:25px;text-align:center;line-height:25px;background:#ccc;border-radius:50%;color:#666;font-size:18px;opacity:0;-webkit-transition: 0.3s ease opacity;-moz-transition: 0.3s ease opacity;-ms-transition: 0.3s ease opacity;-o-transition: 0.3s ease opacity;transition: 0.3s ease opacity;');
	this.el.appendChild(oSpan);
	var oUl = document.createElement('ul');
	var h = this.elheight / this.letter.length;
	oUl.setAttribute('style', 'width:24px;height:100%;text-align: center;font-size: 12px;color:#666;');
	this.el.appendChild(oUl);
	for(var i = 0; i < this.letter.length; i++) {
		oLi = document.createElement('li');
		oLi.setAttribute('style', 'width:24px;height:' + h + 'px;text-align: center;line-height: ' + h + ' px;');
		oLi.innerHTML = this.letter[i];
		this.el.children[1].appendChild(oLi);
	}
	this.indexletterhtml = this.el.children[0];
	this.children = this.el.children[1].children;
	this.childrenHeight = this.el.children[1].offsetHeight / this.children.length;
	this.getIndexLetter();
}
IndexSideBar.prototype.getIndexLetter = function() {
	var _this = this;
	this.el.addEventListener('touchstart', function(e) {
		_this.currentletter = e.srcElement.innerHTML;
		_this.fnTouchMove(e);

		function fnmove(e) {
			var touchHeight = 7;
			_this.currentpositionY = e.touches[0].clientY;
			//e.touches[0].radiusY  -->  手指触摸屏幕区域的高（e.touches[0].radiusX  -->  手指触摸屏幕区域的宽）
			if(e.touches[0].radiusY / 2) touchHeight = e.touches[0].radiusY / 2; 
			var indexNumber = Math.round((_this.currentpositionY - _this.eltop - touchHeight) / _this.childrenHeight);
			if(0 <= indexNumber && indexNumber < _this.letter.length) {
				_this.currentletter = _this.letter[indexNumber];
				_this.fnTouchMove(e);
			}
			e.preventDefault();
		}

		function fnend() {
			document.removeEventListener('touchmove', fnmove);
			document.removeEventListener('touchend', fnend);
		}
		document.addEventListener('touchmove', fnmove, false);
		document.addEventListener('touchend', fnend, false);

	}, false);
}
IndexSideBar.prototype.fnTouchMove = function(e) {
	if(this.indexletter == this.currentletter) return false;
	this.indexletter = this.currentletter;
	this.indexletterhtml.innerHTML = this.indexletter;
	this.indexletterhtml.style.opacity = '1';
	var _this = this;
	clearTimeout(this.time);
	this.time = setTimeout(function() {
		_this.indexletterhtml.style.opacity = '0';
	}, 600);
	this.fn(this.indexletter);
}

new IndexSideBar(function(indexletter) {
	//indexletter当前选择的索引字母
	if(document.querySelector('li[data-index=' + indexletter + ']')) {
		var offsettop = document.querySelector('li[data-index=' + indexletter + ']').offsetTop;
		document.body.scrollTop = offsettop;
	}
});