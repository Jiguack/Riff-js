//
// Framework 0.98
//
// Copyright 2010, Licensed under the MIT license.
// http://innovator.samsungmobile.com/
//
//

/* @Framework_Ver 0.98 */

$( function (){

	// Global setting
	$.globalSetting ({
		"softkeyType" : "type1",
		"softkeyData" : softKeyData
	});

	$("#idlego").tap(function(){ $.go("#index"); });

	// Scene Navi
	$("#goComponent").tap(		function(){ $.go("#sComponent"); });
	$("#goDataProcessing").tap(	function(){ $.go("#sDataProcessing"); });

	$("#goTransition").tap(		function(){ $.go("sTransition"); });
	$("#goSlideVer").tap(		function(){ $.go("effectArea", {"transEffect" : "slideVer"}); });
	$("#goSlideHor").tap(		function(){ $.go("effectArea", {"transEffect" : "slideHor"}); });
	$("#goFade").tap(			function(){ $.go("effectArea", {"transEffect" : "fade"}); });
	$("#goPop").tap(			function(){ $.go("effectArea", {"transEffect" : "pop"}); });
	$("#goSpin").tap(			function(){ $.go("effectArea", {"transEffect" : "spin"}); });
	$("#btnEffBack").tap(		function(){ $.back(); });

	$("#goTouchEvent").tap(		function(){ $.go("#sTouchEvent"); });
	$("#goTextList").tap(		function(){ $.go("#sTextList"); });
	$("#goImageList").tap(		function(){ $.go("#sImageList"); });
	$("#goIconList").tap(		function(){ $.go("#sIconList"); });
	$("#goAccordion").tap(		function(){ $.go("#sAccordion"); });
	$("#goTab").tap(			function(){ $.go("#sTab"); });
	$("#goPageControl").tap(	function(){ $.go("#sPageControl"); });
	$("#goTextPage").tap(		function(){ $.go("#sTextPage"); });
	$("#goTap").tap(			function(){ $.go("#sTap"); });
	$("#goFlick").tap(			function(){ $.go("#sFlick"); });
	$("#goSwipe").tap(			function(){ $.go("#sSwipe"); });
	$("#goDnd").tap(			function(){ $.go("#sDnd"); });

	//touch event
	$(".swipeExBox").swipe(true,50,function(){})
	$(".touchExBox").touchStart(function(){ $(this).addClass("on"); });
	$(".touchExBox").touchEnd(function(){ $(this).removeClass("on"); });
	$(".exTap").tap(function(){ $.alert("tap"); });
	$(".exLongTap").longTap(function(){ $.alert("Long Tap"); });
	$(".exDoubleTap").doubleTap(function(){ $.alert("Double Tap"); });
	$(".flickExBox").flickLeft(function(){ $.alert("Flick Left"); });
	$(".flickExBox").flickRight(function(){ $.alert("Flick Right"); });
	$(".flickExBox").flickUp(function(){ $.alert("Flick Top"); });
	$(".flickExBox").flickDown(function(){ $.alert("Flick Bottom"); });
	$("#dragBox").dragDrop(function(){ $.alert("DnD"); },false,dropBox);

	$("#goPopup").tap(function(){
		$.go("#popup1")
	});

	//data processing
	$("#goUserSetting").tap(function(){ $.go("#sUserSetting");});
	$("#setting").data(settingListData);
	$("#goRssData").tap(function(){ $.go("#sRssData"); });
	$("#goRssPageControl").tap(function(){ $.go("#sRssPageControl"); });
	$("#goRssTab").tap(function(){ $.go("#sRssTab"); });
	$("#goRssList").tap(function(){ $.go("#sRssList"); });

	$("#setTransList").data( setTransListData );
	$("#setThemeList").data( setThemeListData );
	$("#rssPageControl").rss( rssPageControlData );
	$("#rssTab").rss( rssTabData );
	$("#rssList").rss( rssListData );

	$(".btn").option({
		'fontSize':'small',
		'fontColor':'#eaeaea',

	});

	$(".title").option({
		"shadow":"true",
	})

	$(".pageControl").option({
				"background" : ["color", "red"]
	});


	$(".title").option({
				"background" : ["gradient", "from(#ba3939), to(#751919)"]
	});

});


