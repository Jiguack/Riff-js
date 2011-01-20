//
// Framework 0.98
//
// Copyright 2010, Licensed under the MIT license.
// http://innovator.samsungmobile.com/
//
//

/* @Framework_Ver 0.98 */

// Basic riff Object Component

//h className�� ���� �ƴ� DOM Element �� ��� ȣ��Ǹ� Ÿ���� object�� �����Ѵ�.
var riffBasic = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "object";
}

// riff Idle Component
//h className = idle �� DOM Element �� ��� ȣ��Ǿ� Ÿ���� idle ���� �����Ѵ�.
var ComponentIdle = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "idle";
}

//h idle�� ��Ҹ� �������� ����
ComponentIdle.prototype.makeStructs = function ()
{
	var riffThis = riff(this);

	var idleString = "";
	idleString += "<div class='article' style='margin-top:50px;'>";
	idleString += "article";
	idleString += "</div>";

	idleString += "<div class='idle_categoryleft' style='float:left; margin-right:20px;'>";
	idleString += "category left  ";
	idleString += "</div>";

	idleString += "<div class='idle_categoryright' >";
	idleString += "category right";
	idleString += "</div>";

	idleString += "<div class='idle_left' style='float:left;margin-right:20px;'>";
	idleString += "left";
	idleString += "</div>";

	idleString += "<div class='idle_right' style='float:left;margin-right:20px;'>";
	idleString += "right";
	idleString += "</div>";

	idleString += "<div class='idle_refresh'>";
	idleString += "refresh";
	idleString += "</div>";

	//h Idle ���� div
	riffThis.prepend(idleString);

	//h idle�� busyIndicator, alert, ����
	riffThis.prepend("<div class='popup'></div>");
	riffThis.append('<div class="blackBlank"></div>'); // Black Blank Element
	riffThis.append('<div class="whiteBlank"></div>'); // Black Blank Element
	riff('#idle .blackBlank')
	.before('<div class="popup" id="busyIndicator"><div class="busyIndicator type1"></div><div class="busyIndicatorTxt">Loading, Please wait...</div></div>')
	.before('<div class="popup" id="alert"></div>');

	riff("#idle .popup").css("width",riff("#idle").width()+"px").css("height",riff("#idle").height()+"px");

	//h idle ��Ʈ�� �κ�
	riff(".article").tap( function() { riff.move("#sRssTab"); } );
	riff(".idle_categoryleft").tap( function () { riffThis.moveRSSArticle("categoryLeft") } );
	riff(".idle_categoryright").tap( function () { riffThis.moveRSSArticle("categoryRight") } );
	riff(".idle_left").tap( function () { riffThis.moveRSSArticle("left") } );
	riff(".idle_right").tap( function () { riffThis.moveRSSArticle("right") } );
	riff(".idle_refresh").tap( function () { riffThis.moveRSSArticle("refresh") } );
}

ComponentIdle.prototype.makeContents = function ()
{

}

/*
  idle�� �ִ� �͵��� �̵�
  @param
    _move : "left", "right", "categoryLeft", "categoryRight", (number)
 */
ComponentIdle.prototype.moveRSSArticle = function ( _move )
{
	var riffThis = riff(this);

	var rssComponent = riffThis.buffer("ComponentDataRSSComponent");
	if( !rssComponent )
		return;

	var componentObject = rssComponent.component();
	if( !componentObject )
		return;

	//h Ÿ���� tab�� ���
	if ( componentObject.type == "tab" )
	{
		//h refresh �̺�Ʈ 
		if(_move == "refresh")	{
			var tabID = riffThis.buffer("ComponentDataRSSComponentID");
			riff(tabID).refresh(false);
		}

		var dataSet = rssComponent.buffer("ComponentTabComponentDataSet");
		if( !dataSet )
			return;

		var RSSKey = riffThis.buffer("ComponentDataRSSKey");
		if ( typeof RSSKey !="number" && !RSSKey )
			riffThis.buffer("ComponentDataRSSKey", RSSKey = null);

		var RSSIndex = riffThis.buffer("ComponentDataRSSIndex");
		if ( typeof RSSIndex !="number" && !RSSIndex )
			riffThis.buffer("ComponentDataRSSKey", RSSIndex = null);

		if ( RSSKey == null ){
			RSSKey = 0;
		}else {
			if ( _move == "categoryLeft" )	{
				if (--RSSKey < 0) {
					RSSKey = dataSet.length - 1;
				}
			}else if ( _move == "categoryRight" )	{
				if ( ++RSSKey >= dataSet.length) {
					RSSKey = 0;
				}
			}
		}

		riffThis.buffer("ComponentDataRSSKey",RSSKey);

		var idleSet = rssComponent.subSceneSelect(RSSKey).find(".list").buffer("ComponentDataIdleSet");
		if( !idleSet )
			RSSIndex = null;
		
		if( typeof _move == "number"){
			RSSIndex = _move;
		}else if ( RSSIndex == null ||  _move == "categoryLeft" ||  _move == "categoryRight" ){
			rssComponent.move(RSSKey);
			RSSIndex = 0;
		}else{
			if ( _move == "left" ){
				if (--RSSIndex < 0) {
					RSSIndex = idleSet.length - 1;
				}
			}else if ( _move == "right" ){
				if ( ++RSSIndex >= dataSet.length) {
					RSSIndex = 0;
				}
			}
		}

		riffThis.buffer("ComponentDataRSSIndex",RSSIndex);

		//h idle ���κп� text ���
		if( RSSIndex != null ){
			if ( idleSet[RSSIndex] ){
				riff(".article").text( idleSet[RSSIndex].txtTitle );
			}
		}
	}
}

//h rssComponent �����Ѵ�.
ComponentIdle.prototype.setRSSComponent = function ( _component )
{
	if ( typeof _component  == "string" ){
		//h ���ۿ� ID���� �����Ѵ�.
		riff(this).buffer("ComponentDataRSSComponentID", _component );
		riff(this).setRSSComponent( riff( _component ) );
	}else if ( typeof _component == "object" ){
		_component.buffer("ComponentDataRSSIdle", riff(this) );
		riff(this).buffer("ComponentDataRSSComponent", _component );
	}
}


// riff Button Component
//h className = btn �� ��� ȣ��Ǿ� Ÿ���� btn ���� �����Ѵ�.
var ComponentButton = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "btn";
}

// button option setting
// params  : _data => { property : value }
ComponentButton.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		//h �ش� ��ư ��ü�� size, color, btnImage ��Ÿ���� �����Ų��.
		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).css("font-size","32px");
			} else if (_data[k] == "normal"){
				riff(this).css("font-size","28px");
			} else if (_data[k] == "small"){
				riff(this).css("font-size","24px");
			} else {
				riff(this).css("font-size",_data[k]);
			}
		}

		if(k == "fontColor"){
			riff(this).css("color",_data[k]);
		}

		if(k == "btnImage"){
			riff(this).css("-webkit-border-image" ,"url('"+_data[k]+"') 15 stretch stretch");
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� Element �� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];
	}
}

// riff RssTime Component
//h className = receiveRssTime �� ��� ȣ��Ǿ� Ÿ���� feedReceiveTime�� �����Ѵ�.
var ComponentReceiveRssTime = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "feedReceiveTime";
}

