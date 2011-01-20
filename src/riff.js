//
// riff Framework 0.98
//
// Copyright 2010, Licensed under the MIT license.
// http://innovator.samsungmobile.com/
//

/* @Framework_Ver 0.98 */

(
function(window) {

//d var widget = undefined;

// riff Global Object
var riffGlobal = new (function()
{
	//h $().buffer() ���� ���. ���� �����͸� �����صδ� ���� �迭 ����. 
	this.buffer = new Array();
	//h $().buffer() �� class �� ���̴� ���� �ĺ���. 1���� ������ ����. 
	this.bufferID = 0;
	//h ????
	this.prefixBufferClass = "riffBufferClassData";
	//h $().buffer() �� class �� ���̴� ���� �ĺ����� prefix. 
	this.prefixBufferID = "riffBufferID-";	
	//h timer�� �����ϱ� ���� �Ե� �Լ���  $.timer() �Լ��� timer list ����� list. 
	this.timerList = new Array(); // timer list
	//h Animation�� ����� queue�� ��� 
	this.queueList = new Array();
	//h �˾����� �� �ִ� ȭ���� id ����.
	this.popup = "";
	//h ȭ�� �̵��ÿ�, stack()�� �̿��ؼ� �����Ѵ�. �̴� go / back �� �����ϱ� ���ؼ�. 
	this.sceneStack = new Array();
	
	//h transition ȿ���� ������ ��, ������ �⺻�� ����. ����ڰ� �����ϸ� �װ� ������, ���� ������ �� ���� �⺻.
	this.transitionEffect = "slideHor";
	//h transition ȿ���� ������ ��, ȿ���� ����Ǵ� �ð��� ����. ����ڰ� �����ϸ� �װ� ������, ���� ������ �� ���� �⺻.
	this.transitionSecond = "0.5s";
	//h transition ȿ���� ������ ��, ���ӵ� ȿ���� �⺻�� ����. ����ڰ� �����ϸ� �װ� ������, ���� ������ �� ���� �⺻.
	this.transitionMotion = "ease";
	//h transition ȿ���� ������ ��, popup ȿ���� �⺻�� ����. ����ڰ� �����ϸ� �װ� ������, ���� ������ �� ���� �⺻.
	this.popupTransitionEffect = "popup";
	//h transition ȿ���� ������ ��, popup ȿ���� ����Ǵ� �ð��� ����. ����ڰ� �����ϸ� �װ� ������, ���� ������ �� ���� �⺻.
	this.popupTransitionSecond = "0.5s";
	//h transition ȿ���� ������ ��, popup ȿ���� ����Ǵ� ���ӵ� ȿ���� �⺻�� ����. ����ڰ� �����ϸ� �װ� ������, ���� ������ �� ���� �⺻.
	this.popupTransitionMotion = "ease";

	//h ???? ����ڰ� transition ȿ�� ������ Ư���� ���� �ʾ��� ��� �⺻������ ������ �ش�. 
	this.transitionDirection = "on";
	//h softkey Type �⺻�� ����
	this.softkeyType = "type1";
	//h ???? softkey ���� ����. Data�̹Ƿ�, Json ���·� ���� �����Ѵ�. makeContents() �� �����ϴ� �Ͱ� ���� �������� ������ �� �ִ�. ????
	this.softkeyFunc = null;
	//h ???? softkey ���� ����. function�� �����Ͽ� Ű�� �������� ���� ���� �Լ��� �����Ѵ�. ????
	this.softkeyData = null;

	//h ???? softkey ���� ����. Data�̹Ƿ�, Json ���·� ���� �����Ѵ�. makeContents() �� �����ϴ� �Ͱ� ���� �������� ������ �� �ִ�. ????
	this.softkeyDataGlobal = null;
	//h ???? softkey ���� ����. function�� �����Ͽ� Ű�� �������� ���� ���� �Լ��� �����Ѵ�. ????
	this.softkeyFuncGlobal = null;

	//h ???? softkeySetList ���� ����. Data�̹Ƿ�, Json ���·� ���� �����Ѵ�. makeContents() �� �����ϴ� �Ͱ� ���� �������� ������ �� �ִ�. ????
	this.softkeySetListData = null;
	//h ???? softkeySetList ���� ����. function�� �����Ͽ� Ű�� �������� ���� ���� �Լ��� �����Ѵ�. ????
	this.softkeySetListFunc = null;
	//h ???? 
	this.setListSelectData = null;

	// get data periodically
	this.rssAutoRefreshTime = 0;

	//h ������ ������ �����͸� ������ ȭ���� �����Ѵ�. DOM Element���� . 
	//h �̰� ���� useRssCache �ʹ� �������. 
	this.isAlwaysNewSubScene = false; 
	//h AutoRefresh�� ����ų��, �ٸ� Subscene�� ȭ�� ������ �ϰ� �� ���ΰ�( true : ȭ�� ���� �ϰ� �Ѵ�. ).
	this.isAutoRefreshChangeOtherSubscene = true;
	//h Refresh�� ����ų��, �ٸ� Subscene�� ȭ�� ������ �ϰ� �� ���ΰ�( true : ȭ�� ���� �ϰ� �Ѵ�. ).
	this.isRefreshChangeOtherSubscene = false;

	//h WebApplication �� �ٽ� �������� ��, pageCache = true�̸� ���� ȭ���� ���� �����ش�.
	this.pageCache = false;
	//h ???? 
	this.name = "NoName";
	//h �׸�. 
	this.theme = "";
	//h  �� ���� �̻��̸� ������ǥ�� ǥ��.
	this.ellipsisStringNum = 20;
	

	//h Idle �����϶� ( �ʱ���� )�϶��� width. widget ����Ǹ� �ڵ����� ����ǹǷ�, config.xml���� ���� ���⵵ ���ľ� �ȴ�. 
	this.widgetIdleWidth = 368;
	//h Idle �����϶� ( �ʱ���� )�϶��� height. 
	this.widgetIdleHeight = 188;
	//h ���ݻ��°� touchXXXX �̺�Ʈ�� ����ϴ���, ���콺�� mouseXXXX �̺�Ʈ�� ����ϴ��� �Ǵ�.
	this.eventType = null;
	//h �� ������ Ÿ�̹� ����    ???? 
	this.tabPageTimming = "after";
	

	this.$ = window.$;
	
	// constants
	this.AJAXREADYSTATE = {
		//d 0: The request is uninitialized (before you've called open()).
		//d 1: The request is set up, but not sent (before you've called send()).
		//d 2: The request was sent and is in process (you can usually get content headers from the response at this point).
		//d 3: The request is in process; often some partial data is available from the response, but the server isn't finished with its response.
		//d 4: The response is complete; you can get the server's response and use it.
		"UNINIT"		: 0,
		"NOTSENT"		: 1,
		"SENDING"		: 2,
		"RECEIVING"		: 3,
		"DONE"			: 4
	};
	//h TouchEvent �� ���Ǵ� addEventListener() �� �̺�Ʈ ���ڿ� ���
	
	 this.EVENTSTRING = {
         FLICK_LEFT :    "flickLeft"     ,
         FLICK_RIGHT :   "flickRight"    ,
         FLICK_UP :       "flickUp"      ,
         FLICK_DOWN :     "flickDown"    ,
         DRAG :           "drag"   ,
         SWIPE :       "swipe"  ,
         TAP :            "tap"    ,
         LONG_TAP :       "longTap"      ,
         DOUBLE_TAP :     "doubleTap"    ,
         TOUCH_START :    "touchStart"   ,
         TOUCH_MOVE :     "touchMove"    ,
         TOUCH_END :      "touchEnd"
	 };

//h TouchEvent���� Flick, doubleTap, LongTap ���� ����( millisec )
	this.TouchTimer = {
        FLICK : 1000,
	    doubleTap : 600,
	    longTap : 1000    
    };
})();


//h riff ���
var riff = function( _s ) {
	return new riff.fn.selector( _s );
};

//h �Լ� Ȯ��. �ַ� $.fn() �� �� ����, $().XXX �� ���·� ���. 
riff.fn = riff.prototype = {

	rss : function( _data ) 
	{
		//h _data�� ���ų�, object�� �ƴϰų�, array�� �ƴϸ� failed
		if ( !_data && typeof( _data ) != 'object'  && !riff.isArray(_data.runs) ) 
		{
			return false; 
		}

		//h data.js�� interface
		var fnLayout								= _data.layout[0];										// layout function
		var fnLayoutParams					= _data.layout[1];										// layout params
		var opts									= _data.opts;												// option (error Code)
		var successFnAfterXML				= _data.successFnAfterXML;						// successCallback Function
		var fnLayoutArray					= new Array();
		var listMode								= false;

		//h list ���ϰ� tab ���� �ٸ���.
		
		fnLayoutArray.push( fnLayoutParams );			// arguments[0] => layout params
		fnLayoutArray.push( _data.runs );					// arguments[1] => runs
		fnLayoutArray.push( opts );					// arguments[2] => ajaxOption
		fnLayoutArray.push( successFnAfterXML );		// arguments[3] => successCallback function

		//h ���̾ƿ��� ���� ����
		fnLayout.apply( this, fnLayoutArray );
	},


	//h ���ڰ����� selector ���ڿ� Ȥ�� DOM Element �� ������, �ش� DOM Element�� �����Ͽ� riff ��ü�� �����ش�.
	//h ���ڰ����� �Լ��� ������, riff.load() �Լ��� �̿��Ͽ� window ��ü�� load �� �Ŀ� ����ǵ��� �Ѵ�.
	//h ���ڰ�:
	//h		_s : �Լ�, ���ڿ�, DOM Element 
	//h ��ȯ��:
	//h		riff ��ü
	selector : function ( _s )
	{
		var cArray;

		// argument : function
		if( !_s )
	    {
			cArray = new Array();
		}
		else if( typeof _s == "function" )
		{
			riff.load( _s );
			return;
		}
		//h argument : DOM object( �ܼ� )
		else if ( _s == window || _s == document || _s.nodeType )
		{
			cArray = new Array();
			cArray[0] = _s;
		}
		//h argument : DOM object( ���� )
		else if( typeof _s == "object" )
		{
			cArray = _s;
		}
		// else search dom elements
		else
		{
			cArray = document.querySelectorAll(_s);
		}

		this.componentContext = this.contextToComponent(cArray);
		this.length = this.componentContext.length;

		return this;
	},

	//h �Էµ� ������ �Ǵ��Ͽ�, �����ӿ�ũ ���� ��ü�� ��ȯ�Ѵ�.
	//h �Էµ� node�� className �� ����, ������� component ��ü��, ���� �ƴ϶�� riff ��ü�� ��ȯ
	//h ���ڰ� : 
	//h		_cArray : DOM Element ( �ܼ�, ���� )
	//h ��ȯ�� : 
	//h		component��ü �迭
	contextToComponent : function ( _cArray )
	{
		var rArray = new Array();

		for ( var i = 0; _cArray[i]; i++ )
		{
			var c = _cArray[i];
			var id = _cArray[i].id;
			var classname = " " + _cArray[i].className + " ";

			//h className�� �����( component ) �� DOM Element�� ���
			if ( classname )
			{			
				if( classname.indexOf(" idle " ) != -1 )
					rArray[i] = new ComponentIdle( c );
				else if ( classname.indexOf(" title ") != -1 )
					rArray[i] = new componentTitle( c );
				else if ( classname.indexOf(" setTitle ") != -1 )
					rArray[i] = new ComponentSettingTitle( c );
				else if ( classname.indexOf(" setList ") != -1 )
					rArray[i] = new ComponentSettingList( c );		
				else if ( classname.indexOf(" list ") != -1 )
					rArray[i] = new ComponentList( c );		
				else if ( classname.indexOf(" softkey ") != -1 )
					rArray[i] = new ComponentSoftKey( c );
				else if ( classname.indexOf(" popup ") != -1 )
					rArray[i] = new ComponentPopup( c );
				else if ( classname.indexOf(" scene ") != -1 )
					rArray[i] = new ComponentScene( c );
				else if ( classname.indexOf(" tab ") != -1 )
					rArray[i] = new ComponentTab( c );
				else if ( classname.indexOf(" busyIndicator ") != -1 )
					rArray[i] = new ComponentBusyIndicator( c );
				else if ( classname.indexOf(" feedReceiveTime ") != -1 )
					rArray[i] = new ComponentReceiveRssTime( c );
				else if ( classname.indexOf(" btn ") != -1 )
					rArray[i] = new ComponentButton( c );
			}
			
			//h className�� �����(component)�� �ƴ� DOM Element�� ���
			if( !rArray[i] )
				rArray[i] = new riffBasic( c );
		}

		return rArray;
	},

	//h ������ DOM Element �� ����.
	//h ��ȯ�� : 
	//h		component�� ���� Ȥ�� DOM element�� ����.
	size : function ()
	{
		return this.length;
	},

	//h JQuery�� each�� ����. ���ǵ� DOM Element��( �ܼ� Ȥ�� ���� ) �� ���� ���ڷ� ���� �Լ��� �����Ѵ�.
	//h ���ڰ�:
	//h		_func : ������ �Լ���
	//h ��ȯ��:
	//h		riff ��ü
	// each
	//		Iterate over a riff object, executing a function for each matched element.
	// parameters : 
	//		_func : function to execute. 
	// example
	//   .each( function ( index ) { ... } )
	each : function( _func )
	{
		//h ���ڰ� �˻�.
		if( !_func || typeof( _func ) != 'function' ) return this;
		
		for (var k = 0; this.component(k); k++ )
			_func.call( this.dom(k), k );

		return this;
	},

	//h ���õ� ��ҵ� �� �־��� selector�� ��ġ�Ǵ� ��ҵ��� ã�´�.
	//h ��. ���� _s �� "#listID1" �̸�, ���ǵ� DOM Element �� ���̵� listID1 �� DOM Element �� �����Ѵ�.
	//h ���� �Է� ������ ���� #id, .class, tagName �̴�.
	//h ���ڰ�:
	//h		_s: ���ڿ�( id, className Ȥ�� tagName ). 
	//h ��ȯ��:
	//h		riff ��ü.
	// filter
	//   Reduce the set of matched elements to those that match the selector or pass the function's test 
	//   ( #id, .class, tagName )
	//
	// parameters
	//   _s : selector string (#id, .class, tagName)
	// return
	//   riff Object
	//
	// example
	//   .filter("#id .class DIV");
	filter : function ( _s )
	{
		//h ���ڰ� �˻�.
		if(!_s || typeof _s != "string")
			return this;

		//h �˻� ���ڿ�(selector) �� " " �� �������� �迭�� �ִ´�. 
		var selectorItems = (riff.trim(_s.split(".").join(" .").split("#").join(" #"))).split( /\s+/ ),
			l = selectorItems.length,
			cArray = new Array(),
			j;
		for ( var i =0, e; e = this.dom(i); i++ )
		{	
			for( j = 0; j < l; j++)
				if( ( selectorItems[j].substr(0,1) == "#"  // if #id
					&& e.id != selectorItems[j].substring(1, selectorItems[j].length) ) 
				|| (selectorItems[j].substr(0,1) == "." // if class
					&& !riff(e).hasClass( selectorItems[j].substring(1, selectorItems[j].length) ) )
				|| ( selectorItems[j].substr(0,1) != "#" && // if tag name
					selectorItems[j].substr(0,1) != "." &&
					e.nodeName.toString().toUpperCase() != selectorItems[j].toUpperCase() ) )
					break;
					
			if ( j == l )
				cArray.push( e );
		}

		return riff(cArray);
	},

	
	//h filter �� �ٸ���, ���ڷ� ���� ���� �����ϰ� �������� �����.
	//h ���ڰ�:
	//h		_s: ���� Ȥ�� ���ڿ�( id, className Ȥ�� tagName ) Ȥ�� DOM Element( �ܼ� Ȥ�� ����)	
	//h			���ڿ� : ������ DOM Element �� ������ ���ǹ�( id, className Ȥ�� tagName �� ���� ) 
	//h			���� : ���ǵ� DOM Element �� �迭�� ����, �� �� ������ ���� ( index��°�� DOM Element�� ���� )
	//h			DOM Element( �ܼ� Ȥ�� ���� ) : ������ DOM Element. 
	//h ��ȯ��:
	//h		( ���ڷ� ������ DOM Element �� ���ŵ� ) riff ��ü.
	not : function ( _s )
	{
		//h ���ڰ� �˻�.
		if( _s == undefined || _s == null ) {
			return this;
		//h ���ڸ� �Է¹�����, DOM Element�� index�� �Ǵ� 
		} else if ( typeof _s == "number" ) 
		{
			var cArray = new Array();
				
			for( var i = 0, e; e = this.dom(i); i++ )
				if( i != _s )
					cArray.push( e );
			
			return riff( cArray );			
		}
		else if ( typeof _s == "object" )
		{
			//h DOM Element�� �Է¹�����, ������ DOM Element�� �Ǵ� 
			var cArray = new Array();
			
			for(var i = 0, e; e = this.dom(i); i++ )
				if( this.dom(i) != _s )
					cArray.push( e );
			
			return riff( cArray );
		}
		else if( typeof _s == "string" )
		{
			//h �˻� ���ڿ�(selector) �� " " �� �������� �迭�� �ִ´�. 
			var selectorItems = (riff.trim(_s.split(".").join(" .").split("#").join(" #"))).split( /\s+/ ),
				l = selectorItems.length,
				cArray = new Array(),
				j;
		
			for ( var i =0, e; e = this.dom(i); i++ )
			{
				for( j = 0; j < l; j++)
					if( ( selectorItems[j].substr(0,1) == "#"  // if #id
						&& e.id == selectorItems[j].substring(1, selectorItems[j].length) ) 
					|| (selectorItems[j].substr(0,1) == "." // if class
						&& riff(e).hasClass( selectorItems[j].substring(1, selectorItems[j].length) ) )
					|| ( selectorItems[j].substr(0,1) != "#" && // if tag name
						selectorItems[j].substr(0,1) != "." &&
						e.nodeName.toString().toUpperCase() == selectorItems[j].toUpperCase() ) )
						break;
				
				if ( j == l )
					cArray.push( e );
			}
			
			return riff( cArray );
		}
		
		return this;
	},

	//h ���ǵ� DOM Element �� ����. 
	//h ���� _deep�� true�� child node ����.  
	//h ���ڰ�:
	//h		_deep : boolean. true�� �ڼ�( descendant )�� ����.
	//h ��ȯ��:
	//h 	riff ��ü.
	//h clone �׽�Ʈ�ڵ�
	clone : function( _deep ) 
	{	
		var cArray = new Array();

		for(var i=0, e; e = this.dom(i); i++)
			cArray.push( this.dom().cloneNode( _deep ) );

		return riff( cArray );
	},

	//h ���ڰ��� class�� ���ǵ� DOM Element �� �ִ��� ������ �Ǵ�.
	//h ���ǵ� DOM Element �� ���� ���� ���, ���� �� node �� �ϳ��� ������ false. ��� �� ������ true ��ȯ.
	//h ���ڰ�:
	//h		_class : Ȯ���� ���ڿ�
	//h ��ȯ��:
	//h 	riff ��ü.
	hasClass : function ( _class )
	{
		//h ���ڰ� �˻�.
		if( !_class || typeof(_class) != 'string' ) return true;

		//h ���� ����
		var classNames = (_class || "").split( /\s+/ );
		for (var i =0; this.dom(i); i++)
			for(var j=0; j<classNames.length; j++)
				if( (" " + this.dom(i).className + " ").indexOf( " " + classNames[j] + " ") == -1)
					return false;

		return true;
	},

	//h Ŭ���� ���� ���ڿ� �߰�.
	//h ���ڰ� ���ڿ���, ���ǵ� DOM Element�� class ���� �߰��Ѵ�.
	//h ���ڰ� ���ڿ��� DOM Element�� class ���� ���� ������ �߰��ϰ�, ������ �߰����� �ʴ´�.( ���� �� �ι� �Ⱦ���. )
	//h ���� ���� addClass() �� ���, ���ǵ� ��� DOM Element �� class���� �߰��Ѵ�. 
	//h ���ڰ�:
	//h		_class : �߰��� ���ڿ�
	//h ��ȯ��:
	//h 	riff ��ü.
	addClass : function ( _class )
	{
		//h ���ڰ� �˻�.
		if( !_class || typeof(_class) != 'string' ) return this;

		//h ���� ����
		var classNames = (_class || "").split( /\s+/ );

		for ( var i = 0; this.component(i); i++ )
		{
			var c = this.dom(i);

		    //h className�� �������� ������,  _class �� �ٷ� �ְ� ������.
			if ( !c.className )
		    	c.className = riff.trim(_class);
		    // if exist
		    else
		    {
		    	var className = " " + c.className + " ", setClass = c.className;
		    	for ( var k = 0, cl = classNames.length; k < cl; k++ )
		    		if ( className.indexOf( " " + classNames[k] + " " ) < 0 )
		    			setClass += " " + classNames[k];

		    	c.className = riff.trim(setClass);
		    }
		}

		return this;
	},

	//h DOM Element �� class ������ ���ڰ� ���ڿ��� �����Ѵ�.
	//h ���ǵ� DOM Element �� ���� ���� ��, ������ DOM Element �� ��� replace�� �����Ѵ�.
	//h ���ڰ��� null �� ��, ���ǵ� DOM Element ������ ��� class���� �����.
	//h ���ڰ�:
	//h		_class : ���� ���ڿ�
	//h ��ȯ��:
	//h 	riff ��ü.
	// removeClass
	//   Remove the class(es) from each element in the set of matched elements.
	//   argument : doesn't exist -> remove all classes.
	//
	// parameters
	//   _class : class name
	// return
	//   riff Object
	removeClass : function ( _class )
	{
		if( !_class || typeof(_class) != 'string' ) return this;

		var classNames = (_class || "").split( /\s+/ );

		for ( var i = 0; this.component(i); i++ )
		{
			var c = this.dom(i);

		    if( !c.className || !_class)
				c.className = "";
		    else if( c.className )
		    {
		    	var className = (" " + c.className + " ").replace( /[\n\t]/g, " ");
		    	for ( var k = 0, cl = classNames.length; k < cl; k++ )
		    		className = className.replace(" " + classNames[k] + " ", " ");
		    	c.className = riff.trim( className );
		    }
		}

		return this;
	},

	//h �Էµ� ���ڰ��� class ���� �ִٸ� �����, ���ٸ� �߰��Ѵ�. 
	//h ������ ���, �Էµ� ���ڰ��� class ���� �ִٸ� �����, ���ٸ� �߰��Ѵ�. 
	//h ���� ���� DOM Element�� ���� ���� �۾��� �ݺ�. 
	//h ���ڰ�:
	//h		_class : ������ �����, ������ �߰��� ���ڿ�
	//h ��ȯ��:
	//h 	riff ��ü.
	// toggleClass
	//   Add or delete one or more classes from each element in the set of matched elements,
	//   has _class : delete _class
	//   doesn't _class : add _class.
	//
	// parameters
	//   _class : class name
	// return
	//   riff Object
	toggleClass : function ( _class )
	{
		if( !_class || typeof(_class) != 'string' ) return this;

		var classNames = (_class || "").split( /\s+/ );
		for ( var i = 0; this.component(i); i++ )
		{
			var c = this.dom(i);

		    if( !c.className)
   				c.className = riff.trim(_class);
		    else
		    {
		    	for ( var k = 0, cl = classNames.length; k < cl; k++ )
		    	{
		    		if( riff(c).hasClass(classNames[k]) )
		    			riff(c).removeClass(classNames[k]);
		    		else
		    			riff(c).addClass(classNames[k]);
		    	}
		    }
		}

		return this;
	},

	//h ������ Save / Load �Լ�.
	//h �����迭�� riffGlobal.buffer �迭�� ���� �����Ѵ�.
	//h ���ڰ� name�� key��, ���ڰ� data �� data �̴�.
	//h ���� �迭�� index�����δ�, class���� �����ϰ� �Ҵ�� riffGlobal.prefixBufferID ���� �̿��Ѵ�. 
	//h ( prefix + ����( ������ ) )
	//h index�� DOM Element �������� �ο��ǹǷ�, �迭���� �ϳ��� index�� prefix + index�� ���·� �� DOM Element ���� �ο��ȴ�.
	//h DOM Element�� �������̰� _name, _data ���� �����Ǹ�, ���õ� ��� DOM Element�� ���� �����迭�� _name�� Ű ������ _data �� ����ȴ�.
	//h DOM Element�� �������̰� _name ���� �����Ǹ�, ���õ� DOM Element �� �� ù��° DOM Element�� ���� _name�� Ű ������ _data �� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		_name : key�� ����� ���ڿ�.
	//h		_data : ������ ��.
	//h ��ȯ��:
	//h		���ڰ� _name�� null or undefined �� �� : return���� ����( ��ȯ�� ���� ).
	//h		���ڰ� _name���� �� : ������ ( _data ) ��.
	//h		���ڰ� _name, _data �� �� : �������� ���� ( _data ) ��. 
	//h		_name ���ڿ� ���� _data���� ���� ��: "" ��ȯ. 
	// buffer
	//   set or get buffer data in object buffer space
	//
	// parameters
	//   _name : key ( string )
	//   _data : value (optional)
	// return
	//   if set : riff Object
	//   if get : value
	buffer : function ( _name, _data )
	{
		//h _name�� ���ų� string�� �ƴϸ�, �Լ� ����.
		if( !_name || typeof( _name ) != 'string' ) return;

		if( arguments.length == 2)				//set mode 
		{
			return this.each( function()
			{
		    		var classNames = (this.className || "").split( /\s+/ );
					//h ���õ� DOM Element�� class ���� buffer ����� prefix + id�� ������ ���� ��
		    		for ( var i = 0; i<classNames.length; i++)
		    		{
		    			if ( classNames[i].substr(0,riffGlobal.prefixBufferID.length) == riffGlobal.prefixBufferID)
		    			{
		    				var bufferID = window.parseInt( classNames[i].substring(
		    						classNames[i].indexOf( riffGlobal.prefixBufferID ) + riffGlobal.prefixBufferID.length,
		    						classNames[i].length ) );
		    				riffGlobal.buffer[bufferID][_name] = _data;
		    				break;
		    			}
		    		}

				//h ���õ� DOM Element�� class ���� buffer ����� prefix + id�� ������ ���� ���� ��
		    		if( i == classNames.length )
		    		{
					//h buffer ����� prefix + id�� ���� ����
					var bufferID = ++riffGlobal.bufferID;
					//h ���� ������ prefix + id�� ���� �迭�� ���� ���� ����( index : prefix + id ).
		    			riffGlobal.buffer[ bufferID ] = {};
		    			riff(this).addClass( riffGlobal.prefixBufferID + riffGlobal.bufferID );
					//h �� ����.
		    			riffGlobal.buffer[bufferID][_name] = _data;
		    		}
	    		});
		} 
		else if( arguments.length == 1)			//get mode
		{
			//h ���ǵ� DOM Element �� ���� ���� ��, �� ù ��°�� DOM Element�� ���� �����͸� ��������.
			var c = this.dom();

		   	if( c && c.className )
		   	{
		   		var classNames = (c.className || "").split( /\s+/ );
		   		for ( var i = 0; i<classNames.length; i++)
		   		{
		   			if ( classNames[i].substr(0,riffGlobal.prefixBufferID.length) == riffGlobal.prefixBufferID)
		   			{
		   				var bufferID = window.parseInt(classNames[i].substring(
		   					classNames[i].indexOf( riffGlobal.prefixBufferID ) + riffGlobal.prefixBufferID.length,
		   					classNames[i].length ));

		   				return riffGlobal.buffer[bufferID][_name];
		   			}
		   		}
		   	}
			//h _name�� �ش��ϴ� ���� ��������, "" �� ��ȯ�Ѵ�.
		    return "";
		}
	},

	//h ���õ� DOM Element�� ���� DOM Element �� Node Type�� ELEMENT_NODE�� ���� DOM Element�� �����Ѵ�. 
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : prev �� ����� ���� DOM Element ���θ� ��ȯ�Ѵ�.
	//h		_s �� �� : filter�� ������ ��. prev �� ����� ���� DOM Element �� _s�� �ش��ϴ� ��带 ��ȯ�Ѵ�.
	//h			���ڰ��� _s�� ���ڿ�( selector )�� ���� ID, class, tag�� ������ �� �ִ�. 
	//h ��ȯ��:
	//h 	riff ��ü.
	// prev
	//   Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.
	//
	// parameters
	//   _s : selector string ( optional )
	// return
	//   riff Object
	prev : function( _s )
	{
		var cArray = new Array();

		for ( var i = 0, e; e = this.dom(i); i++ )
		{
			cArray[i] = e.previousSibling;

			while(cArray[i] && cArray[i].nodeType != 1)
				cArray[i] = cArray[i].previousSibling;
		}

		return riff( cArray ).filter( _s );
	},

	//h ���õ� DOM Element�� ���� DOM Element �� Node Type�� ELEMENT_NODE�� ���� DOM Element�� �����Ѵ�. 
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : next �� ����� ���� DOM Element ���θ� ��ȯ�Ѵ�.
	//h		_s �� �� : filter�� ������ ��. next �� ����� ���� DOM Element �� _s�� �ش��ϴ� ��带 ��ȯ�Ѵ�.
	//h			���ڰ��� _s�� ���ڿ�( selector )�� ���� ID, class, tag�� ������ �� �ִ�. 
	//h ��ȯ��:
	//h 	riff ��ü.
	// next
	//   Get the immediately following sibling of each element in the set of matched elements, optionally filtered by a selector.
	//
	// parameters
	//   _s : selector string (optional)
	// retrun
	//   riff Object
	next : function( _s )
	{
		var cArray = new Array();

		for ( var i = 0, e; e = this.dom(i); i++ )
		{
			cArray[i] = e.nextSibling;

			while(cArray[i] && cArray[i].nodeType != 1)
				cArray[i] = cArray[i].nextSibling;
		}

		return riff( cArray ).filter(_s);
	},

	//h ���õ� DOM Element�� �θ� DOM Element �� Node Type�� ELEMENT_NODE�� �θ� DOM Element�� �����Ѵ�. 
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : parent �� ����� �θ� DOM Element ���θ� ��ȯ�Ѵ�.
	//h		_s �� �� : filter�� ������ ��. parent �� ����� �θ� DOM Element �� _s�� �ش��ϴ� ��带 ��ȯ�Ѵ�.
	//h			���ڰ��� _s�� ���ڿ�( selector )�� ���� ID, class, tag�� ������ �� �ִ�. 
	//h ��ȯ��:
	//h 	riff ��ü.
	// parent
	//   Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
	//
	// parameters
	//   _s : selector string (optional)
	// retrun
	//   riff Object 
	parent : function( _s )
	{
		var cArray = new Array();
		
		for (var i = 0, e; e = this.dom(i); i++ )
		{
			// remove duplicated nodes
			var j, l = cArray.length;
			
			for ( j=0; j < l; j++)
				if( cArray[j] == e.parentNode)
					break;

			if( j == l )
				cArray.push( e.parentNode  );
		}

		return riff( cArray ).filter(_s);
	},

	//h ���ǵ� DOM Element�� �ڽ� DOM Element ���� ��� �����Ѵ�.
	//h ���ǵ� DOM Element�� ���� ���� ���, ���ǵ� ��� DOM Element ������ �ڽ� DOM Element �� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : ���ǵ� DOM Element�� �ڽ� DOM Element ���� ��� ������ ��ȯ�Ѵ�.
	//h		_s �� �� : filter�� ������ ��. contents �� ����� �ڽ� DOM Element �� _s�� �ش��ϴ� ��带 ��ȯ�Ѵ�.
	//h			���ڰ��� _s�� ���ڿ�( selector )�� ���� ID, class, tag�� ������ �� �ִ�. 
	//h ��ȯ��:
	//h 	riff ��ü.
	// contents
	//   Get the children of each element in the set of matched elements, including text and comment nodes.
	//
	// parameters
	//   _s : selector string (optional)
	// retrun
	//   riff Object 
	contents : function( _s )
	{
		var cArray = new Array();

		for(var i =0, e; e = this.dom(i); i++ )
		{
			for(var j = 0, l = e.childNodes.length; j < l; j++)
				cArray.push( e.childNodes[j] );
		}

		return riff( cArray ).filter( _s );
	},

	//h ���ǵ� DOM Element�� childNodes��, Node Type�� ELEMENT_NODE�� ���� �����Ͽ� ��ȯ�Ѵ�. ( NodeType �� 1�� �͸� ���� )
	//h ���ǵ� DOM Element�� ���� ���� ���, ���ǵ� ��� DOM Element ������ Node Type�� ELEMENT_NODE�� ���� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : ���ǵ� DOM Element�� childNodes��, Node Type�� ELEMENT_NODE�� ���� �����Ͽ� ��ȯ�Ѵ�.
	//h		_s �� �� : filter�� ������ ��. children �� ����� DOM Element �� _s�� �ش��ϴ� ��带 ��ȯ�Ѵ�.
	//h			���ڰ��� _s�� ���ڿ�( selector )�� ���� ID, class, tag�� ������ �� �ִ�. 
	//h ��ȯ��:
	//h 	riff ��ü.
	// children
	//   Get the children of each element in the set of matched elements, optionally filtered by a selector.
	// 
	// parameters
	//   _s : selector string (optional)
	// retrun
	//   riff Object 
	children : function( _s )
	{
		var cArray = new Array();

		for(var i = 0, e; e = this.dom(i); i++ )
		{
			var childTemp = e.childNodes;
			for( var j =0; childTemp && childTemp[j]; j++ )
			{
				if ( childTemp[j].nodeType == 1 )
					cArray.push( childTemp[j] );
			}
		}

		return riff( cArray ).filter(_s);
	},

	//h ���õ� DOM Element�� ���� DOM Element �� Node Type�� ELEMENT_NODE�� �͵��� �����Ѵ�.
	//h ���õ� DOM Element�� ���� ���� ���, ��� DOM Element�� siblings() �� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : ���õ� DOM Element�� ���� DOM Element �� Node Type�� ELEMENT_NODE�� �͵��� �����Ͽ� ��ȯ�Ѵ�.
	//h		_s �� �� : filter�� ������ ��. siblings �� ����� DOM Element �� _s�� �ش��ϴ� ��带 ��ȯ�Ѵ�.
	//h			���ڰ��� _s�� ���ڿ�( selector )�� ���� ID, class, tag�� ������ �� �ִ�. 
	//h ��ȯ��:
	//h 	riff ��ü.
	// siblings
	//   Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
	//
	// parameters
	//   _s : selector string (optional)
	// retrun
	//   riff Object 
	siblings : function ( _s )
	{
		var cArray = new Array();
		
		for ( var i = 0, e; e = this.dom(i); i++ )
		{			
			var p = e.previousSibling,
				n = e.nextSibling,
				tArray = new Array();
			
			// previous
			while( p )
			{
				if ( p.nodeType == 1)
				{
					var j,
						l = tArray.length;
				
					for( j = 0; j < l; j++)
						if ( tArray[j] == p )
							break;
					
					if( j == l)
						tArray.push(p);
				}
				
				p = p.previousSibling;
			}
			
			// reverse
			tArray.reverse();
			
			// next
			while( n )
			{
				if ( n.nodeType == 1)
				{
					var j,
						l = tArray.length;
				
					for( j = 0; j < l; j++)
						if ( tArray[j] == n )
							break;
					
					if( j == l)
						tArray.push(n);
				}
				
				n = n.nextSibling;
			}
			
			for( var j = 0; e = tArray[j]; j++)
			{
				var k,
					l = cArray.length;
				
				for( k = 0; k < l; k++)
					if ( cArray[k] == e )
						break;
					
				if( k == l)
					cArray.push(e);
			}
			
		}

		return riff( cArray ).filter( _s );
	},

	//h ���õ� DOM Element�� ����, index ��°�� DOM Element�� �����Ͽ� ��ȯ�Ѵ�.
	//h _idx�� ������ ��� ���, �� riff Object�� ��ȯ�Ѵ�. 
	//h ���ڰ��� �Էµ��� ������, ù��° DOM Element�� �����Ͽ� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� ��� : _idx �� 0 �� �Ͱ� ���� ȿ��.
	//h		_idx : 0 ���� ū ����. ������ DOM Element�� ���� (zero-based).
	//h			_idx �� ���� �̿��� ���� ������, _idx �� 0 �� �Ͱ� ���� ȿ��.
	//h ��ȯ��:
	//h 	riff ��ü.	
	// eq
	//   Reduce the set of matched elements to the one at the specified index.
	//
	// parameters
	//   _idx : index (number)
	// return
	//   riff Object
	eq : function( _idx )
	{
		var cArray = new Array();

		var e = this.dom(_idx);
		if ( e )
			cArray.push( e );

		return riff( cArray );
	},
	
	//h ���õ� DOM Element�鿡 ���ڰ����� �Էµ� ����鿡 �ش��ϴ� DOM Element�� �߰��Ѵ�.
	//h ���ڰ�:
	//h		_data : selector( ���ڿ� ) Ȥ�� riff ��ü.
	//h			selector ( ���ڿ� ) �̶��, �ش� ���ڿ��� ���ǵ� DOM Element ���� �߰��Ѵ�.
	//h			riff ��ü���, riff��ü�� ��� �ִ� DOM Element ���� �߰��Ѵ�.
	//h ��ȯ��:
	//h 	riff ��ü.	
	// add
	add : function( _data )
	{
		if( typeof _data == "object" )
		{
			var cArray = new Array();
			
			for ( var i = 0, e; e = this.dom(i); i++ )
				cArray.push( e ) ;
			for ( var i = 0, e; e = _data.dom(i); i++ )
			{
				var j, tl = this.size();
				for ( j = 0; j < tl; j++ )
					if ( e == this.dom(j) )
						break;
						
				if( j == tl )
					cArray.push( e ) ;
			}
				
			return riff( cArray );
		}
		else if( typeof _data == "string" )
			return this.add( riff(_data) );
		
		return this;
	},

	//h ���õ� DOM Element�� Attribute�� �����ϰų� �����´�. 
	//h Attribute �̸�( _name ) �� ������ ù��° DOM Element ��ü�� �Ӽ��� ����
	//h Attribute ����( _data ) �� ���� ������ ��� ��ü ����
	//h ���õ� DOM Element�� ���� ���̰� ���ڰ��� 1��( _name ) �� ��, ���õ� DOM Element �� ù��° DOM Element��( eq(0) ) name �� �ش��ϴ� Attribute�� ��ȯ�Ѵ�.
	//h ���õ� DOM Element�� ���� ���̰� ���ڰ��� 2��( _name, _attr ) �� ��, ���õ� DOM Element ��ο� ���� �Ӽ����� �����Ѵ�.
	//h ���ڰ�:
	//h		_name : Attribute �̸�( ���ڿ� ).
	//h		_data : Attribute ������( ���ڿ� ).
	//h ��ȯ��:
	//h 	riff ��ü.	
	// attr
	//   Get or set the value of an attribute for the first element in the set of matched elements.
	//
	// parameters
	//   _name : attribute name
	//   _attr : attribute value (optional)
	// 
	// return
	//   if _attr exists, attribute value for the first element
	//   else riff Object
	attr : function ( _name, _attr )
	{
		if( arguments.length == 1 )
			return (this.dom())?this.dom().getAttribute(_name):"";
		else if ( arguments.length == 2 )
			return this.each( function()
			{
				this.setAttribute( _name, _attr );
			} );
	},

	//h riff ��ü�� ���� DOM Element �� ��ȯ�Ѵ�.
	//h _idx�� ������ ���� ���, null�� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		_idx : ��ȯ ���� DOM Element�� ����( ���� ).
	//h ��ȯ��:
	//h 	���� ���� ��� : DOM Element.
	//h 	���� ���� ��� : null.
	// dom
	//   return dom element
	//
	// parameters
	//  _idx : index   
	//
	// return
	//   _idx doesn't exist : the first dom element
	//   else the (_idx)th dom element
	dom : function ( _idx )
	{
		if ( isNaN( window.parseInt( _idx ) ) ) _idx = 0;

		return ((!this.componentContext[_idx]) ? null : this.componentContext[_idx].elementContext);
	},

	//h riff ��ü�� ���� component �� ��ȯ�Ѵ�.
	//h _idx�� ������ ���� ���, null�� ��ȯ�Ѵ�.
	//h ���ڰ�:
	//h		_idx : ��ȯ ���� DOM Element�� ����( ���� ).
	//h ��ȯ��:
	//h 	���� ���� ��� : riff Component.
	//h 	���� ���� ��� : null.
	// component
	//   return component object
	//
	// parameters
	//  _idx : index   
	//
	// return
	//   _idx doesn't exist : the first component object
	//   else the (_idx)th component object
	component : function ( _idx )
	{
		if ( isNaN( window.parseInt( _idx ) ) ) _idx = 0;

		return (!this.componentContext[_idx]) ? null : this.componentContext[_idx];
	},


	//h �ش� ���� ��ü�߿� ���° ���� �˷��ش�. 
	//h DOM Element�� ���� ���� ���, ���õ� DOM Element �� ù��° DOM Element��( eq(0) ) �� ���� index() �� �����Ѵ�.
	//h ��ȯ��:
	//h 	���°( ���� )
	// index
	//   Search for first matched element's index from among the sliblings.
	//
	// return
	//   index (number)
	index : function ()
	{
		var c = this.dom();

		var i = 0;
		while( c )
		{
			c = c.previousSibling;
			if(c && c.nodeType==1) i++;
		}

		return i;
	},

	//h ���õ� DOM Element �� ���� ���� �����ϴ� DOM Element�� �����Ѵ�.
	//h ���� ���� �Էµ��� �ʾ��� ���,���õ� DOM Element ��ü�� �����Ѵ�.
	//h ���� ������ index�� �ԷµǾ��� ���,
	//h ���õ� DOM Element �� index ��°�� DOM Element�� �����Ѵ�.
	//h ���� ������ DOM Element�� �ԷµǾ��� ���,
	//h ���õ� DOM Element �� DOM Element�� �����Ѵ�.
	// remove
	//   remove elements
	//
	// parameters
	//   dom objects
	//   index
	//   none : all object remove
	//
	// return
	//   riff Object
	remove : function( _val )
	{
		var removeFunc = function()
		{
			this.parentNode.removeChild(this);
		};
	
		//number
		if ( typeof _val == "number" )
		{
			this.eq(_val).each( removeFunc );
		}
		//dom element
		else if ( typeof _val =="object")
		{
			for(var i =0, e; this.dom(i); i++)
			{
				if(this.dom(i) == _val)
					this.eq(_val).each( removeFunc );
			}		
		}
		else
		{
			this.each( removeFunc );
		}
		
		return this;
	},

	//h ���õ� DOM Element�� CSS Property�� �����ϰų� ������ �� �ִ�. 
	//h ���� ������ name�� �ԷµǾ��� ���, ���õ� DOM Element �� ù��° DOM Element�� name ���� �ش��ϴ� CSS Property�� ��ȯ�Ѵ�.
	//h ���� ������ name�� value�� ��� �ԷµǾ��� ���, ���õ� DOM Element���� name ���� �ش��ϴ� CSS Property�� value�� �����Ѵ�.
	//h ���ڰ�:
	//h		_name : DOM Element�� CSS Property Name String.
	//h		_value : DOM Element�� ������ CSS Style String.
	//h ��ȯ��:
	//h 	_name : CSS �Ӽ��� �ش��ϴ� ���ڿ� ��ȯ
	//h 	_name, _value : riff ��ü�� ��ȯ.
	// css
	//   Get or set the value of a style property for the element in the set of matched elements.
	//
	// parameters
	//   _name : array or string
	//   _style : style property (optional)
	//
	// return
	//   riff Object
	//   a style property for the first element ( if _style exists )
	//
	// example
	//   .css ( { "width" : "300px",
	//            "height' : "200px" } );
	//   .css ( "width", "300px" );
	//   .css ( "width" );
	css : function ( _name, _value )
	{
		if( arguments.length == 1 )
		{
			if( typeof _name == "object" )
			{
				for( var k in _name)
					this.css(k, _name[k] );

				return this;
			}
			else if( typeof _name == "string" )
			{
				var style = (_name == 'float') ? 'cssFloat' :riff.camelize(_name);
				var value = (this.dom())? this.dom().style[ style ] : null;
				if( !value || value=='auto' )
				{
					var css = document.defaultView.getComputedStyle(this.dom(), null);
					value = css ? css[style] : null;
				}
				
				return value;
			}
		}
		else if(arguments.length == 2)
		{
			//h ���� ����ڰ� css value�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
			if( typeof( _value ) != 'string' ) return this;
			return this.each( function()
			{
				if( this.style )
					this.style[ riff.trim(_name) ] = _value;
			});
		}

		return this;
	},

	//h ���õ� DOM Element�� Top���� �����ϰų� ������ �� �ִ�. 
	//h ���ڰ��� ���� ���, ���õ� DOM Element�� ���� �׷��� ��Ÿ��(Computed Style)�� Top ���� ��ȯ�Ѵ�.
	//h ���ڰ��� value �� ���, ���õ� DOM Element�� CSS Property �� Top�� value�� �����Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : DOM Element�� ������ CSS top Style String.
	//h		���ڰ��� _value : DOM Element�� ������ CSS top Style String.
	//h ��ȯ��:
	//h		���ڰ��� ���� �� : CSS top �Ӽ��� �ش��ϴ� ���ڿ� ��ȯ
	//h		���ڰ��� _value : riff ��ü ��ȯ
	// top
	//   Get or set the "TOP" value of the CSS Property for the element in the set of matched elements.	
    top : function( _value )
	{
		if( !_value )
			if( this.dom() )
				return window.parseFloat(window.getComputedStyle(this.dom()).getPropertyValue("top"));
			else
				return null;

		//h ���� ����ڰ� css value�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( isNaN( window.parseFloat(_value) ) ) return this;

		return this.each( function()
		{
			riff(this).css("top", window.parseFloat(_value) + "px" );
		});
	},

	//h ���õ� DOM Element�� Left���� �����ϰų� ������ �� �ִ�. 
	//h ���ڰ��� ���� ���, ���õ� DOM Element�� ���� �׷��� ��Ÿ��(Computed Style)�� Left ���� ��ȯ�Ѵ�.
	//h ���ڰ��� value �� ���, ���õ� DOM Element�� CSS Property �� Left�� value�� �����Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : DOM Element�� ������ CSS left Style String.
	//h		���ڰ��� _value : DOM Element�� ������ CSS left Style String.
	//h ��ȯ��:
	//h		���ڰ��� ���� �� : CSS left �Ӽ��� �ش��ϴ� ���ڿ� ��ȯ
	//h		���ڰ��� _value : riff ��ü ��ȯ
	// top
	//   Get or set the "TOP" value of the CSS Property for the element in the set of matched elements.	
	left : function( _value )
	{
		if( !_value )
			if( this.dom() )
				return window.parseFloat(window.getComputedStyle(this.dom()).getPropertyValue("left"));
			else
				return null;	

		//h ���� ����ڰ� css value�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( isNaN( window.parseFloat(_value) ) ) return this;

		return this.each( function()
		{
			riff(this).css("left", window.parseFloat(_value) + "px" );
		});
	},

	//h ���õ� DOM Element�� width���� �����ϰų� ������ �� �ִ�. 
	//h ���ڰ��� ���� ���, ���õ� DOM Element�� ���� �׷��� ��Ÿ��(Computed Style)�� width ���� ��ȯ�Ѵ�.
	//h ���ڰ��� value �� ���, ���õ� DOM Element�� CSS Property �� width�� value�� �����Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : DOM Element�� ������ CSS width Style String.
	//h		���ڰ��� _value : DOM Element�� ������ CSS width Style String.
	//h ��ȯ��:
	//h		���ڰ��� ���� �� : CSS width �Ӽ��� �ش��ϴ� ���ڿ� ��ȯ
	//h		���ڰ��� _value : riff ��ü ��ȯ
	// width
	//   Get the current computed width for the first element in the set of matched elements.
	//   Set the CSS width of each element in the set of matched elements. ( if _value exists )
	width : function( _value )
	{
		if( !_value )
			if( this.dom() )
				return window.parseFloat(window.getComputedStyle(this.dom()).getPropertyValue("width"));
			else
				return null;

		//h ���� ����ڰ� css value�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( isNaN( window.parseFloat(_value) ) ) return this;

		return this.each( function()
		{
			riff(this).css("width", window.parseFloat(_value) + "px" );
		});
	},

	//h ���õ� DOM Element�� width���� �����ϰų� ������ �� �ִ�. 
	//h ���ڰ��� ���� ���, ���õ� DOM Element�� ���� �׷��� ��Ÿ��(Computed Style)�� width ���� ��ȯ�Ѵ�.
	//h ���ڰ��� value �� ���, ���õ� DOM Element�� CSS Property �� width �� value�� �����Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : DOM Element�� ������ CSS height Style String.
	//h		���ڰ��� _value : DOM Element�� ������ CSS height Style String.
	//h ��ȯ��:
	//h		���ڰ��� ���� �� : CSS height �Ӽ��� �ش��ϴ� ���ڿ� ��ȯ
	//h		���ڰ��� _value : riff ��ü ��ȯ
	// height
	//   Get the current computed height for the first element in the set of matched elements.
	//   Set the CSS height of each element in the set of matched elements. ( if _value exists )
	height : function( _value )
	{
		if( !_value )
			if( this.dom() )
				return window.parseFloat(window.getComputedStyle(this.dom()).getPropertyValue("height"));
			else
				return null;

		//h ���� ����ڰ� css value�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( isNaN( window.parseFloat(_value) ) ) return this;

		return this.each( function()
		{
			riff(this).css("height", window.parseFloat(_value) + "px" );
		});
	},

	//h _htmlCode�� ���� ��, ���õ� DOM Element �� ù��° DOM Element�� innerHTML String�� ��ȯ.(string).
	//h _htmlCode�� ���� ��, HTML �ڵ带 ���� Ȥ�� replace�Ѵ�.
	//h _htmlCode != NULL �� ����, �迭�� ��� ��ҿ� ���� _htmlCode �� replace() �Ѵ�.(each() ó�� )
	//h	�׸��� ���� ��ü�� �����Ѵ�. ( ü�� �޼ҵ� ����)
	//h _htmlCode == NULL �� ����, �迭�� ù ��ҿ� ���ؼ��� html �ڵ带 �����Ѵ�.
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : ���õ� DOM Element �� ù��° DOM Element�� innerHTML String�� ��ȯ.
	//h		���ڰ��� _htmlCode : ���õ� ��� DOM Element�� innerHTML�� htmlCode�� ����.
	//h ��ȯ��:
	//h		���ڰ��� ���� �� : ���õ� DOM Element �� ù��° DOM Element�� innerHTML String�� ��ȯ.
	//h		���ڰ��� _htmlCode : riff ��ü ��ȯ
	// html
	//   Get or set the HTML contents of the element in the set of matched elements.
	html : function( _htmlCode )
	{
		if ( arguments.length == 0 ) {
			return (this.dom())?this.dom().innerHTML:"";
		} else {
			//h ���� ����ڰ� _htmlCode�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
			if( typeof( _htmlCode ) != 'string') return this;

			return this.each( function()
			{
				this.innerHTML = _htmlCode;
			});
		}
	},
	

	//h ����(�ؽ�Ʈ)�� ������ �Ʒ� ������ �ش��� �ؽ�Ʈ�� ����
	//h �ƴϸ� �ؽ�Ʈ ����� ���븸 ����
	//h ���ڰ�:
	//h		���ڰ��� ���� �� : ���õ� DOM Element �� ù��° DOM Element�� Text Node���� String�� ��ȯ.
	//h		���ڰ��� _text : ���õ� ��� DOM Element�� �ڽĵ��� �����ϰ� textString ���� ������ Text Node�� �ڽ����� �߰�.
	//h ��ȯ��:
	//h		���ڰ��� ���� �� : ���õ� DOM Element �� ù��° DOM Element�� Text Node���� String�� ��ȯ.
	//h		���ڰ��� _text : riff ��ü ��ȯ
	// text
	//   Set the content of each element in the set of matched elements to the specified text.
	//   Get the combined text contents of each element in the set of matched elements, including their descendants.
	text : function ( _text )
	{
		if( _text )
		{
			//h ���� ����ڰ� _text�� ���ڿ� Ȥ�� ���ڸ� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
			if( typeof( _text ) == 'number' ) _text = _text.toString();
			if( typeof( _text ) != 'string' ) return this;

			return this.each( function ()
			{
				riff(this).contents().remove();
				this.appendChild(document.createTextNode(_text));
			});
		}

		var cArray = new Array();
		for(var i=0; this.dom(i); i++)
			cArray.push(this.dom(i));

		return this.getTextByRecursive( cArray );
	},

	//h �ؽ�Ʈ ������ ��� ���� ���ȣ�� �Լ�
	//h �ڽ��� ������ �� �ڽ��� ó���ϱ� ���� ��ͷ� ���
	//h ���ڰ�:
	//h		_cArray : ���õ� ��� DOM Element.
	//h ��ȯ��:
	//h		_cArray ( DOM Element ) �� ���� ��� Text�� ������ ��ȯ.
	// getTextByRecursive
	//   it is recursive function to get a text node
	//   if the node has children, then call recursive function
	getTextByRecursive : function ( _cArray )
	{
		var rText = "";

		for ( var i =0;  _cArray[i]; i++ )
		{
			var c = _cArray[i];

			if ( c.nodeType === 3 || c.nodeType === 4 )
				rText += c.nodeValue;
			else if ( c.nodeType !== 8 )
				rText += this.getTextByRecursive( c.childNodes );
		}

		return rText;
	},

	//h ���õ� DOM Element���� ������ �ڽ����� htmlCode�� �ش��ϴ� DOM Element�� �����Ѵ�. 
	//h ���ڰ�:
	//h		_content : �������� ������ HTML Code.
	//h ��ȯ��:
	//h		riff Object
	// append
	//   Insert content to the end of each element in the set of matched elements.
	append : function ( _content )
	{
		//h ���� ����ڰ� _htmlCode�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( typeof( _content ) != 'string') return this;

		return this.each( function()
		{	
			var riffThis = riff(this),
				riffThisContents = riffThis.contents(),
				riffThisContentsSize = riffThisContents.size();

			if( riffThisContentsSize == 0)
				riffThis.html(_content);
			else
				riffThisContents.eq( riffThisContentsSize-1 ).after(_content);
		});
	},

	//h ���õ� DOM Element���� ù �ڽ����� htmlCode�� �ش��ϴ� DOM Element�� �����Ѵ�.
	//h ���ڰ�:
	//h		_content : ó�� �ڸ��� ������ HTML Code.
	//h ��ȯ��:
	//h		riff Object
	// prepend
	//   Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
	prepend : function ( _content )
	{
		//h ���� ����ڰ� _htmlCode�� ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( typeof( _content ) != 'string') return this;

		return this.each( function()
		{
			var riffThis = riff(this),
				riffThisContents = riffThis.contents();

			if( riffThisContents.size() == 0)
				riffThis.html(_content);
			else
				riffThisContents.eq().before(_content);
		});
	},

	//h ���õ� DOM Element ������ �Է¹��� htmlCode �� ���Ѵ�. ��, ���õ� DOM Element ������ htmlCode�� �ش�Ǵ� DOM Element�� �ڽ� ��尡 �ȴ�.
	//h ���ڰ�:
	//h		_content : ���õ� DOM Element �� ���� html code.
	//h ��ȯ��:
	//h		riff Object
	// wrap
	//   Wrap an HTML structure around each element in the set of matched elements.
	wrap : function ( _content )
	{
		//h ���� ����ڰ� _content ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( typeof( _content ) != 'string') return this;
		
		return this.each( function()
		{
			var divNode = document.createElement("div");
			divNode.innerHTML = _content;
			var contentNode = divNode.childNodes[0];

			var cloneNode = this.cloneNode(true);
			riff(this).parent().dom().replaceChild(cloneNode, this);
			contentNode.appendChild(this);

			riff(cloneNode).parent().dom().replaceChild(contentNode, cloneNode);
		});
	},

	//h �Է¹��� htmlCode ����, ���õ� DOM Element ��θ� ���δ� DOM Element �� �����Ѵ�. 
	//h	���õ� DOM Element ��ΰ�, htmlCode�� ������ DOM Element�� �ڽ� ��尡 �ȴ�.
	//h ���ڰ�:
	//h		_content : ���õ� DOM Element �� ���� html code.
	//h ��ȯ��:
	//h		riff Object
	// wrapAll
	//   Wrap an HTML structure around all elements in the set of matched elements.
	wrapAll : function( _content )
	{
		//h ���� ����ڰ� _content ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( typeof( _content ) != 'string') return this;

		riff(this.dom()).wrap(_content);

		for( var i = 1; this.dom(i); i++)
			riff(this.dom()).parent().dom().appendChild(this.dom(i));

		return this;
	},

	//h ���õ� DOM Element �ڿ� HtmlCode�� �߰��Ѵ�. 
	//h ��, ���õ� DOM Element���� ������, htmlCode�� �ش��ϴ� DOM Element�� �����Ѵ�.
	//h ���ڰ�:
	//h		_content : ���õ� DOM Element�� ������ ���� �� DOM Element�� �ش��ϴ� HTMLCode.
	//h ��ȯ��:
	//h		riff Object
	// after
	//   Insert content, specified by the parameter, after each element in the set of matched elements.
	after : function ( _content )
	{
		//h ���� ����ڰ� _content ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( typeof( _content ) != 'string') return this;

		return this.each( function()
		{
			var nextNode = this.nextSibling;
			var divNode = document.createElement("div");
			divNode.innerHTML = _content;
			
			// if this is last element (next node is null or undefiend) then insert last
			while(divNode.childNodes[0])
				riff(this).parent().dom().insertBefore(divNode.childNodes[0], nextNode);
		});
	},

	//h ���õ� DOM Element �� ������ HtmlCode�� �߰��Ѵ�. 
	//h ��, ���õ� DOM Element���� ������, htmlCode�� �ش��ϴ� DOM Element�� �����Ѵ�.
	//h ���ڰ�:
	//h		_content : ���Ե� DOM Element�� �ش��ϴ� HTMLCode.
	//h ��ȯ��:
	//h		riff Object
	// before
	//   Insert content, specified by the parameter, before each element in the set of matched elements.
	before : function ( _content )
	{
		//h ���� ����ڰ� _content ���ڿ��� �Է����� �ʾ�����, �׳� riff ��ü�� ��ȯ�ϰ� ����.
		if( typeof( _content ) != 'string') return this;

		return this.each( function()
		{
			var divNode = document.createElement("div");
			divNode.innerHTML = _content;

			while(divNode.childNodes[0])
				riff(this).parent().dom().insertBefore(divNode.childNodes[0], this);
		});
	},

	//h ���õ� DOM Element�� �ڼ� DOM Element �� selector�� �����Ǵ� DOM Element�� �����Ͽ� ��ȯ�Ѵ�. 
	//h ���ڰ����� ���ڿ� �̿��� ���� �Է��ϸ�, �� ��ü�� ��ȯ�Ѵ�. 
	//h ���ڰ�:
	//h		_s : �O������ DOM Element�� �˻��ϱ� ���� CSS Selector Syntax String.
	//h ��ȯ��:
	//h		riff Object
	// find
	//   Get the descendants of each element in the current set of matched elements, filtered by a selector.
	find : function ( _s )
	{
		var cArray = new Array();
		//h ���� ����ڰ� _s �� ���ڿ��� �Է����� �ʾ�����, �� ��ü�� ��ȯ.
		if( typeof( _s ) != 'string') return riff(cArray);

		for(var i=0; this.dom(i); i++)
		{
			var tArray = this.dom(i).querySelectorAll(_s);
			for(var j=0; tArray[j]; j++)
				cArray.push(tArray[j]);
		}

		return riff(cArray);
	},

	//h ���õ� DOM Element�� ���Ͽ� CSS �Ӽ��� �̿��Ͽ� ���ϸ��̼��� ���� �� ���ִ�. 
	//h CSS Property �� ��ȭ �� ���� ��ȭ�� �ð��� ���Ѵ�. 
	//h callback�� ���ڰ����� �ԷµǸ� �ִϸ��̼��� ������ ����ȴ�. 
	//h preCallback�� ���ڰ����� �ԷµǸ� �ִϸ��̼��� ���۵� �� ����ȴ�. 
	//h �ִϸ��̼��� �ִϸ��̼�Queue�� �̿��Ͽ� �����ȴ�.
	//h ���ڰ�:
	//h		_prop : animation�� ���ϴ� css�Ӽ��� ��ǥġ�� �������ִ� �κ�.
	//h		_time : animation���� ����Ǵ� �ð��� �������ִ� �κ�. ( ��ǥġ������ �̵��ð� ). ��slow��, ��normal��, ��fast��Ȥ�� ms ������ �ð�.
	//h		_func : �ִϸ��̼��� ������ ����Ǵ� �Լ�. (optional)
	//h		_preFunc : �ִϸ��̼� ���� ���� ����Ǵ� �Լ�. (optional)
	//h ��ȯ��:
	//h		Framework Object
	//h ��뿹 : $(��#Div1��).animate({��height�� : ��200px��},300,function() {alert(��animation end��);},
	animate : function(_prop, _time, _func, _preFunc)
    {   
        if(!_prop || !_time)
            return this;
        if(typeof _time != "number")
        {
            if(_time == "slow") _time = 1000;
            else if(_time == "nomal") _time = 600;
            else _time = 300;
        }
        if(!this.buffer("riffAnimateInitFlag")) 
        {
            var thisObject = this;
            this.buffer("riffAnimateStopFlag",false);
            this.buffer("riffAnimateInitFlag",true);    
            var timerCount = 0;
            this.buffer("riffAnimationTimerFirstSetting",true);    
            var popupObj;
			//h timer�Լ��� �ִϸ��̼� ���
			riff.timer(function() 
			{(
		        function() 
		        {
			        if( this.buffer("riffAnimateStopFlag"))
					{ 
						//h animation ȿ�� ����.
						riff.timer("riffAnimationTimer");
						this.buffer("riffAnimateStopFlag",false); 
						this.buffer("riffAnimateInitFlag",false);
						return;
					}

					//h ���ο� ���ϸ��̼��� Ÿ�̸�.  ó�� ���۽ÿ� ���ʿ� �ѹ� �ҷ�����.
					if(this.buffer("riffAnimationTimerFirstSetting"))
					{
						//h riffAnimateQueue �� ����� animation queue �� �����´�.
					    popupObj = riff.queue("riffAnimateQueue");
						//h animation queue�� "riffAnimateQueue" �� ������
					    if(popupObj == null)
					    {
					        riff.timer("riffAnimationTimer");
						    this.buffer("riffAnimateInitFlag",false);
						    return;
					    }
						//h queue�ȿ� "pre" �� ����� preFunc �� �ִٸ� ����.
						if(popupObj["pre"]) popupObj["pre"].call(this); 
						//h Animation ����( = css �Ӽ��� ����.)	????
						var param = new Array(); 
						var risevalue = new Array(); 
						for(var p in popupObj["prop"])
						{
							param[p] = window.parseFloat(this.css(p));
							risevalue[p] = (popupObj["prop"][p] - param[p])/(popupObj["time"] / 16.0); 
						}
						this.buffer("riffAnimationTimerParamInitValue",param);
						this.buffer("riffAnimationTimerParamRiseValue",risevalue);
						this.buffer("riffAnimationTimerFirstSetting",false);
					}
					for(var p in popupObj["prop"])  
					{
						var str = this.css(p);
						if(str.indexOf("px") == -1) 
						{
							str = "";
						} else {
							str = "px";
						}     
						
						if(this.buffer("riffAnimationTimerParamInitValue")[p] > popupObj["prop"][p] ? (this.buffer("riffAnimationTimerParamRiseValue")[p] * timerCount + this.buffer("riffAnimationTimerParamInitValue")[p]) <= popupObj["prop"][p] : (this.buffer("riffAnimationTimerParamRiseValue")[p] * timerCount + this.buffer("riffAnimationTimerParamInitValue")[p]) >= popupObj["prop"][p])
						{
							this.css(p, popupObj["prop"][p] + str);
							continue;
						}
						this.css(p, this.buffer("riffAnimationTimerParamRiseValue")[p] * timerCount + this.buffer("riffAnimationTimerParamInitValue")[p] + str);
					}
					timerCount++;
					if( this.buffer("riffAnimationTimerParamInitValue")[p] > popupObj["prop"][p] ? parseFloat( this.css(p)) <= popupObj["prop"][p] : parseFloat( this.css(p)) >= popupObj["prop"][p]) 
					{     
						for(var p in popupObj["prop"])       
						{
							var str = this.css(p);
							if(str.indexOf("px") == -1) str = "";
							else str = "px";	
							this.css(p, popupObj["prop"][p] + str);
						}
						if(popupObj["func"]) popupObj["func"].call(this); 
						
						this.buffer("riffAnimationTimerFirstSetting",true); 
						timerCount = 0;
					}
				}
			).call( thisObject ); }, 16,"riffAnimationTimer");  
        }
        for(var p in _prop)
        {         
            if(typeof _prop[p] == "number")
                continue;
            var str = _prop[p];
            if(str.indexOf("px"))
            {
                 _prop[p] = str.substring(0,str.indexOf("px"));
            }
        }
        riff.queue({"prop":_prop,"time":_time,"func":_func,"pre":_preFunc},"riffAnimateQueue");
        return this;  
        // riff.queue  
    },     
    
    //h animation queue�� ���� ���� �������� animation���� �����Ų��.
	//h ��, �ִϸ��̼� Queue�� ����Ǿ� �ִ� ���ϸ��̼ǵ��� �����Ѵ�. 
	//h �� �� ���� ���� �ִϸ��̼��� ����ǰ� �ִٸ�, �ش� �ִϸ��̼� ������ ������ ����Ǿ� �Ϸ�ǰ� 
	//h �� ���� �ִϸ��̼� ���ʹ� ������ ���۵��� �ʴ´�.
	//h ���ڰ�: -
	//h ��ȯ��:
	//h		Framework Object
	clearQueue : function()
    {
        riff.queue("clear","riffAnimateQueue");
        return this;
    },
    
    //h animation queue �� ����, ���� �������� animation�� �����.
	//h ���ڰ�: -
	//h ��ȯ��:
	//h		Framework Object
    stop : function()
    {   
        riff.queue("clear","riffAnimateQueue");
        this.buffer("riffAnimateStopFlag",true);
        return this;
    },
    
	//h ������ ��ü�� ȭ�鿡 ��Ÿ����.
	//h ���ڰ��� �Էµ��� ������, ������ DOM Element�� ȭ��� ǥ���ϱ� ���� display �Ӽ��� block�� �����Ѵ�.
	//h ���ڰ��� �ԷµǴ� ���, ���õ� DOM Element�� ��Ÿ���� �ϴ� �ִϸ��̼��� �����ϱ� ���� 
	//h width, height, opacity���� 0���� ���� ������ ���ÿ� ��ȭ��Ų��. �̷� ���� ��ü�� ������ width, height �� �ٲ�� ��Ÿ����.
	//h ������ display�Ӽ��� ���� ���� �޼ҵ� ȣ�� �� display�Ӽ��� ������ ������ ��ȭ�ǰ�, ������ ������ ��� ��block���� �����ȴ�.
    //h ���ڰ�: 
	//h		���ڰ��� ���� ��� : ������ ��ü�� ȭ�鿡 ���( CSS "display" �Ӽ� -> block���� ).
	//h		_time : �ִϸ��̼��� �ӵ�(CSS �Ӽ� ���� ��ȭ ��ǥġ������ �̵��ð�). ��slow��, ��normal��, ��fast��Ȥ�� ms ������ �ð�.
    //h		_func : �ִϸ��̼��� ������ ����Ǵ� �Լ�. (optional)
	//h ��ȯ��:
	//h		Framework Object
	// show
	//   show DOM elements
	show : function(_time, _func)
	{   
	    return this.each( function()
	    {
	        var thisObj = riff(this);
		    if(!thisObj.buffer("riffEffectPreState"))
		    {
		        if(thisObj.css("display") == "none")
		        {   
		            thisObj.css("display","block");
		            thisObj.buffer("riffEffectPreState",{"absheight":thisObj.css("height"),"abswidth":thisObj.css("width"),"absdisplay":"none",
		            "height":thisObj.css("height"),"width":thisObj.css("width"),"display":"none" });       
		            thisObj.css("display","none");
		        }
		        else thisObj.buffer("riffEffectPreState",{"absheight":thisObj.css("height"),"abswidth":thisObj.css("width"),"absdisplay":thisObj.css("display"),"height":thisObj.css("height"),"width":thisObj.css("width"),"display":thisObj.css("display") });   
		    }
		    
		    if(!_time)
	        {
		        if(thisObj.buffer("riffEffectPreState")["absdisplay"] == "none") 
		            thisObj.css("display","block");
		        else 
		            thisObj.css("display",thisObj.buffer("riffEffectPreState")["absdisplay"]);   
	            return this;	        
		    }
    		   
	        thisObj.animate({"height":thisObj.buffer("riffEffectPreState")["absheight"],"width":thisObj.buffer("riffEffectPreState")["abswidth"],"opacity":1.0 },
	        _time,function(){
	            thisObj.css("width",thisObj.buffer("riffEffectPreState")["abswidth"]);
	            thisObj.css("height",thisObj.buffer("riffEffectPreState")["absheight"]);
	            if(_func)_func.call(this); 
	        },function(){
	            if(thisObj.css("display") == "none") thisObj.css("display","block");
	            else
	            {
	                thisObj.css("display",thisObj.buffer("riffEffectPreState")["absdisplay"]); 
	            }
	            thisObj.css("width","0px");
	            thisObj.css("height","0px");
	            thisObj.css("opacity",0);
	        });   
		});
	},

	//h ������ ��ü�� ȭ�鿡�� ������� �Ѵ�.
	//h ���ڰ��� �Էµ��� ������, ������ DOM Element�� ȭ��󿡼� ������ ���� display �Ӽ��� none���� �����Ѵ�.
	//h ���ڰ��� �ԷµǴ� ���, ���õ� DOM Element�� ������ �ִϸ��̼��� �����ϱ� ���� 
	//h width, height, opacity���� ���� ������ 0���� ���ÿ� ��ȭ��Ų��.
	//h �޼ҵ� ȣ�� �� display�Ӽ��� ��none������ �����ȴ�.
	//h ���ڰ�: 
	//h		���ڰ��� ���� ��� : ������ ��ü�� ȭ�鿡�� �����.( CSS "display" �Ӽ� -> none���� ).
	//h		_time : �ִϸ��̼��� �ӵ�(CSS �Ӽ� ���� ��ȭ ��ǥġ������ �̵��ð�). ��slow��, ��normal��, ��fast��Ȥ�� ms ������ �ð�.
    //h		_func : �ִϸ��̼��� ������ ����Ǵ� �Լ�. (optional)
	//h ��ȯ��:
	//h		Framework Object
	// hide
	//   hide DOM elements
	//h ��ü�� ������ width, height �� �ٲ�� �������.
    //h _time : ����Ǵ� �ð�
    //h _func : ����ǰ��� ����Ǵ� �Լ�.
	hide : function(_time, _func)
	{   
	    return this.each( function()
	    {
	        var thisObj = riff(this);
	       
            if(!thisObj.buffer("riffEffectPreState"))
            {
                if(thisObj.css("display") == "none")
                {   
                    thisObj.css("display","block");
                    thisObj.buffer("riffEffectPreState",{"absheight":thisObj.css("height"),"abswidth":thisObj.css("width"),"absdisplay":"none",
                    "height":thisObj.css("height"),"width":thisObj.css("width"),"display":"none" });       
                    thisObj.css("display","none");
                }
                else thisObj.buffer("riffEffectPreState",{"absheight":thisObj.css("height"),"abswidth":thisObj.css("width"),"absdisplay":thisObj.css("display"),"height":thisObj.css("height"),"width":thisObj.css("width"),"display":thisObj.css("display") });   
            }
            if(!_time)
	        {
			    thisObj.css("display","none");
			    return this;
		    }
            
            thisObj.animate({"height":0,"width":0,"opacity":0 },
            _time,function(){
                thisObj.css("width",thisObj.buffer("riffEffectPreState")["abswidth"]);
	            thisObj.css("height",thisObj.buffer("riffEffectPreState")["absheight"]);
                thisObj.css("display","none");
                if(_func)_func.call(this); 
            },function(){
                if(thisObj.css("display") == "none") thisObj.css("display","block");
                else
                { 
                    thisObj.css("display",thisObj.buffer("riffEffectPreState")["absdisplay"]); 
                }
            });   
            
        });
	},
	

	//h toggle() �Լ��� ����ɶ�����, _func1, _func2 callback �Լ��� ������ ����ȴ�.
	//h ���ڰ�: 
	//h		_func1 : ������ ������ �Լ� 1
    //h		_func2 : ������ ������ �Լ� 2
	//h ��ȯ��:
	//h		Framework Object
	// toggle
	//   bind toggle functions with elements.
	toggle : function ( _func1, _func2 )
	{
		return this.tap( function ()
		{
			if ( riff(this).buffer("riffToggleData") == "Func2" )
			{
				_func2.call(this);
				riff(this).buffer("riffToggleData", "Func1" );
			}
			else
			{
				_func1.call(this);
				riff(this).buffer("riffToggleData", "Func2" );
			}
		});
	},

	//h �迭.trigger( �̺�Ʈ ���� )  �迭 ��ü�� ���� ���������� [�̺�Ʈ ����] �� ����.
	//h "�̺�Ʈ ����"�� �ݵ�� ���� ���� �̺�Ʈ. Framework���� ������ artificial event �� ���� �ȵȴ�.
	//h ���ڰ�: 
	//h		_existEventName : ������ �����ϴ� �̺�Ʈ �̸�( ex: onfocus )
	//h ��ȯ��:
	//h		Framework Object
	//  trigger @_eventName to the DOM node elements.
	//  @_eventName : event name to trigger. ( only the artificial event )
    triggerExistEvent : function( _existEventName )
    {
		//d debug.log("triggerExistEvent() START ");
        var i = 0, t = null;
        var domObject = this.dom(i);
        while( domObject )
        {
            //h Handle triggering a single element
            //h don't do events on text and comment nodes
            //h if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) { return undefined; }  
            domObject[ _existEventName ] && domObject[ _existEventName ]();  // Text ��� �� Ŭ�� �̺�Ʈ�� Null or Undefined ��츦 ����
            domObject = this.dom(++i);
        };
		//d debug.log("triggerExistEvent() END ");
    	return this;
    },


	//h �迭.trigger( �̺�Ʈ ���� )  �迭 ��ü�� ���� ���������� [�̺�Ʈ ����] �� ����.
	//h "�̺�Ʈ ����"�� �ݵ��  Framework���� ������ Artificial Event.
	//h ���ڰ�: 
	//h		_customEventName : Framework���� ������ Artificial Event ���ڿ�( ex: "tap" )
	//h ��ȯ��:
	//h		Framework Object
	//  trigger @_eventName to the DOM node elements.
	//  @_eventName : event name to trigger. ( only the artificial event ) 
    triggerCustomEvent : function( _customEventName )
    {
        var i = 0, t = null;
        var domObject = this.dom(i);
        while( domObject )
        {
            //d Handle triggering a single element
            //d don't do events on text and comment nodes
            //d if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) { return undefined; } 
            domObject[ _customEventName ] && riffTouch.Send( _customEventName, domObject, "trigger", null );
            domObject = this.dom(++i);
        };
        return this;
    },

	//h �迭.trigger( �̺�Ʈ ���� )  �迭 ��ü�� ���� ���������� [�̺�Ʈ ����] �� ����.
	//h ���� �迭 ��ü �� [�̺�Ʈ ����]�� ���� �̺�Ʈ �ڵ鷯�� �����Ǿ� ���� ������, �ƹ��͵� ������� �ʴ´�.
	//h ���ڰ�: 
	//h		_eventName : Event ���� ���ڿ�( ex: "tap" )
	//h ��ȯ��:
	//h		Framework Object
	//  trigger @_eventName to DOM node elements.
	//  @_eventName : event name to trigger.
    trigger : function( _eventName )
    {
        if ( !_eventName ) {
            return this;
        }

        switch( _eventName )
        {
            case riffGlobal.EVENTSTRING.FLICK_LEFT :
            case riffGlobal.EVENTSTRING.FLICK_RIGHT :
            case riffGlobal.EVENTSTRING.FLICK_UP :
            case riffGlobal.EVENTSTRING.FLICK_DOWN :
            case riffGlobal.EVENTSTRING.TAP :
            case riffGlobal.EVENTSTRING.LONG_TAP :
            case riffGlobal.EVENTSTRING.DOUBLE_TAP :
            case riffGlobal.EVENTSTRING.TOUCH_START :
            case riffGlobal.EVENTSTRING.TOUCH_MOVE :
            case riffGlobal.EVENTSTRING.TOUCH_END :
                //h �̺�Ʈ �̸��� Custom event �� ����, riffTouch.Send() �� CustomEvent�� ������Ѿ� �Ѵ�.
				// use the artificial event ( ex: TAP ).
                this.triggerCustomEvent( _eventName );
                //h customEvent[ "touchEnd" ] = touch[ _eventName ].call( this );
                return this;
            default :
                //h �̺�Ʈ �̸��� Custom Event �� �ƴ� ����, ����ó�� addEventListener �� �̿��ϰų�, domObject.eventName() �� ���·� �����ϸ� �ȴ�.
				// use the existed event ( ex: onfocus ).
                this.triggerExistEvent( _eventName );
        }
        return this;
    },

	//h �̺�Ʈ �߰� ���� �Լ�. �������������� �ִ� "touch"( widget ) / "mouse"( PC or SDK ) ������, ����ؾ� �� �̺�Ʈ�� �Ǵ�. 
	//h ���ڰ�: 
	//h		domObject : �̺�Ʈ�� �߰��� DOM Element
	//h ��ȯ��:
	//h		Framework Object
	// attach the existed events to the domObject.
    //	@domObject : DOM node elements for event handling.
    primaryEventRegist : function( domObject )    
    {
		if( riffGlobal.eventType == "touch" )
		{
			domObject.addEventListener( "touchstart", riffTouch.onTouchEvent, false );
	        domObject.addEventListener( "touchmove", riffTouch.onTouchEvent, false );
		    domObject.addEventListener( "touchend", riffTouch.onTouchEvent, false );
		}
		else
		{
			domObject.addEventListener( "mouseup", riffTouch.onTouchEvent, false );
			domObject.addEventListener( "mousemove", riffTouch.onTouchEvent, false );
			domObject.addEventListener( "mousedown", riffTouch.onTouchEvent, false );
		}
		
		return this;
	},
	
	//h ��ü�� event�� disable�Ǿ����� ���Ǵ� �Լ���, event�� enable �����־� �̺�Ʈ�� ��ϵ� event handler �� ������ �� �ֵ��� �Ѵ�.
	//h ���ڰ�: 
	//h		_event : DOM ��ü�� ����, �̺�Ʈ ������ ������ �̺�Ʈ ���ڿ�. ( riffGlobal.EVENTSTRING ����)
	//h ��ȯ��:
	//h		Framework Object
	enableEvent : function( _event )
    {
	//h Swipe �� �� ���� �̻��� �̺�Ʈ�� ������ ���� �̺�Ʈ��, ó�� ����� �ٸ���.
        if(_event == riffGlobal.EVENTSTRING.SWIPE)
        {
            var eventType = this.buffer("riffSaveEvent");
            eventType[riffGlobal.EVENTSTRING.FLICK_RIGHT] = true;
            eventType[riffGlobal.EVENTSTRING.FLICK_LEFT] = true;
            eventType[riffGlobal.EVENTSTRING.DRAG] = true;
            this.buffer("riffSaveEvent",eventType);
            return this;
        }
        var eventType = this.buffer("riffSaveEvent");
        eventType[_event] = true;
        this.buffer("riffSaveEvent",eventType); 
        return this;
    },
    //h event�� disable �����־�, �̺�Ʈ�� ��ϵ� event handler �� ������ �� ������ �Ѵ�. 
	//h ���ڰ�: 
    //h		_event : DOM ��ü�� ����, �̺�Ʈ �Ұ����� ������ �̺�Ʈ ���ڿ�. ( riffGlobal.EVENTSTRING ����)
	//h ��ȯ��:
	//h		Framework Object
    disableEvent : function( _event )
    {
	//h Swipe �� �� ���� �̻��� �̺�Ʈ�� ������ ���� �̺�Ʈ��, ó�� ����� �ٸ���.
        if(_event == riffGlobal.EVENTSTRING.SWIPE)
        {
            var eventType = this.buffer("riffSaveEvent");
            eventType[riffGlobal.EVENTSTRING.FLICK_RIGHT] = false;
            eventType[riffGlobal.EVENTSTRING.FLICK_LEFT] = false;
            eventType[riffGlobal.EVENTSTRING.DRAG] = false;
            this.buffer("riffSaveEvent",eventType);
            return this;
        }
        var eventType = this.buffer("riffSaveEvent");
        eventType[_event] = false;
        this.buffer("riffSaveEvent",eventType);
        return this;
    },
    //h drag �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    drag : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.DRAG, riffTouch.dragMove);
        this.buffer("riffDragEventFunc",_fnEventHandle);
        return this;
    },
    
    //h flickLeft �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    flickLeft : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.FLICK_LEFT, _fnEventHandle);
        return this;
    },

    //h flickRight �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    flickRight : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.FLICK_RIGHT, _fnEventHandle);
        return this;
    },

    //h flickUp �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    flickUp : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.FLICK_UP, _fnEventHandle);
        return this;
    },

    //h flickDown �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    flickDown : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.FLICK_DOWN, _fnEventHandle );
        return this;
    },

    //h tap �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    tap : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.TAP, _fnEventHandle);
        return this;
	},
	
    //h longTap �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
    //h		_touchTime : long tap�� �ɸ��� ���ؽð��� ����. �������Ұ�쿡 default ���� ����. (optional).
	//h ��ȯ��:
	//h		Framework Object
	longTap : function( _fnEventHandle, _touchTime )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.LONG_TAP, _fnEventHandle);
        if(!_touchTime) this.buffer("riffLongTapTime",riffGlobal.TouchTimer.longTap);
        else this.buffer("riffLongTapTime",_touchTime);
        return this;
    },

    //h doubleTap �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    doubleTap : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.DOUBLE_TAP, _fnEventHandle);
        return this;
    },

    //h touchStart �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    touchStart : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.TOUCH_START, _fnEventHandle);
        return this;
    },

    //h touchMove �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    touchMove : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.TOUCH_MOVE, _fnEventHandle);
        return this;
    },

    //h touchEnd �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�. 
	//h ���ڰ�: 
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    touchEnd : function( _fnEventHandle )
    {
        this.addEventByType( riffGlobal.EVENTSTRING.TOUCH_END, _fnEventHandle);
        return this;
    },
    
    //h swipe �̺�Ʈ ��� �Լ�. �ش� �̺�Ʈ�� ���� event hander �Լ��� �����Ѵ�.
    //h swipe event �� darg, flickRight, flickLeft�� ������ event �̴�. 
    //h DOM Elenent�� ���� drag event -> flick event �� �߻��Ѵ�.
    //h �� �� �̺�Ʈ�� �������� DOM Element��, �ڿ������� �����̸�( CSS�� left�� ��ȯ) �̵��ϴ� �����. 
    //h �׷��Ƿ� �����̴� DOM Element�� �����ִ� box ������ �ϴ� DOM Element�� �ʿ��ϴ�. 
    //h DOM Element�� swipe �̺�Ʈ�� ������ �� swipe �̺�Ʈ�� �߻��ϸ�, ���ڰ��� _fnEventHandle �� �۵��Ѵ�.
    //h _fnEventHandle ����, swipe�� ����( drag/ �����̵� / ���� )�� �� �� �ִ� ���ڰ��� �����Ѵ�.
    //h _fnEventHandle �Լ��� ���޵Ǵ� ���ڰ��� ������ ����.
    //h 	_fnEventHandler( state, ptx, pty )
    //h 		state : swipe event�� ����Ǿ� �����̴� DOM Element�� ���� ��Ȳ�� ��Ÿ���� ��.
    //h 			���ڿ��̸�, ������ �� �� ������ ��ȯ�Ѵ�.
    //h 				"dragMove" : swipe event �� drag �� �߻����� �� �����ϴ� ��.
    //h 				"leftMove" : swipe event�� �߻� �ؼ� �������� �����̱� ������ �� ���ʷ� �ѹ� �����ϴ� ��.
    //h 				"rightMove" : swipe event�� �߻� �ؼ� ���������� ������ �� ���ʷ� �ѹ� �����ϴ� ��.
    //h 				"move" : swipe event�� �߻��ϰ� ������ �� �����ϴ� ��.
    //h 				"leftEnd" : swipe event�� �߻��Ͽ� ���� ������ �̵� �Ͽ��� ���� �����ϴ� ��.
    //h 				"rightEnd" : swipe event�� �߻��Ͽ� ������ ������ �̵� �Ͽ��� ���� �����ϴ� ��.
    //h 				"end" : swipe event�� ������ ���� �����ϴ� ��.
    //h 			���, ���� ��� swipe�� ���ʿ��� ���������� �߻��� ���, state�� ������ ���� ������ ���� �����Ѵ�.
    //h 			"dragMove" -> "dragMove" -> ... "dragMove" -> "rightMove" -> "move" -> "move" ... "move" -> "rightEnd" -> "end"
    //h 		ptx : swipe event �� ��ü�� left�Ӽ� ��ġ�� ��Ÿ����.
    //h 		pty : swipe event �� ��ü�� top�Ӽ� ��ġ�� ��Ÿ����.
	//h ���ڰ�: 
    //h		_isFlickEnd : boolean. swipe�ÿ� swipe��ü�� ���ΰ� �ִ� box��ü�� ������ �ȳ����� �������ִ� �κ�.
    //h                          true�ϰ�� box��ü�� ����������.
    //h		_verlocityPercent : number. swipe �̺�Ʈ �� DOM Element�� �ڵ����� �����϶�, �����̴� �ӵ��� �ۼ�Ʈ ������ �������ִ� �κ�.
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
	swipe : function( _isFlickEnd ,_verlocityPercent,_fnEventHandle )
	{	
		this.addEventByType( riffGlobal.EVENTSTRING.DRAG , riffTouch.dragForSwipe);		
		this.addEventByType( riffGlobal.EVENTSTRING.FLICK_RIGHT, riffTouch.flickForSwipe);
		this.addEventByType( riffGlobal.EVENTSTRING.FLICK_LEFT,  riffTouch.flickForSwipe);
		
		this.buffer("riffSwipeFunc",_fnEventHandle);
		this.buffer("riffSwipeVerlocityPercent",_verlocityPercent);
		this.buffer("riffSwipeIsSwipeEnd",_isFlickEnd);
		return this;
	},

	//h ���ڰ����� ���� �Լ��� DOM Element�� �����Ѵ�.
	//h ���ڰ�: 
    //h		_eventType : ���ڿ�. �ռ��̺�Ʈ�� �̸�.
    //h		_fnEventHandle : ������ �̺�Ʈ �ڵ鷯 �Լ�
	//h ��ȯ��:
	//h		Framework Object
    addEventByType : function( _eventType, _fnEventHandle) 
    {
		var i = 0;
        var domObject = this.dom(i);
        while( domObject )
        {
            this.primaryEventRegist( domObject );
            riffTouch.AddEvent( riffTouch, _eventType, domObject, _fnEventHandle );
            domObject = this.dom(++i);
        }
        this.addClass("handsPointer");
		return this;
    },
    
	//h component�� makeStructs() �Լ� ����
	// set
	//	component function
	//	set component
	makeStructs : function( )
	{
		return this.each( function()
		{
			var c = riff(this);
			if(c.component().makeStructs)
				c.component().makeStructs.call(this);
		});
	},

	//h component�� makeContents() �Լ� ����
	// makeContents
	//	component function
	//	set component's makeContents
	makeContents : function( _value )
	{
		if( arguments.length == 0 )
		{
			if(this.component().makeContents)
				return this.component().makeContents.apply(this.dom());

			return null;
		}
		
		var args = arguments;
		return this.each( function()
		{
			var c = riff(this);
			if(c.component().makeContents)
				c.component().makeContents.apply(this, args);
		});
	},

	//h component�� count() �Լ� ����
	count : function ()
	{
		if(this.component().count)
			return this.component().count.apply(this.dom());

		return null;
	},

	//h component�� move() �Լ� ����
	// move
	//	component function
	move : function()
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().move)
				c.component().move.apply(this, args);
		});
	},


	//h component�� subSceneLoad() �Լ� ����
	// func
	//	component function
	subSceneLoad : function()
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().subSceneLoad)
				c.component().subSceneLoad.apply(this, args);
		});
	},
	
	//h component�� subSceneLoadFlag() �Լ� ����
	// subSceneLoadFlag
	//	component function
	subSceneLoadFlag : function()
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().subSceneLoadFlag)
				c.component().subSceneLoadFlag.apply(this, args);
		});
	},
	
	//h component�� subSceneSelect() �Լ� ����
	// subSceneSelect
	//	component function
	subSceneSelect : function()
	{
		var rriff = riff();
			
		for ( var i = 0, l = this.size(); i < l; i++ )
			if( this.component(i).subSceneSelect )
				rriff = rriff.add ( this.component(i).subSceneSelect.apply(this.dom(i), arguments) );

		return rriff;
	},
	
	//h component�� refresh() �Լ� ����
	// refresh
	//	component function
	refresh : function()
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().refresh)
				c.component().refresh.apply(this, args);
		});
	},

	//h component�� autoRefresh() �Լ� ����
	// autoRefresh
	//	component function
	autoRefresh : function()
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().autoRefresh)
				c.component().autoRefresh.apply(this, args);
		});
	},

	//h component�� addSubScene() �Լ� ����
	// addSubScene
	//	component function
	addSubScene : function( _url )
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().addSubScene)
				c.component().addSubScene.apply(this, args);
		});
	},

	//h component�� option() �Լ� ����
	// option
	//	component function
	//	set each component's option
	option : function( _value )
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().option)
				c.component().option.apply(this, args);
		});
	},

	//h component�� removeListItem() �Լ� ����
	// removeListItem
	//	component function
	removeListItem : function( _value )
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().removeListItem)
				c.component().removeListItem.apply(this, args);
		});
	},
	
	//h component�� okFunc() �Լ� ����
	// okFunc
	//	component function
	okFunc : function( _value )
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().okFunc)
				c.component().okFunc.apply(this, args);
		});
	},

	//h component�� getSettingValue() �Լ� ����
	//h �ش� ������Ʈ ������
	//h ù��° �͸� ��ȯ
	// getSettingValue
	//	component function
	//	set component selected data or return component selected data
	getSettingValue : function( _value )
	{
		if( arguments.length == 0 )
		{
			if(this.component().getSettingValue)
				return this.component().getSettingValue.apply(this.dom());

			return null;
		}
		
		var args = arguments;
		return this.each( function()
		{
			var c = riff(this);
			if(c.component().getSettingValue)
				c.component().getSettingValue.apply(this, args);
		});
	},	
	
	//h component�� moveRSSArticle() �Լ� ����
	//h �ش� ������Ʈ ������
	// moveRSSArticle
	//	component function
	// idle control
	moveRSSArticle : function( _value )
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().moveRSSArticle)
				c.component().moveRSSArticle.apply(this, args);
		});
	},

	//h component�� setRSSComponent() �Լ� ����
	// setRSSComponent
	//	component function
	// rssComponent settting
	setRSSComponent : function( _value )
	{
		var args = arguments;

		return this.each( function()
		{
			var c = riff(this);
			if(c.component().setRSSComponent)
				c.component().setRSSComponent.apply(this, args);
		});
	},

	componentContext : null,
	length : 0
};

