//@require helloworld

;(function(win){
	var doc = win.document;

	doc.addEventListener('DOMContentLoaded', function() {
		win.helloworld();
	});
})(window);