// feedReceiveTime option setting
// params : _data = > 1. { property : value } , 2. { property : [key,value] }
ComponentReceiveRssTime.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		//h �ش� ��ư ��ü�� size, color, btnImage ��Ÿ���� �����Ų��.
		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).css("background",_data[k][1]);
			}

			if (_data[k][0] == "gradient"){

				if(_data[k][1].indexOf(" from ") != -1){
					riff(this).css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				} else {
					riff(this).addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).css("font-size","24px");
			} else if (_data[k] == "normal"){
				riff(this).css("font-size","18px");
			} else if (_data[k] == "small"){
				riff(this).css("font-size","14px");
			} else {
				riff(this).css("font-size",_data[k]);
			}
		}

		if(k == "fontColor"){
			riff(this).css("color",_data[k]);
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];
	}
}

// riff Scene Component
//h className = scene �� ��� ȣ��Ǹ� Ÿ���� scene�� �����ȴ�.
var ComponentScene = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "scene";
}

// scene option setting
// params : _data = > 1. { property : value }
ComponentScene.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		if(k == "backgroundImage"){
			if (_data[k] == "image1"){
				riff(this).children('.sceneBackground').addClass('image1');
			} else if (_data[k] == "image2"){
				riff(this).children('.sceneBackground').addClass('image2');
			} else if (_data[k] == "image3"){
				riff(this).children('.sceneBackground').addClass('image3');
			} else if (_data[k] == "image4"){
				riff(this).children('.sceneBackground').addClass('image4');
			} else if (_data[k] == "none"){
				riff(this).children('.sceneBackground').css("background-image","none");
			} else {
				riff(this).children('.sceneBackground').css("background-image","url("+_data[k]+")");
			}
		}
		
		if(k == "opacity"){
			riff(this).children('.sceneBackground').css("opacity",_data[k]);
		}

		if(k == "backgroundColor"){
			riff(this).css("backgroundColor",_data[k]);
		}
		
		if(k == "softkeyData" ) {
			riff(this).buffer("ComponentSceneComponentDataSoftkey", _data[k] );
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];
	}
}

// scene setting 
// Blank DIV Element for BackgroundImage
//h <div class="scene"> �Ϻο�Ҹ� ���� sceneWrap ���� ���Ѵ�.
//h frame �� background �����ϰ� <div class="sceneWarp"> �տ� ��ġ
ComponentScene.prototype.makeStructs = function ()
{
	// Scene Component Default Setting
	//h class="scene" �� ��� �����.

	var riffThis = riff(this);
	riffThis.children().wrapAll("<div class='sceneWrap'></div>");	
	riffThis.prepend("<div class='frameTop'></div><div class='frameBottom'></div><div class='sceneBackground'></div>"); 
	riffThis.option( riffThis.buffer("ComponentDataOption") );
}

// riff popup Component
//h className = popup  �� ��� ȣ��ǰ� Ÿ���� popup�� �����Ѵ�.
var ComponentPopup = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "popup";
}

// popup option setting
// params : _data = > 1. { property : value } , 2. { property : [key,value] }
ComponentPopup.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).find('.popupCon').css("background",_data[k][1]);
			}

			if (_data[k][0] == "gradient"){
				if(_data[k][1].indexOf("from") != -1){
					riff(this).find('.popupCon').css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				} else {
					riff(this).find('.popupCon').addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "fontColor"){
			riff(this).find('.popupCon').css("color",_data[k]);
		}

		if(k == "borderColor"){
			riff(this).find('.popupCon').css("border-color",_data[k]);
		}

		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).find('.popupCon').css("font-size","28px");
			} else if (_data[k] == "normal"){
				riff(this).find('.popupCon').css("font-size","24px");
			} else if (_data[k] == "small"){
				riff(this).find('.popupCon').css("font-size","20px");
			} else {
				riff(this).find('.popupCon').css("font-size",_data[k]);
			}
		}

		if(k == "btnAreaBackground"){
			if (_data[k][0] == "color"){
				riff(this).find('.popupCon .btnArea').css("background",_data[k][1]);
			}

			if (_data[k][0] == "gradient"){
				if(_data[k][1].indexOf("from") != -1){
					riff(this).find('.popupCon .btnArea').css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				} else {
					riff(this).find('.popupCon .btnArea').addClass("c_"+_data[k][1]);
				}
			}
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];	
	}
}

//h popup ���� ����
ComponentPopup.prototype.makeStructs = function ( )
{
	// popup Component Default Setting
	//h class="popup" �� ��� �����.

	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentPopupComponentDataSet");	// getMode

	//h buffer�� ���� ������ setMode�� buffer�� ����
	if ( !dataSet )
		riffThis.buffer("ComponentPopupComponentDataSet", dataSet = {} );	 // setMode

	//h �˾� ��� �߰�
	riffThis.contents().not(".btnArea").wrapAll('<div class="popupConTxt"></div>');
	riffThis.contents().wrapAll('<div class="popupCon"></div>');

	//h riff.js �� alert �Լ����� default ��ư( riff.back() )�� okFunc�� �������� ���
	if ( typeof dataSet.okFunc == "function" ) {
		riffThis.children('.popupCon').children('.btnArea').children(".popupOK").tap( dataSet.okFunc );
	}

	//h riff.js �� alert �Լ����� default ��ư( riff.back() )�� cancelFunc�� �������� ���
	if ( typeof dataSet.cancelFunc == "function" ) {
		riffThis.children('.popupCon').children('.btnArea').children(".popupCancel").tap( dataSet.cancelFunc );
	}

	//h �˾��� ��ư�� ��ġ�Ҷ��� ���� focus class �߰� �� ����
	riffThis.find('.btn').touchStart(function(){ riff(this).addClass("focus")})
				.touchEnd(function(){ riff(this).removeClass("focus")})
				
	// popup option function call
	riffThis.option( riffThis.buffer("ComponentDataOption") );		

}

// popup markup and data setting
// params : _data => { html : string }, { okFunc : function() {} } or { cancelFunc : function() {} }
ComponentPopup.prototype.makeContents = function ( _data )
{
	var riffThis = riff(this),
		dataSet = {},
		inHTML = "",
		btnHTML = "";

	for( var k in _data ) 	{
		if( k == "html" )
			dataSet.html = _data[k];
		else if( k =="okFunc")
			dataSet.okFunc = _data[k];
		else if( k =="cancelFunc" )
			dataSet.cancelFunc = _data[k];
	}
	inHTML += dataSet.html;

	//h ���� riff.alert() �Լ��� ������ ��ư �̺�Ʈ�� ���� ��ũ���� �����Ѵ�.
	if( dataSet.okFunc ) {
		btnHTML += '<button class="btn popupOff popupOK">OK</button>';
	}
	if( dataSet.cancelFunc ) {
		btnHTML += ' <button class="btn popupOff popupCancel">Cancel</button>';
	}
 	if ( btnHTML != "" )  {
		inHTML += '<div class="btnArea">' + btnHTML + '</div>';
	}

 	riffThis.buffer("ComponentPopupComponentDataSet", dataSet);	// buffer setMode
	riffThis.html(inHTML);
 	riffThis.makeStructs();
}

// riff list Component
//h className = list �� ��� ȣ��Ǹ� Ÿ���� list�� �����Ѵ�.
var ComponentList = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type="list";
}

// riff list AutoRefresh
// params _time : number
ComponentList.prototype.autoRefresh = function ( _time )
{
	var riffThis = riff(this),
		dataTimer = riffThis.buffer("ComponentListComponentDataTimer");

	if( dataTimer && typeof dataTimer == "number" ){
		riff.timer( dataTimer );
		dataTimer = null;
	}

	if( !_time || _time <= 0 )
		return;

	dataTimer = riff.timer( function() {
		if ( riffThis.parent().parent().css( "display") == 'block' ){
			riffThis.refresh();
		}
	}, _time );

	riffThis.buffer("ComponentListComponentDataTimer", dataTimer);
}