//h �Էµ� ���ڿ��� ����, ���ڿ� �� �հ� �� �ڿ� ������ �ִٸ� ������ �Ŀ� ��ȯ�Ѵ�.
//h ���ڰ�:
//h		_s : ������ ������ ���ڿ�.
//h ��ȯ��:
//h		trim() �� ����� ���ڿ�
// Remove the whitespace from the beginning and end of a string.
riff.trim = function ( _s )
{
	if( typeof _s == "string" ) {
		return _s.replace(/^\s+|\s+$/g, "");
	}
};

//h ���ڿ��� camelize ���ִ� �Լ�( ex: "abc-eee" -> "abcEee" )
//h ���ڰ�:
//h		_s : camel ǥ����� ������ ���ڿ�	
//h ��ȯ��:
//h		camel ǥ����� ����� ���ڿ�	
riff.camelize = function ( _s )
{
	if( typeof _s == "string" ) {
		return _s.replace(/-+(.)?/g, function(match, chr) {
			return chr ? chr.toUpperCase() : '';
		});
	}
};

//h �� ��ũ�� �̵��ϴ� �Լ�. phone�� ��� widget�Լ��� �̿��ϰ� PC�� ��� �ش� ��ũ�� �̵��Ѵ�.
//h ���ڰ�:
//h		_url : �̵��� ��ũ�ּ�
//h ��ȯ��:
//h		true : �Լ� ������ �������� ��
//h		false : �Լ� ������ �������� ��
riff.openURL = function ( _url )
{
	if( typeof _url == "string" ) {
		if( riff.isWidget() ) {
			widget.openURL(_url);
		}else {
			window.location.href = _url;
		}
		return true;
	}
	return false;
};

