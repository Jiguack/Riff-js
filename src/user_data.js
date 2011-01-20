//
// Framework 0.98
//
// Copyright 2010, Licensed under the MIT license.
// http://innovator.samsungmobile.com/
//
//

/* @Framework_Ver 0.98 */

var softKeyData = {
	"Transition" : function(){ $.move("setTrans")},
	"Theme" : function(){ $.move("setTheme")}
};

var settingListData =  [
	["radio", "Radio1", [ function(str) { alert(str) }, "radio"] ],
	["radio", "Radio2", function() { alert("radio2")  } ],
	["check", "Checkbox", function() { alert("check")  } ],
	["check", "Checkbox", function() { alert("check")  } ],
	["check", "Checkbox", function() { alert("check")  } ],
	["onoff", "On/Off Toggle", function() { alert("onoff")  } ],
	["onoff", "On/Off Toggle", function() { alert("onoff")  } ]
];

var setThemeListData =	[{
	"none" : ["radio", true, "none"],
	"aquablue" : ["radio", "aquablue"],
	"green" : ["radio", "green"],
	"leather" : ["radio", "leather" ],
	"modern_black" : ["radio", "modern_black"],
	"note" : ["radio", "note"],
	"papercut" : ["radio", "papercut"],
	"rusty" : ["radio", "rusty"],
	"vivid" : ["radio", "vivid"]
}, function( params ) {
		$.globalSetting( { "theme" : params[0] } );
}];


var setTransListData  =	[{
	"slideVer" : ["radio", true, "Slide Vertical"],
	"slideHor" : ["radio", "Slide Horizontal"],
	"fade" : ["radio", "Fade" ],
	"popup" : ["radio", "Pop"],
	"spin" : ["radio", "Spin"]
}, function(  params ) {
	$.globalSetting( { "transitionEffect" : params[0] } );
} ];


//h �� �������̽�
var rssTestDataTab = {
	runs : 
	{
			"news"		: [ "http://175.125.20.219/xml/xml.php?url=http://feeds.bbci.co.uk/news/rss.xml?edition=uk",   fooTab, [ {"image" : "thumbnail[url]"}, "abcde", "tete"]],
			"sports"	: [ "http://175.125.20.219/xml/xml.php?url=http://rss.cnn.com/rss/edition_sport.rss",   fooTab, [ {"image" : "thumbnail[url]"}, "abcde", "tete"]],
			"science"	: [ "http://175.125.20.219/xml/xml.php?url=http://rss.cnn.com/rss/edition_space.rss",   fooTab, [ {"image" : "thumbnail[url]"}, "abcde", "tete"]],
			"topic"		: [ "http://175.125.20.219/xml/xml.php?url=http://rss.cnn.com/rss/edition.rss",   fooTab, [ {"image" : "thumbnail[url]"}, "abcde", "tete"]]	
	}
	, layout : [ frameworkTab, [ {"image" : "thumbnail[url]"}, "abcde", "tete" ] ]
	, opts :
	{
		ajaxOption : {  }
		, cache : true
	}
	, successFnAfterXML : null
}

