(function($){
	$('#close-shout').click(function(){
		$(this).parent().toggleClass('hide');
	});
	
	$('#show-all').click(function(){
		$(this).toggleClass('icon-minus','icon-plus');
		var frontendList = $(".frontendlist li").toArray();
		var backendList = $(".backendlist li").toArray();
		var i = 0;
		var firstInterval = setInterval(function() { 
			$(frontendList[i]).toggleClass('show');
			i++; 
			if(i >= frontendList.length) clearInterval(firstInterval);
		}, 100);
		var j = 0;
		var secondInterval = setInterval(function() { 
			$(backendList[j]).toggleClass('show');
			j++; 
			if(j >= backendList.length) clearInterval(secondInterval);
		}, 110);	
		
		return false;
		
	});
		  
})(jQuery);