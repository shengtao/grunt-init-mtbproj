;(function(win) {
	var doc = win.document;

	win.helloworld = function() {
		doc.body.innerHTML = '<h1>{%=type%}.<span>{%=name%}</span></h1>';
	}
})(window)