//h ������ ��ũ�� �� ���̾ƿ�.
function frameworkTab()
{
	var layoutParamsArray		= arguments[0];
	var subSceneArray			= arguments[1];
	var opts							= arguments[2];
	var xmlSuccessCallback	= arguments[3];
	
	//h rss ���� �ɼ� ������ ���� ( tab �̵��� ���) 
	var dataSetRSS = new Array();			

	//h tab�� �ε�� ���� �ش� tab �̵��� �� ȣ���� �Լ� ���� 
	var dataSet = new Array();	

	//h �� �ǵ庰 
	for( var k in subSceneArray )
	{		
		//h tab.prototype.move���� viewFunc ȣ��� ���Լ� ����Ǹ鼭 ���ۿ� �ִ� ���� �����ͼ� ������ ����.
		dataSet[k] = ["<div class='list' id='ComponentTabRSSList"+k+"'></div>", 
			function ( idx )
			{
				var riffThis = riff(this);
				var riffThisDataSetRss = riffThis.buffer("ComponentTabComponentDataSetRss");	

				riff.popup( "#busyIndicator" );
				//h _xml : riffXML ��ü
				//h _xmlObject : ������ ��ſ��� ������ xml 
				//h _xmlString : xml �� ����ȭ. ( optional )
				riff.xml(
					riffThisDataSetRss[idx].url,
					function( _xml, _xmlObject, _xmlString ) {

						var _xmlCache = _xmlObject;
						var args = new Array();
						args.push( _xml );
						args.push( idx );	
						args.push( riffThisDataSetRss[idx].tagOpts );

						//h data.js�� user�� ������ ȭ�� ���� �Լ� ȣ��
						if( riffThisDataSetRss[idx].subSceneFunction && typeof riffThisDataSetRss[idx].subSceneFunction == "function" ){
							riffThisDataSetRss[idx].subSceneFunction.apply( riffThis, args );	
							
							//h ù��° ��� ��������.
							var rssComponent = riffThis.buffer("ComponentDataRSSIdle");
							if( rssComponent ) {
							  rssComponent.moveRSSArticle(0);
							}
						}
					}
					,  opts.ajaxOption );
			},
			function ( idx ) 
			{
				//h �������� �̵��Ǹ� ������Ʈ �ϴ� �κп� ������Ʈ �ð� ǥ��
				riff.feedReceiveTime( riff.now() );
			}
		];
			//h dataSetRSS�� data.js���� ���� �� setting
			var dataSetRSSCur = {};
			dataSetRSSCur.url							= subSceneArray[k][0];
			dataSetRSSCur.subSceneFunction	= subSceneArray[k][1];
			dataSetRSSCur.tagOpts					= subSceneArray[k][2];
			dataSetRSSCur.opts						= opts;
			dataSetRSSCur.xmlSuccessCallBackSet = xmlSuccessCallback;
			dataSetRSS.push(dataSetRSSCur);				
		}

		//h �̰����� ���ۿ� ������ �� �Ŀ� viewFunc ���� ���� funcSet ���� �� ���� ���ۿ� ������ ���� ������ ������ ������ ������ �Ѵ�.
		this.buffer("ComponentTabComponentDataSet", dataSet )	
			.buffer("ComponentTabComponentDataSetRss", dataSetRSS)
			.makeContents( dataSet );
};