// riff list refresh
ComponentList.prototype.refresh = function ()
{
	var riffThis = riff(this);

	var rssRefresh = riffThis.buffer("ComponentListComponentDataRSSRefresh"); 

	if( rssRefresh && typeof rssRefresh == "function")
	{
		rssRefresh();	
	}
}

// riff list Option
// params : _data = > 1. { property : value } , 2. { property : [key,value] }
ComponentList.prototype.option = function ( _data )
{
	for ( var k in _data){
		if(k == "glow"){
			if (_data[k] == "true"){
				riff(this).find('ul > li > .glow').show();
			} else if (_data[k] == "false"){
				riff(this).find('ul > li > .glow').hide();
			}
		}

		if(k == "lineTopColor"){
			riff(this).find('ul > li .listLineTop').css('display','block');
			riff(this).find('ul > li .listLineTop').css('border-color',_data[k]);
		}

		if(k == "lineBottomColor"){
			riff(this).find('ul > li .listLineBottom').css('display','block');
			riff(this).find('ul > li .listLineBottom').css('border-color',_data[k]);
		}

		if(k == "lineTopOpacity"){
			riff(this).find('ul > li .listLineTop').css('opacity',_data[k]);
		}

		if(k == "lineBottomOpacity"){
			riff(this).find('ul > li .listLineBottom').css('opacity',_data[k]);
		}

		if(k == "fontColor"){
			riff(this).find('ul > li').css("color",_data[k]);
		}

		if(k == "subTextFontColor"){
			riff(this).find('ul > li .subTxt').css("color",_data[k]);
		}

		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).find("li").css("background",_data[k][1]);
			}

			if (_data[k][0] == "gradient"){

				if(_data[k][1].indexOf("from") != -1){
					riff(this).find("li").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				} else {
					riff(this).find("li").addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "maxLen")	{
			riff(this).buffer("ComponentListComponentDataMaxLen", _data[k]);
			riff(this).makeContents( riff(this).buffer("ComponentListComponentDataInput") );
		}

		if(k == "SettingComponentPosition"){
			riff('.innerCom').css('float',_data[k]);
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];	
	}
}

// list count
// return number
ComponentList.prototype.count = function ()
{
	return riff(this).children('ul').children('li').size();
}

// list structs setting
ComponentList.prototype.makeStructs = function ( )
{
	// List Component Default Setting
	//h class="list" �� ��� �����.
	var riffThis = riff(this),
		listRow = riffThis.children('ul').children('li');

		//h listRow�տ� �߰�
		listRow.prepend("<div class='listLineTop'></div>"+		// Blank DIV Element for LineTop
					"<div class='listLineBottom'></div>"+					// Blank DIV Element for LineBottom
					"<div class='glow'></div>"); 								// Blank DIV Element for Gradient

	//h focus �߰� �� ����
	listRow.touchStart(	function() { riff(this).addClass('focus'); })
		.touchEnd( function() { riff(this).removeClass('focus'); });

	//h �� li�� ���¿� ���� class �߰��Ѵ�.
	listRow.each( function() {
		var riffThis = riff(this);

		//h subText �� �����ϴ� ����� ������ multiline �߰�
		riffThis.children('.subTxt').parent().addClass("multiLine"); //add multiline class

		//h add img class - Ÿ�Կ� ���� �ΰ����� �ȴ�.
		if( riffThis.children('.img').size() != "0")
		{
			riffThis.addClass("img");

			//h �ڽĳ�忡 img Ŭ���� ������ txt Ŭ������ ������ 2�� ����   (data�Լ��� �ִ� ����Ʈ ���¿� ���� �޶���) 1. img->txt->subTxt, 2: txt->img->subTxt
			if( !riffThis.children('.img').next().hasClass('txt') )
			{
				riffThis.addClass("img2");
			}
		};
	});

	//h ���� �����Ͱ� ���ٸ� ��ũ�� �� �����͵��� �о�鿩 ����
	if( !riffThis.buffer("ComponentListComponentDataSet") )
	{
		//h buffer�� dataSet �迭 set
		riffThis.buffer("ComponentListComponentDataSet", new Array() );

		//h ������ dataSet�� �����´�
		listRow.each ( function () {
			var riffThis = riff(this),
				dataSet = riffThis.parent().parent().buffer("ComponentListComponentDataSet"),
				dataSetCur = {},
				listType = [ "radio", "check", "onoff", "img2", "img" ];

			//h �ش� scene�� list�� listType�� �ش��ϴ� class�� ������
			//h dataSet.type ���� ����.
			for ( var i = 0, l = listType.length; i < l; i++)
			{
				if( riffThis.hasClass(listType[i]) )
				{
					dataSetCur.type = listType[i];
					break;
				}
			}

			//h listType�� ���� ��� type�� text�� ����
			if( i == l)
				dataSetCur.type = "text";

			dataSet.push( dataSetCur );
		});
	}

	//h Image ũ�⿡ ���� Subtxt ������
	listRow.filter('.multiLine.img').each(function(){
		var riffThis = riff(this);

		if(riffThis.children('.img').children('img').size()!=0){
		riffThis.children('.subTxt').css("width", (430- riffThis.children('.img').children('img').width()) + "px");
		} else{
		riffThis.children('.subTxt').css("width", (430- riffThis.children('.img').width()) + "px");
		}
	})

	//h Image ũ�⿡ ���� 1 line�϶� Line-height ���� (�߾���������)
	listRow.filter('.img').each(function(){
		var riffThis = riff(this);
		riffThis.css("line-height", (riffThis.children('.img').children('img').height() + 28) +"px")
	})

	// radio Component Default Setting
	listRow.filter('.radio').prepend('<div class="innerCom"><div class="symRadio"><div class="comRadioObj"></div><div class="comRadioOnShadow"></div></div>')
			.tap( function() {

		var riffThis = riff(this),
			listDataSet = riffThis.parent().parent().buffer("ComponentListComponentDataSet"),
			idx = riffThis.index(),
			liSym = riffThis.children('.innerCom').children('.symRadio'),
			liThisRow = riffThis.parent().children('li');

		for( var k in listDataSet )
			if( listDataSet[k].type == "radio" )
			{
				listDataSet[k].selectFlag = false;
				liThisRow.eq(k).children('.innerCom').children('.symRadio').removeClass('on');
			}

		listDataSet[ idx ].selectFlag = true;
		liSym.addClass('on');

		if ( typeof listDataSet[idx].subSceneLoad == "function" )
			listDataSet[idx].subSceneLoad.apply(this, listDataSet[idx].funcArgs);
	});

	//h Radio �� ������ List �� ����
	listRow.children(".innerCom").each( function(){
		var riffThis = riff(this),
			riffThisParent = riffThis.parent();

		// Adjust Sub Text width
		riffThis.siblings('.subTxt').css('width','390px');

		//h ������ �� ������Ʈ ��ġ ����
		if(! riffThisParent.hasClass('multiLine'))
		{
			var pH = window.parseInt(riffThisParent.css("line-height"));
			riffThis.css("margin-top",(pH-(pH/2+20))+"px");
		}

		//h ������, ���� ���⿡ ���� Margin
		if(riffThis.css('float') == "left")
			riffThis.css('margin-right','10px');
	});

	// list option function call
	riffThis.option( riffThis.buffer("ComponentDataOption") );
}

