//
// Framework TrialVersion 1.0.32 
//
// Copyright 2011, Licensed under the MIT license.
// http://innovator.samsungmobile.com/
//
//

/* @Framework_Ver  TrialVersion 1.0.32  */


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
	"green" : ["radio", "green"],
	"modern_black" : ["radio", "modern_black"]
}, function( params ) {
		$.globalSetting( { "theme" : params[0] } );
}];


var setTransListData  =	[{
	"slideVer" : ["radio", true, "Slide Vertical"],
	"slideHor" : ["radio", "Slide Horizontal"],
	"fade" : ["radio", "Fade" ],
	"popup" : ["radio", "Pop"]
}, function(  params ) {
	$.globalSetting( { "transitionEffect" : params[0] } );
} ];


//h �� �������̽�
var rssTestDataTab = {
	runs : 
	{
			"NEWS"		: [ "http://175.125.20.219/xml/xml.php?url=http://www.samsung.com/us/function/rss/rssFeedItemList.do?typeCd=NEWS",   fooTab, [] ],
			"IR"		: [ "http://175.125.20.219/xml/xml.php?url=http://www.samsung.com/us/function/rss/rssFeedItemList.do?typeCd=IR",   fooTab, [] ],
			"PRODUCTS"	: [ "http://175.125.20.219/xml/xml.php?url=http://www.samsung.com/us/function/rss/rssFeedItemList.do?typeCd=PRODUCTS",   fooTab, [] ],
			"SUPPORT"	: [ "http://175.125.20.219/xml/xml.php?url=http://www.samsung.com/us/function/rss/rssFeedItemList.do?typeCd=SUPPORT",   fooTab, [] ]	
	}
	, layout : [ frameworkTab ]
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

	//h ���� ����
	this.subSceneSelect(_fnIndex).children(".list").makeStructs();

	//h rss feed ���� �ð� �߰� �κ�
	this.subSceneSelect(_fnIndex).children(".list").buffer("ComponentListComponentDataRSSFlag", true).buffer("ComponentListComponentDataRSSTime", riff.now() );
};



