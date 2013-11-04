;(function(win, {%=type%}) {
	var $ = win['Zepto'];

	{%=type%}.{%=name%} = function() {
		$(document.body).html('<h1>{%=type%}.<span>{%=name%}</span></h1>');
	}
})(window, window['{%=type%}'] || (window['{%=type%}'] = {}))