// list func
// params -> _data : object
ComponentList.prototype.subSceneLoad = function ( _data )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentListComponentDataSet");

	if( !dataSet ) {
		riffThis.buffer("ComponentListComponentDataSet", dataSet = new Array() );
	}

	if( typeof _data == "object" ) {
		for ( var k in _data) {
			dataSet[k].subSceneLoad = _data[k];
		}
	}
}

// list sub
// params -> _key : number or string
ComponentList.prototype.subSceneSelect = function ( _key )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentListComponentDataSet");
	if( !dataSet )
		riffThis.buffer("ComponentListComponentDataSet", dataSet = new Array() );

	//h ����  key ���� �ش��ϴ� ��Ҹ� ��ȯ�Ѵ�.
	//h Ű�� number, string �� �ƴϸ� li��� ��ü ��ȯ.
	if( typeof _key == "string" )	{
		for ( var k in dataSet) {
			if( dataSet[k].key == _key ) {
				return riffThis.subSceneSelect( window.parseInt(k) );
			}
		}
	}else if ( typeof _key == "number") {
		return riffThis.children('ul').children('li').eq(_key);
	}else {
		return riffThis.children('ul').children('li').eq();
	}
}

// list removeListItem
// params -> _key : string or number
ComponentList.prototype.removeListItem = function ( _key )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentListComponentDataSet");
	if( !dataSet )
		riffThis.buffer("ComponentListComponentDataSet", dataSet = new Array() );

	//h _key Ÿ���� ���ڿ��̸� remove()ȣ��
	//h _key Ÿ���� �����̸� dataSet �迭���� �ش� _key��° list ����
	if( typeof _key == "string" ) {
		for ( var k in dataSet) {
			if( dataSet[k].key == _key ) {
				riffThis.remove( window.parseInt(k) );
			}
		}
	}else if ( typeof _key == "number") {
		var dataSetTemp = new Array();

		for( var i = 1, l = dataSet.length - _key; i< l; i++) {
			dataSetTemp.push( dataSet.pop() );
		}
		for( var i = 0, l = dataSetTemp.length; i< l; i++) {
			dataSet.push( dataSetTemp.pop() );
		}

		//h _key ���� ����Ʈ ����
		riffThis.subSceneSelect(_key).remove();	
	}
}

// riff SetList Component
//h className = setList �� ��� ȣ��Ǹ� Ÿ���� setList�� ����
var ComponentSettingList = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "setList";
}

// settingList markup and data setting
// params->_data : object or function
ComponentSettingList.prototype.makeContents = function ( _data )
{
	// setttingList Component Default Setting
	//h class="setList" �� ��� �����.
	var riffThis = riff(this);

	//h _data�� ������ ���ۿ��� �����ͼ� ��ȯ�Ѵ�.
	if( !_data ) {
		return riffThis.buffer("ComponentSettingListComponentDataSet");
	}

	var inHTML = "<ul>",
		dataSet = new Array(),
		data;

	//h _data�� callback �Լ��� ������ ���ۿ� callback�Լ� ����
	if( typeof _data[1] == "function" ) {
		data = _data[0];
		riffThis.buffer( "ComponentSettingListComponentDataFunc", _data[1] );
	} else {
		data = _data;
	}

	// make markup
	for( var k in data ) {
		var dataSetCur = {},
			i = 0;

		dataSetCur.key = k;

		//h user_data.js ���� ����ڰ� ������ type
		dataSetCur.type = data[k][i++];

		//h user_data.js �� type�� ���� img, selectFlag ���� (none)
		if( dataSetCur.type == "img" || dataSetCur.type == "img2" ) {
			dataSetCur.img = data[k][i++];
		}else if( typeof data[k][i] == "boolean" ) {
			dataSetCur.selectFlag =data[k][i++];
		}

		//h user_data.js ���� ����ڰ� ������ title
		dataSetCur.title = data[k][i++];

		//h desciption  (none)
		if( typeof data[k][i] == "string" ) {
			dataSetCur.subTitle = data[k][i++];
		}
		dataSet.push(dataSetCur);

		//h list make markup
		inHTML += '<li' + ((dataSetCur.type=="radio" || dataSetCur.type=="check" || dataSetCur.type=="onoff")?' class="'+ dataSetCur.type+'"':'') + '>';

		//h data�� �̹��� ������ üũ.
		if( dataSetCur.img ) {
			if(dataSetCur.type=="img") {
				inHTML += '<div class="img"><img src="' + dataSetCur.img + '"></div>' + '<div class="txt">' + dataSetCur.title + '</div>';
			}else {
				inHTML += '<div class="txt">' + dataSetCur.title + '</div>' + '<div class="img"><img src="' + dataSetCur.img + '"></div>';
			}
		}else {
			inHTML += '<div class="txt">' + dataSetCur.title + '</div>';
		}

		//h function �� ��쿡 subTitle�� ����.
		if( dataSetCur.subTitle ) 	{
			inHTML += '<div class="subTxt">' + dataSetCur.subTitle + '</div>';
		}
		inHTML += '</li>';
	}
	inHTML += "</ul>";

	riffThis.buffer("ComponentSettingListComponentDataSet", dataSet );
	riffThis.html(inHTML);
	riffThis.makeStructs();

	for( var k in dataSet ) {
		if( dataSet[k].selectFlag ) {
			riffThis.getSettingValue( dataSet[k].key );
		}
	}
}

//h ���� ����Ʈ�� ����
ComponentSettingList.prototype.count = function ()
{
	return riff(this).children('ul').children('li').size();
}