//h ������ ��Ʈ���� subScene �����κ�
function fooTab()  
{
	riff.popup.back();
	var _xml			= arguments[0];
	var _fnIndex	= arguments[1];
	var _tagOpts	= arguments[2][0];
	var _opts			= arguments[3];

	//h �⺻ image �̿��� �߰� args.
	var _otherOptions = new Array();
	for( var i = 1; i < arguments[2].length; i++)
	{
		_otherOptions = arguments[2][i];
	}
	
	// opts Setting
	var opts = {};
	opts.iterator			= "item";
	opts.imageType	= "img";
	for ( var k in _opts )
		opts[k] = _opts.ajaxOption[k];

	var tagInfo = {};
	tagInfo.title = "title";
	tagInfo.description = "description";
	tagInfo.link = "link";
	tagInfo.image = "image";
	
	for( var k in _tagOpts )
	{
		if( k == "title" )
			tagInfo.title = _tagOpts[k];
		else if(k=="description")
			tagInfo.description = _tagOpts[k];
		else if(k == "link")
			tagInfo.link = _tagOpts[k];
		else if(k == "image")
			tagInfo.image = _tagOpts[k];
	}

	//h rss callback
	var dataArray = new Array();
	var itemElem = _xml.selector(opts.iterator);
	var inHTML = "<ul>";
	var urlArray = new Array();

	//h Idle�� ���� ������
	var dataSetRSS = new Array();

	for ( var i=0, l=itemElem.size(); i<l; i++ )
	{
		var dataType = "";
		var dataImgUrl = "";
		var dataTitle = "";
		var dataDescription = "";
		var dataLink = "";
		var moveUrl = "";
		
		//h �̹������� ������
		if( tagInfo.image )		
		{
			var elem = itemElem.eq(i).find(tagInfo.image);

			if( elem.size() != 0 )
			{
				var strSelect = riff.trim(tagInfo.image);		// ex thumbnail[url]
				
				//h url ���ؼ� �迭�� �ֱ�.
				if( strSelect.substr(strSelect.length-1, strSelect.length) == ']' )
				{
					var attr = riff.trim( strSelect.substring( strSelect.lastIndexOf("[")+1 , strSelect.lastIndexOf("]") ) ),
						imgSrc = elem.attr(attr);

					if( imgSrc )
					{
						dataType = "img";
						dataImgUrl = imgSrc;
					}
				}
				else if ( riff.trim(elem.text()) )
				{
					dataType = "img";
					dataImgUrl = riff.trim( elem.text());
				}
			}

			//h tagInfo text�� �������� ����.
			if( opts.description != "none" ) {
				dataDescription = itemElem.eq(i).find(tagInfo.description).text();
			}
			
			//h link ��� ���� �� linkUrl ����
			if( opts.link != "none" && riff.trim(itemElem.eq(i).find(tagInfo.link).text()) ) 
			{
				dataLink = itemElem.eq(i).find(tagInfo.link).text();
				moveUrl = [function ( _url ) { riff.openURL( _url ); }, dataLink];
				urlArray.push([function ( _url ) { riff.openURL( _url ); }, dataLink] );
			}

			var txtTitle = itemElem.eq(i).find(tagInfo.title).text();
	
			//h <li>...</li> ����
			inHTML += '<li' + ((dataType =="radio" || dataType=="check" || dataType=="onoff" || dataType=='accordion')?' class="'+ dataType+'"':'') + '>';

			//h img ���� üũ -> 1: img+title+subTitle, 2: title + image + subTitle (����Ʈ ���� ����)
			if( imgSrc )
				if(dataType =="img")
					inHTML += '<div class="img"><img src="' + dataImgUrl + '"></div>' + '<div class="txt">' + txtTitle + '</div>';
				else
					inHTML += '<div class="txt">' + txtTitle + '</div>' + '<div class="img"><img src="' + dataImgUrl + '"></div>';	
			else if(dataType == "accordion")
				inHTML += txtTitle;
			else
				inHTML += '<div class="txt">' + txtTitle + '</div>';

			//h subTitle ������ �߰�
			if( dataDescription )
				inHTML += '<div class="subTxt">' + dataDescription + '</div>';

			//h type == accordion �̸� ��� �߰�
			if( dataType == "accordion" )
				inHTML += '<div class="accCon"><div class="list"></div></div>';

			inHTML += '</li>';

			//h idle�� ���� rss ������ ����
			var dataSetRSSCur = {};
			dataSetRSSCur.dataImgUrl = dataImgUrl;
			dataSetRSSCur.txtTitle = txtTitle;
			dataSetRSSCur.dataDescription = dataDescription;
			dataSetRSSCur.dataLink = dataLink;
			dataSetRSS.push( dataSetRSSCur );


		}
	}
	inHTML += "</ul>";

	//h �ش� subScene�� markup  �־��ֱ�
	this.subSceneSelect(_fnIndex).children(".list").html(inHTML);

	//h �ش� ����Ʈ�� ��ũ ����
	this.subSceneSelect(_fnIndex).children(".list").find("ul > li").each(
		function (k) {
			riff(this).tap( function () { urlArray[k][0](urlArray[k][1]);  } ) ;
	});

	//h idle�� ���� ������ ���� ���ۿ� ����
	this.subSceneSelect(_fnIndex).children(".list").buffer("ComponentDataIdleSet", dataSetRSS );

	//h ���� ����
	this.subSceneSelect(_fnIndex).children(".list").makeStructs();

	//h rss feed ���� �ð� �߰� �κ�
	this.subSceneSelect(_fnIndex).children(".list").buffer("ComponentListComponentDataRSSFlag", true).buffer("ComponentListComponentDataRSSTime", riff.now() );
};

























//h ����Ʈ �������̽�
var rssTestDataList = {
	runs : 
	[
		"http://175.125.20.219/xml/xml.php?url=http://feeds.feedburner.com/naver_news_popular",   fooList, [ {"image" : "thumbnail[url]"}, "abcde", "tete"]
	]
	, layout : [ frameworkList, [ "arg1", "arg2", "arg3" ] ]
	, opts :
	{
		ajaxOption : {  }
		, cache : true
	}
	, successFnAfterXML : null
}


//h �����ӿ�ũ�� ����Ʈ ���̾ƿ�.
function frameworkList()
{
	var layoutParamsArray		= arguments[0];
	var sceneArray					= arguments[1];
	var opts							= arguments[2];
	var xmlSuccessCallback	= arguments[3];
	var riffThis = this;
	
	riffThis.buffer("ComponentListComponentDataRSSRefresh", 	
		function ()
		{
			riff.xml( 
				sceneArray[0],
				function( _xml, _xmlObject, _xmlString ) {
					var _xmlCache = _xmlObject;
					
					var args = new Array();
					args.push( _xml );
					args.push( 0 );	
					args.push( sceneArray[2] );

					//h data.js�� user�� ������ ȭ�� ���� �Լ� ȣ��
					if( sceneArray[1] && typeof sceneArray[1] == "function" ){
						sceneArray[1].apply( riffThis, args );	 		
					}
				}
				,  opts.ajaxOption );
			}
		);

	var rssRefresh = riffThis.buffer("ComponentListComponentDataRSSRefresh"); 
	rssRefresh();
	riff.feedReceiveTime( riff.now() );
};

