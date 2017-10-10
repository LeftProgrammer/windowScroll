(function(fn){
	if(jQuery) fn(jQuery, window); else throw new Error('Please confirm whether the loaded jQuery!');
})(function($, wd){
	setTimeout(function(){$(document).scrollTop(0)},50);

	var scrollDom = $('#scrollDom'),				// animate body
		animateDom = scrollDom.find('> div')		// animate DOM
		navLi = $("div.nav ul li"),					// top nav
		slideLi = $("div.slide li"),				// left nav
		bor = $("div.bor");

	var index = yindex = 0;			//index => nowaday DOM, yindex => previous DOM
	var Time = new Date();

	scrollDom.css('height','auto')

	/*animateCofig start*/
	var animateCofig = []

	/*
	{
		dom:animateDom.eq(0).find('> .an1'),	//动画元素
		start:{left:'0'},						//动画初始对象
		end:{left:'400px'},						//动画结束对象
		fnStart:function(){},					//动画初始调用函数
		fnEnd:function(){},						//动画结束调研函数
		atime:200,								//动画返回初始对象所需要时间
		toTime:1400,							//动画到结束对象所需要时间
		setTime:100 							//动画延迟时间
	}
	*/

	animateCofig[0] = [
		{
			dom:animateDom.eq(0).find('> .an1'),
			start:{left:'0'},
			end:{left:'400px'},
			atime:200,
			toTime:1400,
			setTime:400
		}
	]

	animateCofig[1] = [
		{
			dom:animateDom.eq(1).find('> .an1'),
			start:{bottom:'-50px'},
			end:{bottom:'400px'},
			atime:200,
			toTime:1400,
			setTime:1000
		}
	]

	animateCofig[3] = [
		{
			dom:animateDom.eq(3).find('> .an1'),
			start:{top:'-50px'},
			end:{top:'400px'},
			atime:200,
			toTime:1400
		}
	]

	// inite aniamate
	for (var i = 0; i < animateCofig.length; i++) {
		if(!animateCofig[i]) continue;
		for (var j = 0; j < animateCofig[i].length; j++) {
			var d = animateCofig[i][j];
			d.dom.css(d.start)
		}
	}

	// first aniamte
	scrollAnimate(0);

	// animate function
	function scrollAnimate(n){
		var ar = animateCofig[n] || 0, yar = animateCofig[yindex] || 0;

		for (var i = 0; i < ar.length; i++) {
			var d = ar[i];
			if(d.setTime){
				d.tout = setTimeout(function(d){
					d.dom.stop().animate(d.end,d.toTime);
				}, d.setTime, d);
			}else{
				d.dom.stop().animate(d.end,d.toTime);
			}
			d.fnEnd && d.fnEnd();
		}
		for (var i = 0; i < yar.length && yindex != n; i++) {
			var d = yar[i];
			if(d.tout) clearTimeout(d.tout);
			d.dom.stop().animate(d.start,d.aTime);
			d.fnStart && d.fnStart();
		}

		if(yindex != n) yindex = n;
	}

	/*animateConfig end*/

	/*event start*/
	setAnimateBoxHeight();

	$(wd).resize(setAnimateBoxHeight);

	function setAnimateBoxHeight(){
		scrollDom.find('>div').css('height',$(wd).height())
	}
	
	navLi.mouseenter(function(){
		$(this).addClass("no").siblings().removeClass("no");
		bor.stop(true).animate({
				left:$(this).position().left + 38 + "px",
				width:$(this).width() + 28 + "px"
			},400);
	});

	$("div.nav").mouseleave(function(){
		navLi.eq(index).addClass("no").siblings().removeClass("no");
		bor.animate({
					left:navLi.eq(index).position().left + 38 + "px",
					width:navLi.eq(index).width() + 28 + "px"
				},400);
	});

	navLi.click(slideTo);

	slideLi.click(slideTo);

	$(document).mousewheel(function(e){
		e.preventDefault()
		e.returnValue = false

		if(new Date()-Time > 800){
			Time = new Date();
			var dWheel = arguments[1];
			var winH = $(wd).height();
			
			if(dWheel < 0){
				index++;
				
				index %= 4; 
			}else{
				index--;
				if(index < 0){index = slideLi.length-1;}
			}

			slideTo(e, index);
		}
	});

	function slideTo(e, idx){
		var winH = $(wd).height();
		if(idx == undefined){
			index = $(this).index();
		}
		slideLi.eq(index).addClass("no").siblings().removeClass("no");
		
		scrollDom.animate({'top':-index*winH+"px"},800);
		bor.animate({
					left:navLi.eq(index).position().left+38+"px",
					width:navLi.eq(index).width()+28+"px"
				},400);

		scrollAnimate(index);
	}
	/*event end*/

})
