'use strict';
$(function() {
	function resize() {
		// 1.获取屏幕宽度
		var $windowWidth = $(window).width();
		// 2.判断屏幕的尺寸，属于pc还是移动端（大小）
		var $isSmallScreen = $windowWidth < 768;
		// 3.根据大小为界面上的每一张轮播图设置背景图片
		var $items = $("#main_id>#myCarousel>.carousel-inner>.item");
		$items.each(function(i,item) {
			var $item = $(item);// 因为获取的是dom对象，需要转换.
			var imgSrc = $item.data($isSmallScreen?'image-xs':'image-lg');
			$item.css("backgroundImage",'url("'+imgSrc+'")');
			if($isSmallScreen){
				$item.html('<img src="'+imgSrc+'" alt="图片" />');
			}else{
				$item.empty();
			}
		});
	}
	$(window).on("resize",resize).trigger("resize");
	// trigger("resize")直接执行一次这个函数。
	// 提示框效果
	$('[data-toggle="tooltip"]').tooltip();
	// 控制标签页的宽度
	var $ulContainer = $(".nav-tabs");
	var width =30;
	//console.log($ulContainer.children());
	$ulContainer.children().each(function(index,element) {
		// console.log(element.clientWidth);DOM对象原生js
		// console.log($(element).width());jQuery对象
		width += element.clientWidth;
	});
	// 此时width的值为所有li宽度的总和。
	if(width>$(window).width()){
		$ulContainer.css("width",width).parent().css("overflow-x","scroll");
	}
	var $newsTitle = $(".news-title");
	$("#news .nav-stacked a").on("click",function() {
		$newsTitle.text($(this).data("title"));
	});
	// 移动端的图片滑动处理
	var $carousels = $(".carousel");
	var startX,endX;
	var offset = 50;
	$carousels.on("touchstart",function(e) {
		startX = e.originalEvent.touches[0].clientX;
		// console.log(startX);
	});
	$carousels.on("touchmove",function(e) {
		endX = e.originalEvent.touches[0].clientX;
		// console.log(endX);
	});
	$carousels.on("touchend",function(e) {
		// console.log(endX);
		// console.log(startX > endX ? "←":"→");
		var distance = Math.abs(startX-endX);
		if(distance>=offset){
			$(this).carousel(startX > endX ? "next":"prev")
		}
	});
});