//h �����ӿ�ũ�� ����Ʈ �����κ�
function fooList( _this )  
{
	var _xml			= arguments[0];
	var _fnIndex	= arguments[1];
	var _tagOpts	= arguments[2][0];

	// opts Setting
	var opts = {};
	opts.imageType = "img";

	var tagInfo = {};
	tagInfo.title = "title";
	tagInfo.description = "description";
	tagInfo.link = "link";
	tagInfo.image = "image";
	
	for( var k in _tagOpts )
	{
		if( k == "title" )
			tagInfo.title = _tagOpts[k];
		else if(k=="description")
			tagInfo.description = _tagOpts[k];
		else if(k == "link")
			tagInfo.link = _tagOpts[k];
		else if(k == "image")
			tagInfo.image = _tagOpts[k];
	}

	//h rss callback
	var dataArray = new Array();
	var itemElem = _xml.selector("item");
	var inHTML = "<ul>";
	var urlArray = new Array();
	
	for ( var i=0, l=itemElem.size(); i<l; i++ )
	{
		var dataType = "";
		var dataImgUrl = "";
		var dataTitle = "";
		var dataDescription = "";
		var dataLink = "";
		var moveUrl = "";
		
		//h �̹������� ������
		if( tagInfo.image )		
		{
			var elem = itemElem.eq(i).find(tagInfo.image);

			if( elem.size() != 0 )
			{
				var strSelect = riff.trim(tagInfo.image);		// ex thumbnail[url]
				
				//h url ���ؼ� �迭�� �ֱ�.
				if( strSelect.substr(strSelect.length-1, strSelect.length) == ']' )
				{
					var attr = riff.trim( strSelect.substring( strSelect.lastIndexOf("[")+1 , strSelect.lastIndexOf("]") ) ),
						imgSrc = elem.attr(attr);
						
					if( imgSrc )
					{
						dataType = "img";
						dataImgUrl = imgSrc;
					}
				}
				else if ( riff.trim(elem.text()) )
				{
					dataType = "img";
					dataImgUrl = riff.trim( elem.text());
				}
			}
			
			//h tagInfo text�� �������� ����.
			if( opts.description != "none" ) {
				dataDescription = itemElem.eq(i).find(tagInfo.description).text();
			}
			
			//h link ��� ���� �� linkUrl ����
			if( opts.link != "none" && riff.trim(itemElem.eq(i).find(tagInfo.link).text()) ) 
			{
				dataLink = itemElem.eq(i).find(tagInfo.link).text();
				moveUrl = [function ( _url ) { riff.openURL( _url ); }, dataLink];
				urlArray.push([function ( _url ) { riff.openURL( _url ); }, dataLink] );
			}

			var txtTitle = itemElem.eq(i).find(tagInfo.title).text();
				
			//h <li>...</li> ����
			inHTML += '<li' + ((dataType =="radio" || dataType=="check" || dataType=="onoff" || dataType=='accordion')?' class="'+ dataType+'"':'') + '>';

			//h img ���� üũ -> 1: img+title+subTitle, 2: title + image + subTitle (����Ʈ ���� ����)
			if( imgSrc )
				if(dataType =="img")
					inHTML += '<div class="img"><img src="' + dataImgUrl + '"></div>' + '<div>' + txtTitle + '</div>';
				else
					inHTML += '<div class="txt">' + txtTitle + '</div>' + '<div class="img"><img src="' + dataImgUrl + '"></div>';	
			else if(dataType == "accordion")
				inHTML += txtTitle;
			else
				inHTML += '<div class="txt">' + txtTitle + '</div>';

			//h subTitle ������ �߰�
			if( dataDescription )
				inHTML += '<div class="subTxt">' + dataDescription + '</div>';

			//h type == accordion �̸� ��� �߰�
			if( dataType == "accordion" )
				inHTML += '<div class="accCon"><div class="list"></div></div>';

			inHTML += '</li>';
		}
	}

	inHTML += "</ul>";
	
	this.html(inHTML);
	
	//h �ش� ����Ʈ�� ��ũ ����
	this.children('ul').children("li").each(
		function (k) {
			riff(this).tap( function () { urlArray[k][0](urlArray[k][1]);  } ) ;
	} );	
	this.makeStructs();

	//h rss feed ���� �ð� �߰� �κ�
	this.buffer("ComponentListComponentDataRSSFlag", true).buffer("ComponentListComponentDataRSSTime", riff.now() );
};