//h ���ڿ��� CSS�� ID �˻� �������� �ٲٴ� �Լ�. = ���ڿ� �տ� "#" �� ������ ���̰�, ������ �״�� ��ȯ.  
//h ���ڰ�:
//h		_str : ID �˻� �������� ��ȯ�� ���ڿ�( "#" + id �� ���� ) 
//h ��ȯ��:
//h		�Լ� ���� ���� : ��ȯ�� ���ڿ�
//h		�Լ� ���� ���� : ���� ���ڿ�
riff.toID = function ( _str )
{
	if( typeof _str == "string" ) {
		var strTrim = riff.trim(_str);
		return (strTrim.substr(0,1) == "#" ) ? strTrim : "#" + strTrim;
	}
	return "";
};


//h ���� �۵��� PC���� Ȥ�� ��������, �ƴ� widget���� �ϰ� �ִ��� �Ǵ�.
//h ���ڰ�: - 
//h ��ȯ��:
//h		boolean : SDK ���� �������̸� true, �� �̿ܿ��� false ��ȯ
riff.isEmulator = function ( )
{
	//h widget ��ü�� ������ PC���� ���� - false 
	if ( typeof widget == "undefined" ) {
		return false;
	}
	
	try {
		//h SDK���� widget.addEventListener �Լ��� ����.
		if ( widget.addEventListener ) {
			return false;
		} else {
			return true;
		}
	} catch( e ) {
		return true;
	}
};

