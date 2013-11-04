//@require helloworld

;(function(win, {%=type%}){
	var $ = win['Zepto'];

	$(function() {
		{%=type%}.{%=name%}();
	});
})(window, window['{%=type%}'] || (window['{%=type%}'] = {}));