// settingList structs setting
ComponentSettingList.prototype.makeStructs = function ( )
{
	// setList Component Default Setting
	//h class="setList" �� ��� �����.
	var riffThis = riff(this),
		listRow = riffThis.children('ul').children('li');

	// Add to list css property
	riffThis.addClass("list");
	if( !riffThis.buffer("ComponentSettingListComponentDataSet") )
	{
		riffThis.buffer("ComponentSettingListComponentDataSet", new Array() );
		listRow.each ( function (idx) {
			var riffThis = riff(this),
				dataSet = riffThis.parent().parent().buffer("ComponentSettingListComponentDataSet"),
				dataSetCur = {},
				listType = [ "radio", "check", "onoff", "img2", "img" ];

			for ( var i = 0, l = listType.length; i < l; i++)
			{
				if( riffThis.hasClass(listType[i]) )
				{
					dataSetCur.type = listType[i];
					break;
				}
			}
			if( i == l)
				dataSetCur.type = "text";
			dataSetCur.key = idx;

			dataSet.push( dataSetCur );
		});
	}
	
	//h li ������ҿ� �� ��ҵ� ����
	listRow.prepend("<div class='listLineTop'></div>"+		// Blank DIV Element for LineTop
					"<div class='listLineBottom'></div>"+		// Blank DIV Element for LineBottom
					"<div class='glow'></div>"); 		// Blank DIV Element for Gradient

	//h list�� ��ġ �̺�Ʈ ����
	listRow.touchStart(	function() { riff(this).addClass('focus'); })
			.touchEnd( function() { riff(this).removeClass('focus'); });

	//h ����Ʈ ���¿� ���� �Ӽ� �߰�
	listRow.each( function() {
		var riffThis = riff(this);
		riffThis.children('.subTxt').parent().addClass("multiLine"); //add multiline class

		//h add img class - Ÿ�Կ� ���� �ΰ����� �ȴ�.
		if( riffThis.children('.img').size() != "0")
		{
			riffThis.addClass("img");
			if( !riffThis.children('.img').next().hasClass('txt') )
				riffThis.addClass("img2")
		};
	})

	//h Image ũ�⿡ ���� Subtxt ������
	listRow.filter('.multiLine.img').each(function(){
		var riffThis = riff(this);
		riffThis.children('.subTxt').css("width", (430- riffThis.children('.img').children('img').width()) + "px");
	})

	//h Image ũ�⿡ ���� 1 line�϶� Line-height ���� (�߾���������)
	listRow.filter('.img').each(function(){
		var riffThis = riff(this);
		riffThis.css("line-height", (riffThis.children('.img').children('img').height() + 28) +"px")
	})

	// Checkbox Component Default Setting
	listRow.filter('.check').prepend('<div class="innerCom"><div class="symCheck"><div class="comCheckboxObj1"></div><div class="comCheckboxObj2"></div></div></div>')
			.tap( function() {

		var	riffThis = riff(this),
			listDataSet = riffThis.parent().parent().buffer("ComponentSettingListComponentDataSet"),
			idx = riffThis.index(),
			liSym = riffThis.children('.innerCom').children('.symCheck');

		liSym.toggleClass('on');
		listDataSet[ idx ].selectFlag = liSym.hasClass('on');
	});

	// onoff Component Default Setting
	listRow.filter('.onoff').prepend('<div class="innerCom"><div class="symOnoff"><div class="symOnoffOnBg"></div></div>')
			.tap( function() {

		var riffThis = riff(this),
			listDataSet = riffThis.parent().parent().buffer("ComponentSettingListComponentDataSet"),
			idx = riffThis.index(),
			liSym = riffThis.children('.innerCom').children('.symOnoff');

		liSym.toggleClass('on');
		listDataSet[ idx ].selectFlag = liSym.hasClass('on');
	});
	
	// radio Component Default Setting
	listRow.filter('.radio').prepend('<div class="innerCom"><div class="symRadio"><div class="comRadioObj"></div><div class="comRadioOnShadow"></div></div>')
			.tap( function() {

		var riffThis = riff(this),
			listDataSet = riffThis.parent().parent().buffer("ComponentSettingListComponentDataSet"),
			idx = riffThis.index(),
			liSym = riffThis.children('.innerCom').children('.symRadio'),
			liThisRow = riffThis.parent().children('li');

		for( var k in listDataSet )
			if( listDataSet[k].type == "radio" )
			{
				listDataSet[k].selectFlag = false;
				liThisRow.eq(k).children('.innerCom').children('.symRadio').removeClass('on');
			}

		listDataSet[ idx ].selectFlag = true;
		liSym.addClass('on');
	});

	//h Radio, checkBox, onoff �� ������ List �� ����
	listRow.children(".innerCom").each( function(){
		var riffThis = riff(this),
			riffThisParent = riffThis.parent();

		//h Sub Text width �� ����
		riffThis.siblings('.subTxt').css('width','390px');

		//h �����϶� Component ��ġ ����
		if(! riffThisParent.hasClass('multiLine'))
		{
			var pH = window.parseInt(riffThisParent.css("line-height"));
			riffThis.css("margin-top",(pH-(pH/2+20))+"px");
		}

		//h ������, ���� ���⿡ ���� Margin
		if(riffThis.css('float') == "left")
			riffThis.css('margin-right','10px');
	});
	
	// settingList option function call
	riffThis.option( riffThis.buffer("ComponentDataOption") );	
}

//h setting���� ok��ư ������ ���� ���ڷδ� ���õ� key������ �迭
ComponentSettingList.prototype.okFunc = function ()
{
	var riffThis = riff(this),
		func = riffThis.buffer("ComponentSettingListComponentDataFunc");

	if( typeof func == "function" ){
		func.call(this, riffThis.getSettingValue() );
	}
}

//h setting���� ���õ� item�� key������ �迭�� ����
ComponentSettingList.prototype.getSettingValue = function ( _key, _value )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentSettingListComponentDataSet");


	//h _key Ÿ���� string �� ��� indexNo�� �Ķ���ͷ� �Ѱܼ� getSttingValue �Լ��� �ٽ� �ҷ���
	//h _key Ÿ���� number�� �����ϰ� �ȴ�.
	if( !dataSet ){
		return null;
	}
	else if( typeof _key == "string" ){
		for( var i = 0; dataSet[i]; i++)
			if( dataSet[i].key == _key )
				riffThis.getSettingValue(i, _value);
	}else if ( typeof _key == "number" && dataSet[_key]){
		var liAll = riffThis.children('ul').children('li'),
			liSelect = liAll.eq(_key),
			liSym;

		//h üũ�� ���� � Ÿ������ ����
		if( dataSet[_key].type == "check" ){
			liSym = liSelect.children('.innerCom').children('.symCheck');
		}else if ( dataSet[_key].type == "onoff" ){
			liSym = liSelect.children('.innerCom').children('.symOnoff');
		}else if ( dataSet[_key].type == "radio" ){
			for( var i = 0; dataSet[i]; i++){
				if( dataSet[i].type == "radio"){
					dataSet[i].selectFlag = false;
				}
			}
			liAll.children('.innerCom').children('.symRadio').removeClass('on');
			liSym = liSelect.children('.innerCom').children('.symRadio');
		}

		//h üũ�� Ÿ���� ������� �Ӽ��� �߰� �� ���� �ϰ�, �÷��� ���� �����Ѵ�.
		if ( liSym ){
			if(_value == "off"){
				liSym.removeClass('on');
				dataSet[ _key ].selectFlag = false;
			}else{
				liSym.addClass('on');
				dataSet[ _key ].selectFlag = true;
			}
		}
	}else{
		var rArray = new Array();

		for ( var k in dataSet)
			if( dataSet[k].selectFlag == true)
				rArray.push( dataSet[k].key );

		return rArray;
	}
}

// riff Tab Component
var ComponentTab = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "tab";
}

//h �� ������Ʈ�� ���� �ɼ� ����
ComponentTab.prototype.option = function ( _data )
{
	for ( var k in _data)
	{

		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).find('li').not('.on').css("background",_data[k][1]);
			}

			if (_data[k][0] == "gradient"){

				if(_data[k][1].indexOf("from") != -1){
					riff(this).find('li').not('.on').css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				} else {
					riff(this).find('li').not('.on').addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "focusBackground")
		{
			if (_data[k][0] == "color"){
				riff(this).find('li.on').css("background",_data[k][1]);
			}

			if (_data[k][0] == "gradient"){

				if(_data[k][1].indexOf("from") != -1)
				{
					riff(this).find('li.on').css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				}
				else
				{
					riff(this).find('li.on').addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "fontColor")
		{
			riff(this).find('li').not('.on').css("color",_data[k]);
		}

		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).find('li').css("font-size","32px");
			} else if (_data[k] == "normal"){
				riff(this).find('li').css("font-size","28px");
			} else if (_data[k] == "small"){
				riff(this).find('li').css("font-size","24px");
			} else {
				riff(this).find('li').css("font-size",_data[k]);
			}
		}

		if(k == "focusFontColor")
		{
			riff(this).find('li.on').css("color",_data[k]);
		}


		if(k == "glow")
		{
			if (_data[k] == "true"){
				riff(this).find('.glow').show();
			} else if (_data[k] == "false"){
				riff(this).find('.glow').hide();
			}
		}

		if(k == "lineOpacity")
		{
			riff(this).find(".tabBorder").css("opacity",_data[k]);

		}

		if(k == "lineColorLight")
		{
			riff(this).find('.tabBorder').css("border-left-color",_data[k]);
		}


		if(k == "lineColorDark")
		{
			riff(this).find('.tabBorder').css("border-right-color",_data[k]);
		}

		if( k =="maxLen" )
		{
			riff(this).parent().find('.list').option( { "maxLen" : _data[k] } );
		}

		if( k == "transitionOption" )
		{
			riff(this).buffer("ComponentTabComponentDataTransitionOption", _data[k] );
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];	
	}

}