//h Animation ȿ������, ������ Animation�� �����ϰų� �������� ���� �Լ�. 
//h ����. 
//h		$.queue( "clear" ) : queue �� ��� ���� ����.
//h		$.queue( "XXXXX" ) : queue �� ������ animation ȿ�� �迭�� ���� key��.
//h		$.queue( _data, _id ) : queue �� ������ animation ȿ�� �迭�� ����.
//h			Animation�� ���� �迭( riffGlobal.queueList )���� _id���� Ű ������ animation queue�� �����´�.
//h			������ animation queue�� _data �� �߰��Ѵ�.
//h ���ڰ�:
//h		���ڰ� 1���� �� :
//h			_data : ���ڿ�. �ҷ��� animation ȿ�� �迭�� ���� key��.
//h		���ڰ� 2���� �� :
//h			_data : ������ animation ȿ��.
//h			_id : ���ڿ�. ������ animation ȿ�� �迭�� ���� key��.
//h ��ȯ��:
//h		���ڰ� 1���� �� :
//h			�Է��� ���ڰ��� ���ڿ� "clear" �� �� : null
//h			�Է��� ���ڰ��� key �� �ϴ� animation ȿ�� data�� �������� ���� �� : null
//h			�Է��� ���ڰ��� key �� �ϴ� animation ȿ�� data�� ������ �� : animation ȿ�� data.
//h		���ڰ� 2���� �� : null
riff.queue = function( _data, _id )
{
    if( _data == "clear") 
    {  
        riffGlobal.queueList[_id] = null; 
        return null;
    }
    if(arguments.length == 1)
    {
		//h �Էµ� Ű ��(_data) ���� ����� Animation ȿ���� ������ ????
		if(typeof arguments[0] != "string" || !riffGlobal.queueList[_data])
			return null; 

		//h �Էµ� Ű ��(_data) ���� ����� Animation ȿ���� ������ ????
		if(riffGlobal.queueList[_data].length != 0)
		{   
			//h �ش� key ������ animation stack�� ������,
			//h �� �Ʒ� �� ���� ���� ��ȯ.
			var queue = riffGlobal.queueList[_data];
			queue.reverse();
			var reValue = queue.pop();
			queue.reverse();
			riffGlobal.queueList[_data] = queue;
			return reValue;
		}
		else 
			return null;
    }
    if(!riffGlobal.queueList[_id])
    {
		//h "_id" queue�� "_data" �� �߰�.
        var queue = new Array();
        queue.push(_data);
        riffGlobal.queueList[_id] = queue;
    }
    else
    {
		//h "_id" queue�� ������, "_id" queue�� ������ �� "_data" �� �߰�.
		var queue = riffGlobal.queueList[_id];
        queue.push(_data);
        riffGlobal.queueList[_id] = queue;
    }

	return null;
};

