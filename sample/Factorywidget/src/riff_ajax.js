//
// RIFFjs TrialVersion 1.0.29 
//
// Copyright 2011, Licensed under the MIT license.
// http://innovator.samsungmobile.com/
//
//

var riffAJAX = function ( _url, _fnSuccess, _theOtherSet, _functionTossAgumentSet )
{

	var tAjaxForTimeout = this;
	this.__xhr = null;
	this.__successFunction = _fnSuccess;
	this.__errorHandler = _theOtherSet && _theOtherSet.e;
	this.__abortHandler = _theOtherSet && _theOtherSet.a;
	this.__retryHandler = _theOtherSet && _theOtherSet.r;
	this.__timeoutHandler = _theOtherSet && _theOtherSet.t;				// timeout handler
	this.__timeoutMillisec = _theOtherSet && _theOtherSet.timeout;		// millisec
	this.__timeoutObject = null;					// window.setTimeout Object
	this.__retry = _theOtherSet && _theOtherSet.retry;
	this.__retryCount = 0;
	this.__sendData = _theOtherSet && _theOtherSet.sendData;	// mouse move
	this.__option = {
		type : "GET",
		isAsync : true,
		contentType : "TEXT"
	};

	//h ���� callback�� ���ų�, �����̸�
	if( !this.__successFunction || typeof( this.__successFunction ) != 'function' )	
	{
		return false;
	}

	//h ����ÿ� ���� �����͸� null �ؼ�, �޸� ������ ��û����.
	this.__destroy = function( )
	{
    //d alert( "destroy start: _ajax:" + _ajax );
		try
		{
			window.clearTimeout( this.__timeoutObject );
			this.timeout = null; 
			tAjaxForTimeout = null;
			this.__xhr = null;
			this.__errorHandler = null;
			this.__abortHandler = null;
			this.__retry = null;
			this.__retryCount = null;
			this.__timeoutObject = null;
		}
		catch ( e )
		{
			return null;
		}
	};

	//h ������ �ۼ��� ����ϸ�, �׳� ������.
	this.abort = function( ) {
        //d alert( "Abort start: _ajax:" + _ajax.__retryCount );
		//h HTTP request�� �����ϸ�
		if ( this.__xhr )
		{
			this.__xhr.abort();
		}
		//h abort�� �� handler�� �����ϸ�
		if ( this.__abortHandler && typeof( this.__abortHandler ) == 'function' )
		{
			this.__abortHandler( this, this.retryCount );
		}
		//h abort�ϱ�, �����ߴ� ������ �� ������.
		//h �������� �ߴµ�, retry������ abort -> retry�ϱ� ������ ������ �ȵȴ�.
        //d		this.__destroy();
        //d		return null;
	};
	
	//h ����ڰ� ������ ��ҽ�Ű�� �Լ�.
	this.abortByUser = function ( )
	{
		//h timeout �� �����ϰ�
		window.clearTimeout( this.__timeoutObject );
		this.__timeoutObject = null;
		//h retryCount �� �ʱ�ȭ.
		this.__retryCount = 0 ;
		this.abort();
	};

	//h retry��, XMLHttpRequest.Request �� �������.
	this.retry = function( ) {
        //d alert( "retry start: _ajax:" + _ajax );
		//h �̶��� abort �� abortCallBack()�� �����ϰ�
		this.abort();	

		//h HTTP request�� �����ϸ�
		if ( this.__xhr )
		{
			//h Request ���.
			this.Request( );
		
			//h retry Handler ������ ����
			if ( this.__retryHandler && typeof( this.__retryHandler ) == 'function' )
			{
				this.__retryHandler( this, this.__retryCount );
			} 
		}
	};

	this.retryOnError = function( ) {

		//h status �Ҵ�. �������� -1 ��. 
		var	readystate = this.__xhr.readyStatus;
		if ( typeof( readystate ) == "undefined" ) 
		{	
			readystate = -1; 
		}

		var status = -1;
		try
		{
			status = this.__xhr.status; 
		}
		catch ( e )
		{
			status = -1;
		}

		//h retry count up �� �ְ�
		this.__retryCount++;

		//h retry Ƚ���� �Ѿ�����, ����.
		if ( this.__retryCount > this.__retry )
		{
			//h error handler�� ������ ����.
			if ( this.__errorHandler && typeof( this.__errorHandler ) == 'function' )
			{
				this.__errorHandler( readystate, status, "ajax.timeout :: retry over. " );
			}
		} else {
			this.retry( );
		}
	};

	//h timeout�� �߻��ϸ�, retry ������ �˻��Ѵ�.
	//h �̹� �ð��� ����ߴٴ� �Ŵϱ�. 
	//h readyState == 4 && status == 0 or 200���� Ȯ��( ��� ���� ���� ���� Ȯ�� )
	//h ����� �̹� �����ߴٸ� ����ڰ� clearTimeout�� ���� �Ŵϱ�, �׳� ����
	//h ����� �����ߴٸ� 
	//h retry ������ �´��� Ȯ���ϰ�.
	//h �´ٸ�, XMLHttpRequest.Request ����� �� Timeout CallBack()����.  
	//h Ʋ���ٸ�, abort() ���� �� abort CallBack() ����.
	//h �۾� �� ������ ����, timeoutHandler ����.
	this.timeout = function( ) {
        //d alert( "timeout start: _ajax:" + _ajax + " readyState: " + _ajax.readyState );
		//h timeout���� üũ ����. timeoutMillisec ���� ���ų� 0 ���ϸ�, ������ �ƴ� �ɷ� ����� �ƹ� �͵� ���Ѵ�.
		if ( ! this.__timeoutMillisec || typeof( this.__timeoutMillisec ) != 'number' || this.__timeoutMillisec <= 0 ) { return null; }
		//h retry ���� üũ. retry ������ ���ų� �������̸�, retry ���Ѵ�.
		if ( ! this.__retry || typeof( this.__retry ) != 'number' || this.__retry < 0 )	{	return null;	}

		this.__retryCount++;
		//h retry Ƚ���� �Ѿ�����, ����.
		if ( this.__retryCount > this.__retry )
		{
			//h �̶��� abort �� abortCallBack()�� �����ϰ�
			this.abort( );
			//h error handler�� ������ ����.
			if ( this.__errorHandler && typeof( this.__errorHandler ) == 'function' )
			{
				this.__errorHandler( this.__xhr.readyStatus, -1, "ajax.timeout :: retry over. " );
			}

		} else {
			//h ����� ���ؼ���, abort�� abortCallBack()�� �����Ѵ�.
			this.retry( );
		}

		//h handler�� ������ ����.
		if ( this.__timeoutHandler && typeof( this.__timeoutHandler ) == 'function' )
		{
			this.__timeoutHandler( );
		}
	}; 

	//h ������ ��ȯ�� �����ߴ����� Ȯ���Ѵ�.
	//h readyState�� 4 + status 0/200 + responseText / responseXML�� �����ϴ����� Ȯ���Ѵ�.
	//h framework���� �����ϴ� ajax ��ü��, [������ ����] �� �������̴�.
	//h ��, ����ڰ� framework �� ajax ��ü�� ����Ѵٸ�, �ݵ�� ������ ������ �߻��Ѵٴ� ���� �Ͽ� �ڵ尡 �ۼ��� �Ǿ� �����Ƿ�
	//h ���۸��� ������ ���� ����Ѵٸ�, �� �Լ��� �����Ͽ��� �Ѵ�.
	this.__receiveSuccessCheck = function() {
		if (
				( riffGlobal.AJAXREADYSTATE.DONE == this.__xhr.readyState )			// readyState = 4 üũ
				&& ( ( 0 === this.__xhr.status ) || ( 200 === this.__xhr.status ) )		// readyStatus = 0 / 200 üũ
				&& ( this.__xhr.responseText || this.__xhr.responseXml )				// return value �� �ִ��� üũ
			)
		{
			return true;
		}

		return false;
	};

	//h ������ �������� ���� �� �ϵ�.
	//h Ajax��ü�� ������ ���� �ٸ� ����, �ٸ� �����ͷ� ����� ���� ���� �������� �����ϰ�, 
	//h retry ���� �����. -> ���������ϱ�.
	//h timeout ��ü�� �����. -> ���������ϱ�.
	this.requestSuccess = function( ) {
		window.clearTimeout( this.__timeoutObject );
		this.__timeoutObject = null;
		this.__retryCount = 0 ;
	};

	//h ���� ó�� �Լ�( callback �� ������ �� default )
	this.defaultError = function( _readyState, _status, _description )
	{
		var s = "Error occured: readyState:" + _readyState + " status:" +_status;
		if ( _description )	{	s += " " + _description;	}
        //d	x.pop('#popup99');
		riff.alert( s );
	};

	// ajax::Request 
	this.Request = function ( ) {
		if ( this.__xhr == null) {
			this.__errorHandler( -1, -1, "ajax.Request :: Object initialization failed." );
			return false;
		} else {

			this.__xhr.open( this.__option.type, _url, this.__option.isAsync );
			this.__xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			this.__xhr.send( this.__sendData );
			
			// TimeoutSetting
            //d	tAjaxForTimeout.__timeoutObject = window.setTimeout( 
			if ( this.__timeoutMillisec > 0 )
			{
				this.__timeoutObject = window.setTimeout( 
					function( ) { 
						//d	alert(" timeout alert. rssText:" + this.rssText + "|" + tAjaxTest ); 
						//d tAjaxForTimeout.timeout( tAjaxForTimeout.__xhr.ajax ); 
						tAjaxForTimeout.timeout( ); 
					}
					, this.__timeoutMillisec );
			}
			//h Sync ����϶� ( isAync = false ) ����ǰ� �Ϸ��� ���� �ڵ��ε�. �̰� ���� ������ ���� �ڳ�.
		}
	};

	// ajax::Constructor 
	{
		//h fnSuccess�� option ����
		if ( _theOtherSet )
		{
			this.__option.type = _theOtherSet.type || "GET";
			this.__option.isAsync = ( typeof( _theOtherSet.isAsync ) == "undefined" ) ? true : _theOtherSet.isAsync ;
			this.__option.contentType = _theOtherSet.contentType || "TEXT";
			//h �빮�� ��ȯ
			this.__option.type = this.__option.type.toUpperCase();
			this.__option.contentType = this.__option.contentType.toUpperCase();
		}

		//h connection fail ���� ���� retry ����
		if ( typeof( this.__retry ) == 'undefined' || this.__retry < 0 )
		{
			this.__retry = 1; 
            //d	this.__retry = getDataFromDefault(); 
		}	

		//h timeout �ð� ����
		//h tm = 1 -> ����
		//h tm = undefined -> �⺻ ����
		//h tm = null -> �̽���
		//h tm = 0 -> �̽���
		if ( typeof( this.__timeoutMillisec ) == 'undefined' || this.__timeoutMillisec < 0 )
		{
			this.__timeoutMillisec = 5000; 
            //d	this.__timeout = getDataFromDefault(); 
		}

		//h ���� �Լ� ����.
		if ( !this.__errorHandler || typeof( this.__errorHandler ) != 'function' )
		{
			this.__errorHandler = this.defaultError; 
		}

		if ( window.XMLHttpRequest ) {
			// Mozilla, Safari,...
			this.__xhr = new XMLHttpRequest();
			if ( this.__xhr.overrideMimeType ) 
			{
				 this.__xhr.overrideMimeType('text/xml');
			}
		} else {
			//h IE ���, �ƿ� ���� �ȵǴ� �� ����.
			this.__destroy( );
			return false;
		}

		if (! this.__xhr ) {
			this.__errorHandler( -1, -1, "ajax.Constructor :: Cannot create an XMLHTTP instance" );
			return false;
		}

        this.__xhr.ajax = this;
		//h readyState = 4 �϶��� �̺�Ʈ ���
		this.__xhr.handlers	= [];
		this.__xhr.datas	= [];
		this.__xhr.handlers[ riffGlobal.AJAXREADYSTATE.DONE ] = this.__successFunction;

        this.__xhr.onreadystatechange = function ( ) {
        //h ���⼭�� this �� ajax ��ü�� �ƴϰ� xhttp ��ü( xhr ) ��. 
        //h ���� ajax��ü�� ����ϰ� ������, this.ajax�� �̿��Ұ�.

			//h �� ������, ���� �߻��� �������( __xhr.status ���� ������� ) �����Ѵ�.
			//h retry �� �̿��Ϸ��� �������� �ƴ����� �Ǵ��ؾ� �ϹǷ�
			//h ������ ������ status ���� 0 , 200 �� �ƴ� ����̴�. �� ��츸 retry ����.

			try
			{
				if ( this.status !== 0 && this.status !== 200 )
				{
					//h retry �� �����Ǿ� ������ retry�� �ϰ�, retryCount�� ���� �Һ������� errorHandler() �� ����.
					//h timeout �� �����Ǿ� �ִٸ�, �ϴ� ������.
					window.clearTimeout( this.ajax.__timeoutObject );
					this.ajax.retryOnError();
					return;
				}
			}
			catch ( e )
			{

			}
		
//d			if ( this.status &&	( this.status !== 0 && this.status !== 200 ) )
//d			{
//d				this.ajax.__errorHandler( this.readyState, this.status, " ajax.status :: status(" + this.status + ") is error." );
//d			}

			if ( riffGlobal.AJAXREADYSTATE.DONE == this.readyState ) {

				//h �����̶��
				if ( this.ajax.__receiveSuccessCheck() )
				{
					//h timeout �� Ÿ�̸� ������.
					this.ajax.requestSuccess();
					//h text���� xml �� ����.
					if( !this.responseXml ) { 
						this.responseXml = ( new DOMParser() ).parseFromString( this.responseText, "application/xml" );   
					};
					this.ajax.__successFunction( this.responseXml, this.responseText, this.ajax, _functionTossAgumentSet );
				} else {
					//h ����. alzajira�� ���
					//h status���� ��ȯ�Ǿ��ٴ� ����, � ���·ε� ������ ����� ����Ǿ��ٴ� ���̴�
					//h ��, readyState 4 / status = 0 -> readyState 4 / status = 200 �� ���·� ���ϴ� ���� �ƴ϶�
					//h readyState�� 3 -> 4 �� �� ��, status���� �ѹ濡 0 , 200, 404 ������ �������� ���̴�.
						
					//h retry with error Handler() + retry handler()
					//h retry �� �����Ǿ� ������ retry�� �ϰ�, retryCount�� ���� �Һ������� errorHandler() �� ����.

					//h timeout �� �����Ǿ� �ִٸ�, �ϴ� ������.
					window.clearTimeout( this.ajax.__timeoutObject );
					this.ajax.retryOnError();					
				}

			}
		};
		//h ������ ����
		this.Request( ) ;
	};

};