//h �� �޴��� ����
ComponentTab.prototype.count = function ()
{
	return riff(this).children('ul').children('li').size();
}

//h �� ���� ����
ComponentTab.prototype.makeStructs = function ( )
{
	var riffThis		= riff(this);
	var riffThisUl		= riffThis.children('ul');
	var lis				= riffThisUl.children('li');

	lis.prepend("<div class='innerGrd'></div>"+		// Blank DIV Element for Border
				"<div class='tabBorder'></div>"); 			// Blank DIV Element for Border

	riffThis.prepend("<div class='glow'></div>");	// Blank DIV Element for Glow

	//h ���ۿ� dataSet�� ���� ��� (rss �Լ�ó�� �������� element ������ �ƴϰ�, ������Ʈ�� ���� ����� ���� index.html�� element�� ����� ����Ѵ�.)
	if ( !riffThis.buffer("ComponentTabComponentDataSet") )
	{
		riffThis.buffer("ComponentTabComponentDataSet", new Array() );
		
		riffThis.children('ul').children('li').each ( function () {
			var riffThis = riff(this),
				dataSet = riffThis.parent().parent().buffer("ComponentTabComponentDataSet"),
				dataSetCur = {};

			dataSetCur.key = riff.trim( riffThis.text() );

			dataSetCur.enable = true;
			dataSet.push( dataSetCur );
		});
	}

	//h �ǰ��� �̵��� �� �߻��ϴ� �̺�Ʈ
	lis.tap( function() {
		var liThis	= riff(this);
		var tabRiff = riff(this).parent().parent();

		tabRiff.move( liThis.index() );
	});

	riffThis.option( riffThis.buffer("ComponentDataOption") );

	riffThis.move(0); //First Scene View
}


// tab control markup and tab subScene list markup create
ComponentTab.prototype.makeContents = function ( _data )
{
	var riffThis = riff(this);
	if( !_data )
		return riffThis.buffer("ComponentTabComponentDataSet");

	var dataSet = new Array(),
		inHTML = "<ul>",
		sceneHTML = "";

	//h �� �� �� ���� ����
	for( var k in _data )
	{
		var dataSetCur = {};

		dataSetCur.feedTitle = k;
		dataSetCur.enable = true;

		if( typeof _data[k] == "string" )
		{
			dataSetCur.subSceneInnerList = _data[k];
		}
		else if( typeof _data[k] == "object" )
		{
			//h subScene ������ list class�� ������ div Element ����
			dataSetCur.subSceneInnerList = _data[k][0];
			//h �ش� �ǿ� �����Ҷ� ȣ���� �Լ� ����
			dataSetCur.subSceneLoadFlag = _data[k][1];
			//h �ش� �ǿ� �����Ҷ����� �ð� ���ŵǴ� �Լ� ����
			dataSetCur.subSceneLoad = _data[k][2];
		}

		dataSet.push( dataSetCur );

		inHTML += "<li>" + dataSetCur.feedTitle + "</li>";
		sceneHTML += "<div class='subScene'>" + dataSetCur.subSceneInnerList + "</div>";
	}

	inHTML += "</ul>";

	riffThis.html(inHTML);			// tab control markup
	riffThis.after(sceneHTML);	// tab subScene markup
	
	riffThis.buffer("ComponentTabComponentDataSet", dataSet);
	riffThis.buffer("ComponentTabComponentDataCurTab", null);
	riffThis.makeStructs();
}

// tab move event function
//h �� Ŭ���� �߻��ϴ� �̺�Ʈ �Լ�
ComponentTab.prototype.move = function ( _tab, _opts )
{
	if (typeof _tab == "number")
	{
		var riffThis = riff(this),
			dataSet = riffThis.buffer("ComponentTabComponentDataSet"),
			curTab = riffThis.buffer("ComponentTabComponentDataCurTab"),
			subScene = riffThis.siblings('.subScene'),
			tabList = riffThis.children('ul').children('li');

		//h ���� �� ������ ���
		if(  curTab === _tab )
			return;

		//h dataSet�� ������ ��
		if( !dataSet )
			riffThis.buffer("ComponentTabComponentDataSet", dataSet = new Array() );

		//h ���� �� ǥ�� ����
		tabList.removeClass('on');
		//h �̵��� �ǿ� ������ ǥ��
		tabList.eq(_tab).addClass('on');

		//h ���� �� ��ȣ ���ۿ� ����
		riffThis.buffer("ComponentTabComponentDataCurTab", _tab);


		//h �и��� ����ϴ� �κ�
		var second = 0;
		if( typeof curTab != "number" || riffGlobal.tabPageTimming == "after")
		{
			second = 0;
		}
		else if ( _opts )
		{
			if( _opts.transitionEffect == "none" ) second = 0;
			else second = window.parseFloat( _opts.transitionSecond );
		}
		else if ( riffThis.buffer("ComponentTabComponentDataTransitionOption") )
		{
			if ( riffThis.buffer("ComponentTabComponentDataTransitionOption").transeffect == "none" ) second = 0;
			else second = window.parseFloat( riffThis.buffer("ComponentTabComponentDataTransitionOption").transitionSecond );
		}
		else
		{
			if ( riffGlobal.transeffect == "none" ) second = 0;
			else second = window.parseFloat( riffGlobal.transitionSecond );
		}

		window.setTimeout( function() {
			if ( dataSet[_tab] )
			{
				//h ���� ���� �������� ��� ȭ�� ���� �÷��׿�, ȭ�� ���� �Լ��� �ִ��� Ȯ���ؼ� ȭ�� �����ϰ� �÷��� �����Ѵ�. ( refresh ��å ���� ���� ó���ѹ��� ȣ��� ) 
				if ( !dataSet[_tab].isSubsceneNew && dataSet[_tab].subSceneLoadFlag )
				{
					dataSet[_tab].subSceneLoadFlag.call( riffThis.dom(), _tab );

					//h AutoRefresh, Refresh �������� ���� ȭ�� ���� ��å�� �����Ѵ�. 
					//h Component.move() �� �̵����� ��, flag�� �����Ѵ�. 
					riff.changeSubsceneFlag( dataSet.length, _tab, dataSet, true );
				}

				if ( dataSet[_tab].subSceneLoad )
					dataSet[_tab].subSceneLoad.call( riffThis.dom(), _tab );
			}
		}, second*1000 );


		//h ���� ���� Ÿ���� ���ڰ� �ƴ� ���, _tab ���� subScene �� �����ش�.
		if( typeof curTab != "number")
		{
			subScene.hide();
			subScene.eq(_tab).show();
		}
		else
		{
			//h _tab = on, curTab = off, _opts ������ ���� ����Ʈ �ش�.
			riff.transition(
				subScene.eq(_tab),
				subScene.eq(curTab), 
				(_opts)?_opts:riffThis.buffer("ComponentTabComponentDataTransitionOption") );
		}
	}
}