//h ���� widget ������ PC���� �ϰ� �ִ���, �ƴ� �ܸ�( ��ȭ�� ) ���� �ϰ� �ִ��� �Ǵ�
//h ���ڰ�: - 
//h ��ȯ��:
//h		boolean : ��ȭ�⿡�� �������̸� true, �� �̿ܿ��� false ��ȯ
//detects the widget-working-status( on PC or on phone ).
//the phone is not comfortable to check the touch function, match the "mouseevent" with "touchevent" for simple test on desktop.
riff.isWidget = function ( )
{
	// the widget object exist == phone.  not exist == Desktop
	//h ���� ��ü�� ������ �ڵ���, ������ PC��.
	if( riff.isEmulator() ) return false;
	return ( typeof widget == "undefined" ) ? false : true;  
};

//h navigation ���. 
//h �������� �̵�. 
//h #id Ȥ�� id �� ����. 
//h �۷ι� ������ # ���ΰͱ��� ����. 
//h ���ڰ�:
//h		_page : �̵��� DOM Element�� ID. riff Components�� ����.
//h		_option : "transitionEffect", "transitionMotion", "transitionSecond", "transitionFunc" ���� ����. 
//h ��ȯ��:
//h		�˾� �Ǵ� ������ �̵� �� �Լ��� ȣ���� �����.
riff.move = function( _page, _option  )
{
	if( typeof _page == "string" ) {
		var page = riff.toID(_page),
			pageriff = riff( page );
			
		//h �˾��� ���� �׿� ���� ������.
		if( pageriff.size() !=0 && pageriff.component().type == "popup" ) {
			return riff.popup.apply(this, arguments);
		}else {
			return riff.scene.apply(this, arguments);
		}
	} 

	return false;
};

//h navigation ���. 
//h ���� ȭ������ ����. 
//h ���ڰ�:
//h		_option : "transitionEffect", "transitionMotion", "transitionSecond", "transitionFunc" ���� ����.
//h ��ȯ��:
//h		�˾� �Ǵ� ������ �̵� �� �Լ��� ȣ���� �����.
riff.back = function( _option )
{
	if( typeof _option == "object" || typeof _option =="undefined" ) {
		return riff.scene.apply( null, _option );
	}

	return false;
};

//h navigation ���. 
//h �������� �̵�. 
//h #id Ȥ�� id �� ����
//h ���ڰ�:
//h		_scene : �̵��� DOM Element�� ID. riff Components�� ������ �͵�.
//h		_option : "transitionEffect", "transitionMotion", "transitionSecond", "transitionFunc" ���� ����.
//h ��ȯ��:
//h		�˾� �Ǵ� ������ �̵� �� �Լ��� ȣ���� �����.
riff.scene = function( _scene, _option)
{
	if( typeof _scene == "object" || typeof _scene =="undefined" ) {
		return riff.scene.back.apply(this, arguments);
	}else {
		return riff.scene.move.apply(this, arguments);
	}
};

//h navigation ���. 
//h �������� �̵�. 
//h #id Ȥ�� id �� ����
//h ���ڰ�:
//h		_scene : �̵��� DOM Element�� ID. riff Components�� ����.
//h		_option : 
//h			{ "transitionEffect" : "slideVer" / "slideHor" / "popup" / "fade" / "spin" / "none"
//h			  "transitionMotion" : "ease" / "ease-in" / "ease-out" / "ease-in-out" 
//h			  "transitionSecond" : 1234 ( millisec )
//h			  "transitionDirection" : "on" / "off"
//h			  "transitionFunc" : function() { ...alert(); ...};
//h			} ���� ����
//h ��ȯ��:
//h		�˾� �Ǵ� ������ �̵� �� �Լ��� ȣ���� �����.
riff.scene.move = function ( _scene, _option )
{
	if( typeof _scene == "string" ) {

		//h ���� �� üũ
		var scene = riff.toID(_scene);

		//h Idle�� �̵�(ùȭ������ ����)�� ���
		if( scene == "#idle" ){
			//h Phone�� ���, ȭ�� ũ�� �ٲپ� ��� �Ǵϱ�.
			if( riff.isWidget() || riff.isEmulator() )
				riff.resize(riffGlobal.widgetIdleWidth, riffGlobal.widgetIdleHeight);

			//h ȭ�� Ŭ�� ���ϰ� ������ �� �Ⱦ��	
			riff(".widgetWrap").hide();
			riff(scene).show();
			
			//h IDLE ȭ���̴�, Back ����� ����� �ʿ� �����Ƿ�, ȭ�� stack ����.
			riffGlobal.sceneStack = new Array();
			riffGlobal.sceneStack.push( [ scene, null ] );
			return true;
		}

		//h pageCache ����� �����ߴٸ�, ����ට�� ���� ȭ���� �����ֱ� ���� ���� ȭ���� ID�� �����Ѵ�.
		if( riffGlobal.pageCache == true ) {
			riff.storage("riffPageCacheData", scene);
		}

		//h �����̳� ������ ��� ũ�� ����
		if( riff.isWidget() || riff.isEmulator() ) {
			riff.resize();
		}
		
		//h �Ȱ��� �� �϶�
		var curScene = riffGlobal.sceneStack.pop();
		if(curScene[0] == scene) {
			riffGlobal.sceneStack.push(curScene);
			return true;
		}
		
		//h �� ����Ʈ Ű �� ����
		//h setList ������ ����Ʈ Ű ����
		var riffScene = riff(scene),
			riffSceneSetList = riffScene.find('.setList');

		if( riffSceneSetList.size() > 0 )	{
			riffGlobal.setListSelectData = riffSceneSetList.getSettingValue();
			riff.softkey( riffGlobal.softkeySetListData );
			riff.softkey( riffGlobal.softkeySetListFunc );
			riff(".setTitle").show();
			riff(".title").hide();
		}else if ( riff(scene).buffer("ComponentSceneComponentDataSoftkey") ) {
			riff.softkey( riff(scene).buffer("ComponentSceneComponentDataSoftkey") );
			riff.softkey( riffGlobal.softkeyFuncGlobal );
		}else{
			riff.softkey( riffGlobal.softkeyDataGlobal );
			riff.softkey( riffGlobal.softkeyFuncGlobal );
			riff(".title").show();
			riff(".setTitle").hide();
		}

		//h RSSTime ������ ����Ʈ Ű ����
		// feedReceiveTime
		//h �Ʒ��� .tab, .list �� RSS Component�� ����ϴ� Component���̴�.
		var strTime = "",
			riffSceneTab = riffScene.find('.tab'),
			riffSceneTabList = riffSceneTab.subSceneSelect().find(".list"),
			riffSceneList = riffScene.find(".list");

		if( riffSceneTabList.buffer("ComponentListComponentDataRSSFlag") ) {
			//h RSS�� ����ϴ� TAB Component�� �����Ѵٸ� 
			//h TAB Component �� RSS ���� �����´�. 
			riff.feedReceiveTime( riffSceneTabList.buffer("ComponentListComponentDataRSSTime") );
		} else if ( ( riffSceneTab.size() == 0 ) &&  riffSceneList.buffer("ComponentListComponentDataRSSFlag") ) {
			//h RSS�� ����ϴ� List Component�� �����Ѵٸ� 
			//h List Component �� RSS ���� �����´�. 
			riff.feedReceiveTime( riffSceneList.buffer("ComponentListComponentDataRSSTime") );
		} else {
			//h RSS�� ����ϴ� Component�� �������� �ʴ´ٸ�
			//h feedReceiveTime �� ����� . 
			riff.feedReceiveTime();
		}

		//h ȭ�� Ŭ�� ���ϰ� ����.
		riff(".widgetWrap").show();
		//h softkey�� more �� ȭ�鿡 �ִٸ�, ������.
		riff.softkey.softKeyMoreHide();
		//h �� Scene�� ȭ�� ũ�⿡ �����.
		riff.adjustSceneSize();

		//h �̵� �� ȭ����, �ƹ��͵� �ȶ��ִ� ȭ���̾��ٸ�( EX: ó������ ��üȭ�� ����), �Է¹��� ID �� �ش��ϴ� Scene�� ȭ�鿡 �����ش�.
		if( !curScene ) {
			riff(scene).show();
			riffGlobal.sceneStack.push( [scene, null] );
			return true;
		}else if( curScene[0] == "#idle" ) {
			//h �̵� ���� �� �ִ� ȭ���� idle�̸� 
			//h ���� ȭ�� �����, �� ȭ�� ���̰�, sceneStack �� ���� ȭ���� �ִ´�.( back() �� ó���ϱ� ���� ).
			riff(curScene[0]).hide();
			riff(scene).show();
			riffGlobal.sceneStack.push(curScene);
			riffGlobal.sceneStack.push( [scene, null] );
			return true;
		}
		
		// option setting
		var option = new Array();
		for(var k in _option)
			option[k] = _option[k];
		if( !option.transitionEffect ) option.transitionEffect = riffGlobal.transitionEffect;
		if( !option.transitionSecond ) option.transitionSecond = riffGlobal.transitionSecond;
		if( !option.transitionMotion ) option.transitionMotion = riffGlobal.transitionMotion;
		option.transitionDirection = "on";

		riff.transition( riff(scene), riff(curScene[0]), option );

		option.transitionDirection = null;
		option.transitionFunc = null;
		riffGlobal.sceneStack.push( curScene);
		riffGlobal.sceneStack.push( [scene, option] );

		return true;
	}

	return false;
}