//h �� subScene ȭ�� ���� �Լ�
ComponentTab.prototype.subSceneLoad = function ( _data )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentTabComponentDataSet");
	if( !dataSet )
		return true;

	if( typeof _data == "object" )
		for ( var k in _data)
			dataSet[k].subSceneLoad = _data[k];
}


//h �� �̵��� �÷��װ� true �̸� �����Ѵ�.
ComponentTab.prototype.subSceneLoadFlag = function ( _data )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentTabComponentDataSet");
	if( !dataSet )
		riffThis.buffer("ComponentTabComponentDataSet", dataSet = new Array() );

	if( typeof _data == "object" )
		for ( var k in _data)
		{
			dataSet[k].subSceneLoadFlag = _data[k];
			dataSet[k].isSubsceneNew = false;
		}
}


//h �ش� this ���� ��Һ��� 0���� �ؼ� �����´�.
ComponentTab.prototype.subSceneSelect = function ( _idx )
{
	var riffThis= riff(this),
		idx = ( typeof _idx == "undefined" )? riffThis.buffer("ComponentTabComponentDataCurPage") : _idx ;
	return riff(this).siblings(".subScene").eq( idx );
}

//h �� �������� �Լ�
ComponentTab.prototype.refresh = function ( _isCallByAutoRefresh )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentTabComponentDataSet"),
		curTab = riffThis.buffer("ComponentTabComponentDataCurTab");

	if ( dataSet && dataSet[curTab] )
	{
		if ( dataSet[curTab].subSceneLoadFlag )
		{
			dataSet[curTab].subSceneLoadFlag.call( this, curTab );
			if ( _isCallByAutoRefresh )
			{
				//h Autorefresh() �� ȭ�� �������� ��, flag�� �����Ѵ�. 
				riff.changeSubsceneFlag( dataSet.length, curTab, dataSet, false, true, false );
			} else {
				//h refresh() �� ȭ�� �������� ��, flag�� �����Ѵ�. 
				riff.changeSubsceneFlag( dataSet.length, curTab, dataSet, false, false, true );
			}
		}

		if ( dataSet[curTab].subSceneLoad )
			dataSet[curTab].subSceneLoad.call( this, curTab );
	}
}

//h  �� ���� �������� �Լ�
ComponentTab.prototype.autoRefresh = function ( _time )
{
	var riffThis = riff(this),
		dataSet = riffThis.buffer("ComponentTabComponentDataSet"),
		curTab = riffThis.buffer("ComponentTabComponentDataCurTab");

	if( dataSet && typeof dataSet.timer == "number" )
	{
		riff.timer( dataSet.timer );
		dataSet.timer = null;
	}

	if( !_time )
		return;

	dataSet.timer = riff.timer( function() {
		if ( riffThis.parent().parent().css( "display") == 'block' ){
			riffThis.refresh( true );
		}
	

//d		if ( dataSet && dataSet[curTab] )
//d		{
//d			if ( dataSet[curTab].subSceneLoadFlag )
//d			{
//d				dataSet[curTab].subSceneLoadFlag.call( this, curTab );
//d
//d				for( var i = 0, l = dataSet.length; i < l; i++ )
//d					dataSet[i].isSubsceneNew = false;
//d				dataSet[curTab].isSubsceneNew = true;
//d			}
//d			
//d			if ( dataSet[curTab].func )
//d				dataSet[curTab].func.call( this, curTab );
//d		}

	}, _time );
}




// riff Softkey Component
var ComponentSoftKey = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type="softkey";
}


//h ����ƮŰ makeContents and markStructs
ComponentSoftKey.prototype.makeContents = function( _data, _type, _func )
{
	var riffThis = riff(this);
	riffThis.html("");

	if (!_data)
		return;

	if(!_type)
		_type = riffGlobal.softkeyType;

	if(!_func)
		_func = riffGlobal.softkeyFunc;

	riffThis.removeClass("type1 type2").addClass(_type);
	var dataSet = new Array();

	if( _type == "type1" )
	{
		var softKeyHTML = '<div class="shadow"></div><div class="normalList">'
						+'<div class="back"></div><ul class="keyList">';
		var moreHTML = "";

		var k = 0;
		for ( var curdata in _data )
		{
			// data
			var dataSetCur= new Array();
			dataSetCur.push( curdata ); // key value
			dataSetCur.push( _data[curdata] ); // function
			dataSet.push(dataSetCur);

			if( k<2 )
				softKeyHTML += ( "<li>" + curdata + "</li>" );
			else
				moreHTML += ( "<li>" + curdata + "</li>" );

			k++;
	    }

		softKeyHTML += ( dataSet.length > 3 )?'<li>More</li></ul></div><ul class="moreList">'+moreHTML : moreHTML;
	    softKeyHTML += "</ul>";

	    riffThis.html(softKeyHTML);
	    riffThis.buffer("riffSoftKeyData", dataSet);

		riffThis.children(".moreList").children("li").tap( function()
		{
			var softkeydata = riffThis.buffer("riffSoftKeyData");

			var func = softkeydata[riff(this).index()+2][1];
			func.call(this, riff(this).index()+2 );
			riff.softkey.softKeyMoreHide();
		});

		//Softkey Width Set
		var keyObj =riff('.softkey.type1 ul.keyList li');
		var keyNum = keyObj.size();

		if(keyNum == 3 ){
			keyObj.css("width","131px");
		} else if (keyNum == 2 ){
			keyObj.css("width","198px");
		} else if (keyNum == 1 ){
			keyObj.css("width","398px");
		}

		var moreList=riff('.softkey.type1 ul.moreList');
		var moreObj = riff('.softkey.type1 ul.moreList li');
		var moreNum = moreObj.size();

		if (moreNum%2 == 0){
			moreObj.css("width","238px");
			riff('.softkey.type1 ul.moreList li:last-child').addClass('evenLast')
			riff('.softkey.type1 ul.moreList li:nth-last-child(2)').addClass('evenLast2')

		} else {
			moreObj.css("width","238px");
			riff('.softkey.type1 ul.moreList li:last-child').css("width","478px");
			riff('.softkey.type1 ul.moreList li:last-child').addClass('oddLast')
		}

		//Softkey more function
		riff( this ).find(".keyList > li").not( (dataSet.length>3)?2:null ).tap( function() {
			var softkeydata = riff(".softkey").buffer("riffSoftKeyData");

			var func = softkeydata[riff(this).index()][1];
			func.call( this, riff(this).index() );
			riff.softkey.softKeyMoreHide();
		});

		if( dataSet.length  > 3 )
			riff( this ).find(".keyList > li").eq(2).tap(function(){
				if( moreList.css('bottom') == '70px')
				{
					var morekeyHeight = Math.abs(70-moreList.height());
					moreList.css('bottom','-'+morekeyHeight+'px');
				}
				else
				{
					moreList.css('bottom','70px');
				}
			});

		riff('.softkey .normalList .back').tap(function(){
			_func.call(this, -1);
		})

		riff('.softkey li').touchStart( function() { riff(this).addClass('focus'); })
					.touchEnd(function() { riff(this).removeClass('focus'); });
	}
}


// riff Title Component
var componentTitle = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type="title";
}