//h ���� ȭ�� ������ ȭ������ ����.
//h _option : 
//h		{ "transitionEffect" : "slideVer" / "slideHor" / "popup" / "fade" / "spin" / "none"
//h		  "transitionMotion" : "ease" / "ease-in" / "ease-out" / "ease-in-out" 
//h		  "transitionSecond" : 1234 ( millisec )
//h		  "transitionDirection" : "on" / "off"
//h		  "transitionFunc" : function() { ...alert(); ...};
//h		} ���� ����
riff.scene.back = function ( _option )
{
	if( typeof _option == "object" || typeof _option == "undefined" ) {

		//h �˾� �������� ���� ��ħ
		if( riffGlobal.popup )
		{
			riff.popup();
			return true;
		}
			
		//h ���� scene �̸� ��� ����
		var curScene = riffGlobal.sceneStack.pop();
		var backScene = riffGlobal.sceneStack.pop();
		
		//h �� scene�� ���ų� idle�� ���
		if( !backScene || backScene[0] == "#idle" )
		{
			//h idle�� �ִٸ�
			if(riff("#idle").size() != 0)
			{
				riff(curScene[0]).hide();
				riff.move("idle");
			}
			//h ���̻� �� �� �� ���� ���� ��
			else
				riffGlobal.sceneStack.push(curScene);
				
			return true;
		}
		
		//h setList ������ ����Ʈ Ű ����
		var riffScene = riff(backScene[0]),
			riffSceneSetList = riffScene.find('.setList');
		if( riffSceneSetList.size() > 0 )
		{
			riffGlobal.setListSelectData = riffSceneSetList.getSettingValue();
			riff.softkey( riffGlobal.softkeySetListData );
			riff.softkey( riffGlobal.softkeySetListFunc );
			riff(".setTitle").show();
			riff(".title").hide();
		}
		else if ( riff(backScene[0]).buffer("ComponentSceneComponentDataSoftkey") )
		{
			riff.softkey( riff(backScene[0]).buffer("ComponentSceneComponentDataSoftkey") );
			riff.softkey( riffGlobal.softkeyFuncGlobal );
		}
		else
		{
			riff.softkey( riffGlobal.softkeyDataGlobal );
			riff.softkey( riffGlobal.softkeyFuncGlobal );
			riff(".title").show();
			riff(".setTitle").hide();
		}

		// feedReceiveTime
		var strTime = "",
			riffSceneTab = riffScene.find('.tab'),
			riffSceneTabList = riffSceneTab.subSceneSelect().find(".list"),
			riffSceneList = riffScene.find(".list");

		if( riffSceneTabList.buffer("ComponentListComponentDataRSSFlag") ) {
			riff.feedReceiveTime( riffSceneTabList.buffer("ComponentListComponentDataRSSTime") );
		}else if ( ( riffSceneTab.size() == 0 ) &&  riffSceneList.buffer("ComponentListComponentDataRSSFlag") ){
			riff.feedReceiveTime( riffSceneList.buffer("ComponentListComponentDataRSSTime") );
		}else {
			riff.feedReceiveTime();
		}

		riff.softkey.softKeyMoreHide();
		riff.adjustSceneSize();	
		
		// option setting
		var appOption = (_option)?_option:curScene[1],
			option = new Array();
		for(var k in appOption)
			option[k] = appOption[k];
		if( !option.transitionEffect ) option.transitionEffect = riffGlobal.transitionEffect;
		if( !option.transitionSecond ) option.transitionSecond = riffGlobal.transitionSecond;
		if( !option.transitionMotion ) option.transitionMotion = riffGlobal.transitionMotion;
		option.transitionDirection = "off";

		riff.transition(  riff(backScene[0]), riff(curScene[0]), option );
		riffGlobal.sceneStack.push(backScene);

		return true;
	}
}


//h ������ ID( _popup ) ��, popup scene���� ����.
//h #id Ȥ�� id �� ����
//h _scene : �̵��� DOM Element�� ID. riff Components�� ����.
//h _option : 
//h		{ "transitionEffect" : "slideVer" / "slideHor" / "popup" / "fade" / "spin" / "none"
//h		  "transitionMotion" : "ease" / "ease-in" / "ease-out" / "ease-in-out" 
//h		  "transitionSecond" : 1234 ( millisec )
//h		  "transitionDirection" : "on" / "off"
//h		  "transitionFunc" : function() { ...alert(); ...};
//h		} ���� ����
riff.popup = function(_popup, _option)
{
	if( typeof _popup == "object" || typeof _popup =="undefined" ) 
		return riff.popup.back.apply(this, arguments);
	else 
		return riff.popup.move.apply(this, arguments);		
};

//h ������ ID( _popup ) ��, popup scene���� ����.
//h #id Ȥ�� id �� ����
//h _scene : �̵��� DOM Element�� ID. riff Components�� ����.
//h _option : 
//h		{ "transitionEffect" : "slideVer" / "slideHor" / "popup" / "fade" / "spin" / "none"
//h		  "transitionMotion" : "ease" / "ease-in" / "ease-out" / "ease-in-out" 
//h		  "transitionSecond" : 1234 ( millisec )
//h		  "transitionDirection" : "on" / "off"
//h		  "transitionFunc" : function() { ...alert(); ...};
//h		} ���� ����
riff.popup.move = function ( _popup, _option )
{
	if( typeof _popup == "string" ) {
		//h _popup�� CSS ID ���·� ������ش�.
		var popup = riff.toID(_popup);
		
		//h ����ƮŰ ��� ��
		riff.softkey.softKeyMoreHide();
		
		//h �˾� �������� ��
		if( riffGlobal.popup )
			riff.popup();

		riff.softkey.softKeyMoreHide();	
		//h popup() �Ʒ��� �������� ������, ����ڰ� Ŭ�� ���ϰ� ����. 
		riff(".blackBlank").show();

		// option setting
		var option = new Array();
		for(var k in _option)
			option[k] = _option[k];
		if( !option.transitionEffect ) option.transitionEffect = riffGlobal.popupTransitionEffect;
		if( !option.transitionSecond ) option.transitionSecond = riffGlobal.popupTransitionSecond;
		if( !option.transitionMotion ) option.transitionMotion = riffGlobal.popupTransitionMotion;
		option.transitionDirection = "on";

		riff(popup).show();
		//h �ϰ͵� ����( null ) ������ �����Ѱ�( .popupCon ) ������ �ϴ� ȿ��.
		riff.transition( riff(popup).children(".popupCon"), null, option );
		
		option.transitionDirection = null;
		option.transitionFunc = null;
		//h ȭ�鿡 �̹� popup �� �� �ִ� �� ǥ��. 
		riffGlobal.popup = [popup, option];

		return true;
	}
}

//h ���� ȭ�鿡 �� �ִ� popup�� �����.
//h _option : 
//h		{ "transitionEffect" : "slideVer" / "slideHor" / "popup" / "fade" / "spin" / "none"
//h		  "transitionMotion" : "ease" / "ease-in" / "ease-out" / "ease-in-out" 
//h		  "transitionSecond" : 1234 ( millisec )
//h		  "transitionDirection" : "on" / "off"
//h		  "transitionFunc" : function() { ...alert(); ...};
//h		} ���� ����
riff.popup.back = function ( _option )
{
	if( typeof _option == "object" || typeof _option == "undefined" ) {
		//h ������ 	
		if( !riffGlobal.popup )
			return true;

		//h ���ڰ� üũ
		var popup = riffGlobal.popup[0];	
		riff.softkey.softKeyMoreHide();
		
		// option setting
		var appOption = (_option)?_option:riffGlobal.popup[1],
			option = new Array();
		for(var k in appOption)
			option[k] = appOption[k];
		if( !option.transitionEffect ) option.transitionEffect = riffGlobal.popupTransitionEffect;
		if( !option.transitionSecond ) option.transitionSecond = riffGlobal.popupTransitionSecond;
		if( !option.transitionMotion ) option.transitionMotion = riffGlobal.popupTransitionMotion;
		option.transitionDirection = "off";
		
		riff(popup).hide();
		//h popup �� ������ �� ��� �� �۾��� �ִ�.
		option.transitionFunc = function () {
			//h ȭ�� ��� ���������� ������� �� ������� �ϰ� 
			riff(".blackBlank").hide();
			//h popup ���� �� ������ �Լ��� ��ϵǾ� ������ ��������.
			if( _option && _option.transitionFunc)
				_option.transitionFunc();
		}
		
		riff.transition( null, riff(popup).children(".popupCon"), option );
		riffGlobal.popup = null;
		

		return true;
	}
}

// riff Object Transition Function
// _on : riff Object that will be showed
// _off : riff Object that will be hided
// _opts : option
//h _option : 
//h		{ "transitionEffect" : "slideVer" / "slideHor" / "popup" / "fade" / "spin" / "none"
//h		  "transitionMotion" : "ease" / "ease-in" / "ease-out" / "ease-in-out" 
//h		  "transitionSecond" : 1234 ( millisec )
//h		  "transitionDirection" : "on" / "off"
//h		  "transitionFunc" : function() { ...alert(); ...};
//h		} ���� ����
riff.transition = function ( _on, _off, _opts )
{
	var effect = null,
		motion = null,
		second = null,
		direction = null,
		func = null;
	
	for (var k in _opts)
	{
		if( k == "transitionEffect" ) effect = _opts[k];
		else if( k == "transitionSecond" ) second = _opts[k];
		else if( k == "transitionMotion" ) motion = _opts[k];
		else if( k == "transitionDirection" ) direction = _opts[k];
		else if( k == "transitionFunc" ) func = _opts[k];
	}			
	
	if( !effect ) effect = riffGlobal.transitionEffect;
	if( !second ) second = riffGlobal.transitionSecond;
	if( !motion ) motion = riffGlobal.transitionMotion;
	if( !direction ) direction = riffGlobal.transitionDirection;
	
	if( effect == "none" )
	{
		if ( _off ) _off.hide();
		if ( _on ) _on.show();
		if( func ) func();

		return true;
	}

	if ( direction == "on" ) direction = "On";
	else if ( direction == "off" ) direction = "Off";

	riff(".whiteBlank").show();
	
	if( _off )
	{
		_off.addClass( effect + direction + "Cur");
		_off.css("-webkit-animation-timing-function", motion );
		_off.css("-webkit-animation-duration", second );

	}
	
	if( _on )
	{
		_on.show();
		_on.addClass( effect + direction + "App");
		_on.css("-webkit-animation-timing-function", motion );
		_on.css("-webkit-animation-duration", second );
	}
	
	window.setTimeout(
		function(){
		
			if( _off )
			{
				_off.hide();
				_off.removeClass(effect + direction + "Cur");
				_off.css("-webkit-animation-duration", "" );
				_off.css("-webkit-animation-timing-function", "" );
			}
					
			if( _on )
			{
				_on.removeClass(effect + direction + "App");
				_on.css("-webkit-animation-duration", "" );
				_on.css("-webkit-animation-timing-function", "" );
			}
			
			riff(".whiteBlank").hide();
			
			if( func )
				func();
		},
		window.parseFloat(second)*1000);

	return true;
}


//h ���� �������� ����� ���δ�.
//h ���� ��ü�� ������ ������ ����� ���̰�
//h ������ �� ������ ������ ����
//h ���ڰ� �ϳ��� ���� ���� ������
//h ���� Ȱ��ȭ ũ���� 480, 800���� ����
// resize
// resize window
riff.resize = function ( _width, _height )
{
	if( typeof _width != "number" ||  typeof _height != "number" )
		return false;

	if(arguments.length == 0 || arguments.length == 1){
		_width = 480; /*jb Device �� width, height (Indicator ������ ��) �� �������� API �̿��Ͽ� �� ���� widget API �� ��� Indicator �κ��� Height �� �������� APi�� �����Ѵ�.*/
		_height = 800;
	}
	
	if( riff.isWidget() || riff.isEmulator() ){

		widget.window.resizeWindow(_width, _height);
	}else{
		window.resizeTo(_width, _height);
	}

	return true;
}

//riff storage
//save data on device
//save cookie, perference if possible
//if return value exist, return peference value
//if preference value doesn't exist, return cookie value
riff.storage = function ( _key, _value )
{
	if( !_key ) {
		return null;
	}

	if( arguments.length == 2 ) {
		if( riff.isWidget() ) 
			riff.storage.preference( _key, _value );
		else {
			riff.storage.localStorage( _key, _value );
		}		
		return true;
	} else if(arguments.length == 1 ) {
		if( riff.isWidget() ) {
			return riff.storage.preference( _key );
		} else {
			return riff.storage.localStorage( _key );
		}
	}
};


//save data by using perference function
riff.storage.preference = function (_key, _value)
{
	if ( !riff.isWidget() || !_key )
	{
		return null;
	}

	if ( arguments.length == 1 )
		return widget.preferenceForKey( _key );
	else if( arguments.length == 2 )
		return widget.setPreferenceForKey( _value, _key );
}

//h ����ڰ� PC���� widget�� �׽�Ʈ�� ��, localStorage�� �̿��Ͽ� ��⿡ �����Ѵ�.  
//h �����ϴ� ���� ���ڿ��� �����ϴ�. ��ü ���� ������ �� ����.
//h ���ڰ� : 
//h		_key : ���ڿ�. ������( _value)�� �������ų� ������ �� ����� Ű��
//h		_value : ���ڿ�. ������ ��.
//h ��ȯ�� : 
//h		���ڰ��� 1���� �� :
//h			���� ���� : key �� ����� �� ��ȯ( ���ڿ� )
//h			���� ���� : null ��ȯ
//h		���ڰ��� 2���� �� :
//h			���� ���� : true ��ȯ
//h			���� ���� : null ��ȯ
// save data by using localStorage
// parameter 
//	@_key : string. used by key to find data or set data with key. 
//	@_value : string. used data to save. indexed by(with) key.
//
riff.storage.localStorage = function ( _key, _value )
{
	if ( !_key )
		return null;
	//h local Storage�� ������ ����
	var storageObj = window.localStorage;
	if ( !storageObj ) {
		riff.alert(" the localStorage() Object is not exist.");
		return null;
	}

	if( arguments.length == 1) {
		//h ����� �� ��ȯ
		return storageObj.getItem( _key );
	} else if( arguments.length == 2 ) { 
		//h ����
		storageObj.setItem( _key, _value );
		return true;
	}
	return null;
};

//global setting function
//two style argument
//riff.option ( { "key" : "value",
//                 "key2" : ["value1", "value2"] );
//riff.option ( "key", "value" );
//riff.option ( "key", ["value1", "value2"] );
riff.globalSetting =  riff.option = function( )
{
	var setting = {};

	//if first argument is string
	if(typeof arguments[0] == "string")
		setting[ arguments[0] ] = arguments[1];
	else if(typeof arguments[0] == "object")
		setting = arguments[0];

	for(var k in setting)
	{
		if( k == "transitionEffect" || k == "transitionSecond"  || k == "transitionMotion" 
			|| k == "isAlwaysNewSubScene" || k == "isAutoRefreshChangeOtherSubscene"  || k == "isRefreshChangeOtherSubscene" 
			|| k == "useRssCache" || k == "rssAutoRefreshTime"
			|| k == "popupTransitionEffect" || k == "popupTransitionSecond"  || k == "popupTransitionMotion" 
			|| k =="softkeySetListData"  ||  k =="softkeySetListFunc"  )
		{
			riffGlobal[k] = setting[k];
		}
		else if(k =="theme" )
		{
			riffGlobal.theme = setting[k];
			var cssLink = riff('head').children('link').each(
				function()
				{
					if ( riff(this).attr('href').indexOf('theme.css') != -1 )
						riff(this).remove();
				});
		
			if( riffGlobal.theme != "none" )
				riff('head').append('<link rel="stylesheet" href="theme/'+riffGlobal.theme+'/theme.css" type="text/css">');
		}		
		else if( k == "softkeyType" || k == "softkeyFunc" || k == "softkeyData" )
		{
			if( setting[k] == "none" || k == "softkeyData" )
				riffGlobal.softkeyDataGlobal = setting[k];
			if( k == "softkeyFunc" )
				riffGlobal.softkeyFuncGlobal = setting[k];

			riff.softkey(setting[k]);
		}
		else if( k =="name" )
		{
			riffGlobal.name = setting[k]; /*jb widget api �� �̿��ؼ� �ϴ� ��� �˾ƺ��� */
		}
		else if ( k =="eventType" )
		{
			riffGlobal.eventType = setting[k];
		}
		else if( k == "pageCache" )
		{
			if( setting[k] == true && riff.storage("riffPageCacheData") )
				riff.move ( riff.storage("riffPageCacheData") );
			
			riffGlobal.pageCache = setting[k];
		}
	}
	return true;
};

//h softkey 
//h argument�� ������Ʈ�� ������ ������ �迭�̶�� �ν�
//h argument�� function�� ������ ��Ű�� �� ����̶�� �ν�
//h arugment�� ���ڿ��� ������ Ÿ���̶�� �ν�(type1, type2)
riff.softkey = function ()
{
	if( riff(".softkey").size() == 0 )
		riff('.scenes').after('<div class="softkey"></div>');
	
	for( var i = 0; arguments[i]; i++ )	{
		
		if( typeof arguments[i] == "object" ) {			// softkey data
			riffGlobal.softkeyData = arguments[i];	 
		}else if( typeof arguments[i] == "string" ){	 		// softkey type
			if( arguments[i] == "none" ){
				riff('.softkey').remove();
				break;
			}
			riffGlobal.softkeyType = arguments[i];
		} else if ( typeof arguments[i] == "function" )	{		// softkey function
			riffGlobal.softkeyFunc = arguments[i];
		}

		riff(".softkey").makeContents( riffGlobal.softkeyData, riffGlobal.softkeyType, riffGlobal.softkeyFunc  );
	}
	
	riff.adjustSceneSize();

	return true;
};

// more softkey Hide
riff.softkey.softKeyMoreHide = function()
{
	if( riff('.softkey.type1 ul.moreList').size() !=0 && riff('.softkey.type1 ul.moreList').css('bottom') == '70px' )
	{
		var morekeyHeight = Math.abs(70-riff('.softkey.type1 ul.moreList').height());
		riff('.softkey.type1 ul.moreList').css('bottom','-'+morekeyHeight+'px');
	}	
	return true;
};

// ajax
riff.ajax = function ( _url, _fnSuccess, _option )
{
	if( !_url || typeof _url != "string" )  {
		return false;
	}
	if( _fnSuccess && typeof _fnSuccess != "function" )  {
		return false;
	}
	if( _option && typeof _option != "object" )  {
		return false;
	}
	
	return new riffAJAX( _url, _fnSuccess, _option  );	/* return true, falss �� ����*/
}

// xml
riff.xml = function ( _url, _fnSuccess, _opts  )
{
	if( arguments.length == 2 && typeof _url =="string" && typeof _fnSuccess == "object") {
		var opts = _fnSuccess,
			funcLoad = opts["load"],
			funcAttach = opts["attach"],
			funcOpts = opts["option"];

		return new riffXML( _url, function( _xml, _xmlObject, _xmlString ){
			var r;
			if( typeof funcLoad  == "function" )
				r = funcLoad.call(_xml, _xml, _xmlObject, _xmlString );
			if ( typeof funcAttach == "function" )
				funcAttach.call(_xml, r );
			},	funcOpts 
		);
	}else {
		return new riffXML( _url, _fnSuccess, _opts  );
	}
}