//h Ÿ��Ʋ�� �ɼ� ����
componentTitle.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		if(k == "round"){
			if (_data[k] == "normal"){
				riff(this).addClass('round');
			} else if (_data[k] == "big"){
				riff(this).addClass("round big");
			} else if (_data[k] == "small"){
				riff(this).addClass("round small");
			} else if (_data[k] == "false"){
				riff(this).removeClass("round");
			} else {
				riff(this).css({
					"-webkit-border-top-left-radius" : _data[k],
					"-webkit-border-top-right-radius" : _data[k]
				});
				riff(this).children('.gradient').css({
					"-webkit-border-top-left-radius" : _data[k],
					"-webkit-border-top-right-radius" : _data[k]
				});
			}
		}

		if(k == "glow"){
			if (_data[k] == "true"){
				riff(this).children(".glow").show();
			} else if (_data[k] == "false"){
				riff(this).children(".glow").hide();
			}
		}

		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).css("background",_data[k][1]);
			}


			if (_data[k][0] == "gradient"){
				if(_data[k][1].indexOf("from") != -1){
					riff(this).css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")");
				} else {
					riff(this).addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "pattern"){
			if (_data[k] == "true"){
				riff(this).children(".pattern").show();
			} else if (_data[k] == "false"){
				riff(this).children(".pattern").hide();
			}
		}

		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).css("font-size","38px");
			} else if (_data[k] == "normal"){
				riff(this).css("font-size","34px");
			} else if (_data[k] == "small"){
				riff(this).css("font-size","30px");
			} else {
				riff(this).css("font-size",_data[k]);
			}
		}

		if(k == "fontColor"){
			riff(this).css("color",_data[k]);
		}

		if(k == "textAlign"){
			riff(this).css("text-align",_data[k]);
		}

		if(k == "shadow"){
			if (_data[k] == "true"){
				riff(this).next(".titleShadow").show();
			} else if (_data[k] == "false"){
				riff(this).next(".titleShadow").hide();
			}
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];	
	}
}

//h Ÿ��Ʋ�� ���� ����
componentTitle.prototype.makeStructs = function ()
{
	var riffThis = riff(this);
	riffThis.append("<div class='pattern'></div>"		// Blank DIV Element for Pattern
					+"<div class='glow'></div>") 		// Blank DIV Element for Gradient
				.after('<div class="titleShadow"></div>'); // Shadow Element
				
	riffThis.option( riffThis.buffer("ComponentDataOption") );
}

// title makeContents
componentTitle.prototype.makeContents = function( _string )
{
    riff(this).text(_string).makeStructs();
}


//  Setting Title Component
var ComponentSettingTitle = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type="setTitle";
}

// setting Title option 
ComponentSettingTitle.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		if(k == "round"){
			if (_data[k] == "normal"){
				riff(this).addClass('round');
			} else if (_data[k] == "big"){
				riff(this).addClass("round big")
			} else if (_data[k] == "small"){
				riff(this).addClass("round small")
			} else if (_data[k] == "false"){
				riff(this).removeClass("round")
			} else {
				riff(this).css({
					"-webkit-border-top-left-radius" : _data[k],
					"-webkit-border-top-right-radius" : _data[k]
				});
				riff(this).children('.gradient').css({
					"-webkit-border-top-left-radius" : _data[k],
					"-webkit-border-top-right-radius" : _data[k]
				});
			}
		}

		if(k == "glow"){
			if (_data[k] == "true"){
				riff(this).children(".glow").show();
			} else if (_data[k] == "false"){
				riff(this).children(".glow").hide();
			}
		}

		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).css("background-color",_data[k][1]);
			}


			if (_data[k][0] == "gradient"){

				if(_data[k][1].indexOf("from") != -1){
					riff(this).css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+"!important)");
				} else {
					riff(this).addClass("c_"+_data[k][1]);
				}

			}

		}

		if(k == "pattern"){
			if (_data[k] == "true"){
				riff(this).children(".pattern").show();
			} else if (_data[k] == "false"){
				riff(this).children(".pattern").hide();
			}
		}

		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).css("font-size","40px");
			} else if (_data[k] == "normal"){
				riff(this).css("font-size","36px");
			} else if (_data[k] == "small"){
				riff(this).css("font-size","32px");
			} else {
				riff(this).css("font-size",_data[k]);
			}
		}

		if(k == "fontColor"){
			riff(this).css("color",_data[k]);
		}

		if(k == "textAlign"){
			riff(this).css("text-align",_data[k]);
		}
		if(k == "display")
		{
			if (_data[k] == "true"){
				riff(this).css("display","block");
			} else if (_data[k] == "false"){
				riff(this).css("display","none");
			}
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];	
	}
}

//h ���� Ÿ��Ʋ�� ���� ����
ComponentSettingTitle.prototype.makeStructs = function ()
{
	var riffThis = riff(this);
	riffThis.append("<div class='pattern'></div>"		// Blank DIV Element for Pattern
						+"<div class='glow'></div>") 		// Blank DIV Element for Gradient
				.after('<div class="titleShadow"></div>'); 	// Shadow Element
				
	riffThis.option( riffThis.buffer("ComponentDataOption") );				
}

//h ���� Ÿ��Ʋ�� �� string�� ����
ComponentSettingTitle.prototype.makeContents = function( _string )
{
    riff(this).text(_string).makeStructs();
}

// riff BusyIndicator Component
var ComponentBusyIndicator = function ( _elementContext )
{
	this.elementContext = _elementContext;
	this.type = "busy";
}


// busyIndicator option 
ComponentBusyIndicator.prototype.option = function ( _data )
{
	for ( var k in _data)
	{
		if(k == "background"){
			if (_data[k][0] == "color"){
				riff(this).parent().parent().css("background",_data[k][1])
			}

			if (_data[k][0] == "gradient"){

				if(_data[k][1].indexOf("from") != -1){
					riff(this).parent().parent().css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")")
				} else {
					riff(this).parent().parent().addClass("c_"+_data[k][1]);
				}
			}
		}

		if(k == "fontColor"){
			riff(this).parent().parent().css("color",_data[k])
		}

		if(k == "borderColor"){
			riff(this).parent().parent().css("border-color",_data[k])
		}

		if(k == "fontSize"){
			if (_data[k] == "big"){
				riff(this).parent().parent().css("font-size","28px")
			} else if (_data[k] == "normal"){
				riff(this).parent().parent().css("font-size","24px")
			} else if (_data[k] == "small"){
				riff(this).parent().parent().css("font-size","20px")
			} else {
				riff(this).parent().parent().css("font-size",_data[k])
			}
		}

		if(k == "btnAreaBackground"){
			if (_data[k][0] == "color"){
				riff(this).find('.popupCon .btnArea').css("background",_data[k][1])
			}

			if (_data[k][0] == "gradient"){
				if(_data[k][1].indexOf("from") != -1){
					riff(this).find('.popupCon .btnArea').css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,"+_data[k][1]+")")
				} else {
					riff(this).find('.popupCon .btnArea').addClass("c_"+_data[k][1]);
				}
			}
		}


		if(k == "busyIndicatorStyle"){
			if (_data[k] == "1"){
				riff(this).removeClass().addClass('busyIndicator type1');
			} else if (_data[k] == "2"){
				riff(this).removeClass().addClass('busyIndicator type2');
			} else if (_data[k] == "3"){
				riff(this).removeClass().addClass('busyIndicator type3');
			}
		}

		if(k == "busyIndicatorSpeed"){
			riff(this).css("-webkit-animation-duration",_data[k])
		}
		
		//h �ɼ� �����͸� ���ۿ� �����Ѵ�. ( �ʱ�ȭ ���� ��Ҹ� �������� �������� ��� �߰��� �ɼ��� �ɾ��ش�. )
		var optionData = riff(this).buffer("ComponentDataOption");
		if( !optionData )
			riff(this).buffer("ComponentDataOption", optionData = {} );
		optionData[k] = _data[k];
	}
}