//h window �� ���� load�ǰ� ����( = onload �̺�Ʈ ����� ) �۵��� �Լ� ����
//h ���ڰ� : 
//h		_func : window load �Ϸ��� ������ �Լ�.
//h ��ȯ�� : 
//h		true
riff.load = function( _func ) 
{
	//h Window ��ü�� ������ load�ǰ� ���� �����ϴ� �Լ��� �����Ѵ�.
	//h _func �� ������ ����.
	if( !_func || typeof( _func ) != 'function' )
	{
		return true;
	}
	//h ���� �����Ǿ� �ִ� onload �Լ��� ������, _func �� �ٷ� �����Ѵ�.
	var loadFunc = window.onload;
	if( !loadFunc )
	{
		window.onload = _func;
		return true;
	}

	//h �̹� �����Ǿ� �ִ� window.onload �Լ��� ������, �ش� �Լ��� ���� ������ �� _func �� ������ �����ϵ��� �����Ѵ�.
	var setFunc = function()
	{
		loadFunc.call( window );
		_func.call( this );
	}
	window.onload = setFunc;
	return true;
};

//d x = riff.noConflict();
//d x("abcd").,,,
riff.noConflict = function ()
{
	window.$ = riffGlobal.$;

	return riff;
};


// now time
riff.now = function ( )
{
	var	timeCur = new Date();
	
	return (1900 + timeCur.getYear()) + "-" + (1 + timeCur.getMonth()) + "-" + timeCur.getDate() + " " + timeCur.getHours() + ":" + timeCur.getMinutes();
};

//h RSS Component���� pubData Ȥ�� ������ ���� ���� �ð� ���� html�� ���.
riff.feedReceiveTime = function ( _str )
{
	if( arguments.length == 1 ) {
		riff(".feedReceiveTime").show();
		riff(".feedReceiveTime").html(_str);
	}else {
		riff(".feedReceiveTime").hide();
		riff(".feedReceiveTime").html("");
	}

	return true;
};

//h ȭ�� ũ�⸦ �ڵ� ���.
riff.adjustSceneSize = function ()
{
	// Scene Height Controller
	var h = 16; // Margin-top

	//h Title ó��. Scene �� Top POsition ���� ������ �ش�.
	if(riff('.widgetWrap').find('.title').size() != "0" && riff('.widgetWrap').find('.title').css('display') != "none"){
		var titleH = riff('.widgetWrap').find('.title').height();
		h = h + titleH;

		riff('.widgetWrap').find('.scenes').css('top',h+"px");
	}

	if(riff('.widgetWrap').find('.setTitle').size() != "0" && riff('.widgetWrap').find('.setTitle').css('display') != "none"){
		var setTitleH = riff('.widgetWrap').find('.setTitle').height();
		h = h + setTitleH;
		riff('.widgetWrap').find('.scenes').css('top',h+"px");
	}

	if(riff('.widgetWrap').find('.softkey').size() != "0" && riff('.widgetWrap').find('.softkey').css('display') != "none")
		h = h + riff('.widgetWrap').find('.softkey').height();

	if(riff('.widgetWrap').find('.feedReceiveTime').size() != "0" && riff('.widgetWrap').find('.feedReceiveTime').css('display') != "none")
		h = h + riff('.widgetWrap').find('.feedReceiveTime').height();

	var sceneH = 762-h+"px"; //h 762px�� ���� �ִ� ����

	riff('.widgetWrap').find('.scenes').css('height',sceneH);
	riff('.widgetWrap').find('.scene').css('height',sceneH);
	riff('.widgetWrap').find('.sceneBackground').css('height',sceneH);
	riff('.widgetWrap').find('.sceneWrap').css('height',sceneH);

	//Subscene
	var tabH = window.parseInt(riff('.tab').css('height'))+window.parseInt(riff('.tab').css('border-top-width'))+window.parseInt(riff('.tab').css('border-bottom-width'))+window.parseInt(riff('.tab').css('padding-top'))+window.parseInt(riff('.tab').css('padding-bottom'))+window.parseInt(riff('.tab').css('margin-bottom'))+window.parseInt(riff('.tab').css('margin-top')),
		 tabSubSceneH = window.parseInt(sceneH)-tabH;

	 riff('.tab').parent().find('.subScene').css('height',tabSubSceneH+"px");

	 return true;
}

//h XML�� �˻��� ����� riff�� �� �־� �����Ͽ�, riff�� filter, each ���� ����� �� �ְ� ����.
//d var riff.XML.getAllDataByQuerySelectorReturnriff = function ( _xml, _queryString, _xPathResultType ) 
//d var getDataBySelectorReturnriff = function ( _xml, _queryString ) 
riff.xmlSelector = function ( _xml, _queryString ) 
{ 
	if ( !_xml || typeof( _xml ) != 'object' || !_xml.documentElement ) {
		return null;
	}

	var rv = new Array();
	var len = 0;
	var t3 = _xml.documentElement.querySelectorAll( _queryString );

	//h xml �˻������ ���� ���
	if( (len = t3.length) < 0 &&  (len = (_xml.getElementsByTagName( _queryString )).length) < 0 ){
		return riff();
	}

	//h �˻� ��� ��ŭ XML Element�� �迭�� �ִ´�.
	for( var lp = 0; lp < len; lp++ )	{
		rv.push( t3[ lp ] );
	}

	return riff( rv );
};


//h ���ڿ� �ڿ� ������ǥ ���̱�
riff.ellipsisString = function ( _str, _num )
{
	if( typeof _str == "string" ) {
		var num = ( typeof _num == "number" )?_num: 
			(( typeof _num == "string" )?window.parseInt(_num):
				riffGlobal.ellipsisStringNum);

		return (_str.length > num)?_str.substring(0,num-3)+"...":_str;
	}

	return null;
};


//h �÷����� �߰��Լ� (�Լ�Ȯ��)
riff.extend = function ( _name, _function )
{
	//h �������� �Լ��� �޾Ƽ� �ϳ��� �ٽ� extent() �� ȣ���ؼ� ����Ѵ�.
	if( typeof _name == "object" ) {
		for ( var k in _name ) {
			riff.extend(k, _name[k]);		// extend recall
		}
	}else if (typeof _name == "string" && typeof _function == "function" ) {
		riff.fn[_name] = _function;
	}
	return true;
};

//h option�� ���Ե� �˸�â
riff.alert = function ( _str, _opts )
{
	var opts = {};

	opts.cancelFunc = function(){ riff.back(); };

	for ( var k in _opts )
		opts[k] = _opts[k];
	opts.html = _str;
		
	//h �˾� markup ���� �κп��� ó�����ش�.
	riff("#alert").makeContents( opts );

	//h ȭ�鿡 �˸�â�� ������ �˸�â�� �����ش�.
	if( !(riffGlobal.popup && riffGlobal.popup[0] == "#alert")  ) {
		riff.move("alert");
	}

	return true;
};

//h timer�� �����ϱ� ���� �Ե� �Լ�.
//h _func : timer ����ÿ� ����Ǵ� �Լ�.
//h _time : timer �Լ��� ����Ǵ� �ֱ�
//h _id   : timer �� ���԰����ϱ� ���� ����ϴ� id, id���� �� �־�����Ѵ�.
//h riff.timer(_id) �̷������� ����Ұ�� timer����
riff.timer = function( _func, _time, _id )
{
    if(arguments.length == 1 && typeof arguments[0] =="string")
    {
		if ( riffGlobal.timerList[_func] )
		{
			clearInterval( riffGlobal.timerList[_func] );
			riffGlobal.timerList[_func] = null;
		}

		return true;
    }
	else if ( typeof _func == "number")
	{
		clearInterval( _func );

		for( var k in riffGlobal.timerList )
		{
			if( riffGlobal.timerList[k] == _func )
				riffGlobal.timerList[k] = null;
		}

		return true;
	}
    else if( typeof _func == "function" )
    {  
		if( _id && riffGlobal.timerList[_id])
			riff.timer(_id);
        var count = 0; 
        var ti = ( _time ) ? setInterval(function(){ _func.call(this, ++count);},_time) : setTimeout(_func, 0);
		if( _id) riffGlobal.timerList[_id] = ti;

		return ti;
    }
};


//h riffGlobal.isAlwaysNewSubScene, riffGlobal.isAutoRefreshChangeOtherSubscene, riffGlobal.isRefreshChangeOtherSubscene( ������ ) �� ���� ȭ�� ���� ��å�� �����Ѵ�.
//h ��å ���� ���� ������ ����.( tab�� ���� ���. )
//h ���� Markup �� �ڵ������� ���Ĵ�, ��� flag �� undefined�̴�. ( �������, ComponentTab�� �� TAB.isSubsceneNew = undefined )
//h ���� ���� TAB �� ���� ȭ�� focus �Ǵ� 0��° TAB��, RSS() -> XML() �� ���� ������ ������ �ϸ鼭 isSubsceneNew �� true �� �ٲ۴�.
//h �� ����
//h
//h 1. riffGlobal.isAlwaysNewSubScene �� riffGlobal.isAutoRefreshChangeOtherSubscene, riffGlobal.isRefreshChangeOtherSubscene �� �켱�Ѵ�.
//h		riffGlobal.isAlwaysNewSubScene = true �� ���, ���� ȭ�� flag�� �׻� false �� ���� -> ȭ�� �̵��ϸ� �׻� �������� ������ �����ؼ� ȭ�� �籸��. 
//h
//h 2. isAutoRefreshChangeOtherSubscene	= false / isRefreshChangeOtherSubscene	= false �� ��� ; AutoRefresh �� Refresh ��, "���� ���õ� TAB�� �����͸� �����Ѵ� �ص� �� ���� ���θ� �ٸ� TAB���� �����ϰų� ������ ��ġ�� �ʴ� ���."
//h		���� Focus�� TAB�� flag -> NEW�� ����
//h		���� Focus�� TAB�̿��� flag -> ������Ѵ�.
//h		�븮�� ȿ�� : ���� TAB�� ���Ŷ�� �� �˸���, �������� �ǵ帮�� �ʴ´�. �̷� �� TAB �� �� �� TAB�� ���� ���� ��ġ�� �ʰ�, �� TAB ���� ���ƿ��� ���� TAB�� DOM �� �״�� ������ �� �ִ�.
//h
//h 3. isAutoRefreshChangeOtherSubscene	= true / isRefreshChangeOtherSubscene	= true �� ��� ; AutoRefresh �� Refresh ��, "���� ���õ� TAB�� �����͸� �����ϸ�, �� TAB���� �����Ͽ� �׻� �ֽ� �����ͷ� �����ؾ� �Ѵ�."
//h		���� Focus�� TAB�� flag -> NEW�� ����
//h		���� Focus�� TAB�̿��� flag -> OLD�� ����.
//h		�븮�� ȿ�� : ���� TAB�� ���Ŷ�� �� �˸���, ���ÿ� �� TAB���� ������ �����Ͷ� �� �˸���. �̷� �� TAB �� ������ �����͸� �׻� ���ɷ� �������� ���� �������� ��������, ���� TAB�� DOM���� �����͸� �����ִ� ���� ����.
//h
//h 4. isAutoRefreshChangeOtherSubscene	= true / isRefreshChangeOtherSubscene	= false �� ��� ; AutoRefresh �� ���� ���� TAB�� ������ �����ϸ� �ٸ� TAB�鵵 �����ϰ� �����ϰ�, Refresh �� ���� ���� TAB�� ���� ���ΰ� �ٸ� TAB���Դ� ��������� �Ѵ�.
//h		AutoRefresh �� �߻��� ��� : ���� TAB �� �����ϰ�, �ٸ� TAB �� �����ϰ� �Ѵ�.
//h		���� Focus�� TAB�� flag -> NEW�� ����
//h		���� Focus�� TAB�̿��� flag -> OLD�� ����.
//h		�븮�� ȿ�� : ���� TAB�� ���Ŷ�� �� �˸���, ���ÿ� �� TAB���� ������ �����Ͷ� �� �˸���. �̷� �� TAB �� ������ �����͸� �׻� ���ɷ� �������� ���� �������� ��������, ���� TAB�� DOM���� �����͸� �����ִ� ���� ����.
//h		Refresh �� �߻��� ��� : ���� TAB �� �����ϵ�, �ٸ� TAB �� ���д�.
//h		���� Focus�� TAB�� flag -> NEW�� ����
//h		���� Focus�� TAB�̿��� flag -> ������Ѵ�.
//h		�븮�� ȿ�� : ���� TAB�� ���Ŷ�� �� �˸���, �������� �ǵ帮�� �ʴ´�. �̷� �� TAB �� �� �� TAB�� ���� ���� ��ġ�� �ʰ�, �� TAB ���� ���ƿ��� ���� TAB�� DOM �� �״�� ������ �� �ִ�.
//h
//h 5. isAutoRefreshChangeOtherSubscene	= false / isRefreshChangeOtherSubscene	= true �� ��� ; AutoRefresh �� ���� ���� TAB�� ���� ���ΰ� �ٸ� TAB���Դ� ��������� �ϰ�, Refresh �� ���� ���� TAB�� ������ �����ϸ� �ٸ� TAB�鵵 �����ϰ� �����Ѵ�. 
//h		AutoRefresh �� �߻��� ��� : ���� TAB �� �����ϵ�, �ٸ� TAB �� ���д�.
//h		���� Focus�� TAB�� flag -> NEW�� ����
//h		���� Focus�� TAB�̿��� flag -> ������Ѵ�.
//h		�븮�� ȿ�� : ���� TAB�� ���Ŷ�� �� �˸���, �������� �ǵ帮�� �ʴ´�. �̷� �� TAB �� �� �� TAB�� ���� ���� ��ġ�� �ʰ�, �� TAB ���� ���ƿ��� ���� TAB�� DOM �� �״�� ������ �� �ִ�.
//h		Refresh �� �߻��� ��� : ���� TAB �� �����ϰ�, �ٸ� TAB �� �����ϰ� �Ѵ�.
//h		���� Focus�� TAB�� flag -> NEW�� ����
//h		���� Focus�� TAB�̿��� flag -> OLD�� ����.
//h		�븮�� ȿ�� : ���� TAB�� ���Ŷ�� �� �˸���, ���ÿ� �� TAB���� ������ �����Ͷ� �� �˸���. �̷� �� TAB �� ������ �����͸� �׻� ���ɷ� �������� ���� �������� ��������, ���� TAB�� DOM���� �����͸� �����ִ� ���� ����.
//h
riff.changeSubsceneFlag = function( _maxLength, _currentIndex, _dataSet, _isGoRun, _isAutoRefreshRun, _isRefreshRun )
{	
	//h ���� TAB�� ȭ�� ���� ���θ� �ٸ� TAB���� �������� �ʴ´�.
	function DontCareTheOtherSubscene()
	{
		_dataSet[ _currentIndex ].isSubsceneNew = true ;		
	};

	//h ���� TAB�� ȭ�� ���� ���θ� �ٸ� TAB���Ե� �����Ѵ�.
	function TheOtherSubsceneMakeOld()
	{
		for( var lp = 0; lp < _maxLength; lp++ )
		{
			_dataSet[ lp ].isSubsceneNew = false;
		}
		_dataSet[ _currentIndex ].isSubsceneNew = true ;
	};

	//h ���� ȭ�� flag�� �׻� false �� ���� -> ȭ�� �̵��ϸ� �׻� �������� ������ �����ؼ� ȭ�� �籸��. 
	if ( true == riffGlobal.isAlwaysNewSubScene )
	{
		TheOtherSubsceneMakeOld();
		return true;
	} 

	//h ȭ���� Component.move() �� ���� ���ŵȰŶ��
	//h ���� _isAutoRefreshRun / _isAutoRefreshRun �� ���� ������ 
	if ( ( _isGoRun && (true == _isGoRun) )
		|| ( typeof( _isAutoRefreshRun ) == 'undefined' && typeof( _isRefreshRun ) == 'undefined' )
		)
	{
		//h ������ TAB�� �����ϰ�, ������.
		DontCareTheOtherSubscene();
		return true;		
	};

	if ( !riffGlobal.isAutoRefreshChangeOtherSubscene && !riffGlobal.isRefreshChangeOtherSubscene )
	{
		DontCareTheOtherSubscene();
	} else if ( true == riffGlobal.isAutoRefreshChangeOtherSubscene && true == riffGlobal.isRefreshChangeOtherSubscene )
	{
		TheOtherSubsceneMakeOld();
	} else if ( true == riffGlobal.isAutoRefreshChangeOtherSubscene && !riffGlobal.isRefreshChangeOtherSubscene )
	{
		if ( true == _isAutoRefreshRun )
		{
			TheOtherSubsceneMakeOld();
		} else if ( true == _isRefreshRun )
		{
			DontCareTheOtherSubscene();
		}
	} else if ( !riffGlobal.isAutoRefreshChangeOtherSubscene && true == riffGlobal.isRefreshChangeOtherSubscene )
	{
		if ( true == _isAutoRefreshRun )
		{
			DontCareTheOtherSubscene();
		} else if ( true == _isRefreshRun )
		{
			TheOtherSubsceneMakeOld();
		}
	}

	return true;
}


//h �迭���� �ƴ��� üũ
riff.isArray = function()
{
	if( arguments.length > 0)
	{
		 if ( arguments[0].push )
		 {
			return true;
		 } 
		 else 
		{
			 return false;
		}
	} else {
		return false;
	}
}



riff.fn.selector.prototype = riff.fn;
window.riff = window.$ = riff;
window.riffGlobal = riffGlobal;

document.write("<script src=riff_component.js ></script>");
document.write("<script src=riff_componentsetting.js ></script>");
document.write("<script src=riff_touchevent.js ></script>");
document.write("<script src=riff_ajax.js ></script>");
document.write("<script src=riff_xml.js ></script>");
document.write("<script src=riff_widgetapi.js></script>");

}
)(window);


